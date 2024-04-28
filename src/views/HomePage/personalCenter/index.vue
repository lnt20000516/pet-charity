<template>
  <div class="personal">
    <n-scrollbar style="max-height: 100vh">
      <div class="personal-header">
        <div class="personal-header-left">
          <p class="title">个人中心</p>
        </div>
        <div class="personal-header-right">
          <p class="home" @click="back" v-show="havePrePath">返回上一页</p>
          <n-dropdown :options="options" @select="handleSelect">
            <div class="info">
              <n-avatar round :size="40" :src="userData.head" />
              <p class="name">{{ userData.nickname }}</p>
            </div>
          </n-dropdown>
        </div>
      </div>
      <div class="personal-content">
        <div class="personal-content-left">
          <div class="personal-content-left-card">
            <pan-thumb
              :image="userData.head"
              :height="'100px'"
              :width="'100px'"
              :hoverable="false"
            >
              <div>Hello</div>
              {{ userData.nickname }}
            </pan-thumb>
            <div class="name">{{ userData.nickname }}</div>
            <div class="introduction">{{ userData.introduction }}</div>
            <div class="box">
              <n-statistic
                label="关注"
                tabular-nums
                @click="activate('follow', '我的关注')"
              >
                <n-number-animation
                  ref="numberAnimationInstRef"
                  :from="0"
                  :to="userData.following_count"
                />
              </n-statistic>
              <n-statistic
                label="粉丝"
                tabular-nums
                @click="activate('fans', '我的粉丝')"
              >
                <n-number-animation
                  ref="numberAnimationInstRef"
                  :from="0"
                  :to="userData.followers_count"
                />
              </n-statistic>
              <n-statistic label="余额" tabular-nums @click="toBalance">
                <n-number-animation
                  ref="numberAnimationInstRef"
                  :from="0"
                  :to="Number(userData.balance)"
                />
              </n-statistic>
            </div>
            <Menu />
          </div>
        </div>
        <n-drawer v-model:show="active" :width="502" :placement="placement">
          <n-drawer-content :title="tabTitle">
            <Follow v-show="tabValue == 'follow'" />
            <Fans v-show="tabValue == 'fans'" />
          </n-drawer-content>
        </n-drawer>
        <div class="personal-content-right">
          <div class="personal-content-right-card">
            <router-view v-slot="{ Component }" v-if="isRouterAlive">
              <transition name="fade-v">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup>
import PanThumb from "@/components/common/panThumb/index.vue";
import Menu from "@/components/user/pensonal/menu.vue";
import Follow from "./friend/follow.vue";
import Fans from "./friend/fans.vue";
import { LogOutOutline as LogoutIcon, HomeOutline } from "@vicons/ionicons5";
import { useStore } from "vuex";
import { onMounted, ref, watch, nextTick, provide } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
import { NIcon } from "naive-ui";
import { h } from "vue";
const userData = ref(JSON.parse(localStorage.getItem("userInfo")));
async function getUserData() {
  const id = JSON.parse(localStorage.getItem("userInfo")).id;
  userData.value = await store.dispatch("getUserInfoAction", id);
}
watch(
  () => store.getters.getUserInfo,
  (newVal) => {
    userData.value = newVal;
  }
);
onMounted(() => {
  getUserData();
});
const active = ref(false);
const placement = ref("right");
const tabValue = ref("fans");
const tabTitle = ref("我的关注");
const activate = (tab, title) => {
  active.value = true;
  tabValue.value = tab;
  tabTitle.value = title;
};
const isRouterAlive = ref(true);
const reload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
provide("reload", reload);
function toBalance() {
  reload();
  router.push({ name: "personalInfo" });
  localStorage.setItem("personalTab", "account");
}
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const options = [
  {
    label: "返回首页",
    key: "backHome",
    icon: renderIcon(HomeOutline),
  },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];
function handleSelect(key) {
  switch (key) {
    case "logout": {
      router.push({ name: "login" });
      localStorage.clear();
      break;
    }
    case "backHome": {
      router.push({ name: "home" });
    }
  }
}
// eslint-disable-next-line no-prototype-builtins
const havePrePath = ref(localStorage.hasOwnProperty("preRoute"));
function back() {
  const preRoute = localStorage.getItem("preRoute");
  router.push({ path: preRoute });
  localStorage.removeItem("preRoute");
}
</script>

<style lang="scss" scoped>
.personal {
  width: 100%;
  height: 100vh;
  background: #f5f7f9;
  &-header {
    position: fixed;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 10px 0 #d2cece99;
    background: #fff;
    &-left {
      margin-left: 20px;
      .title {
        font-size: 20px;
        color: #626675;
      }
    }
    &-right {
      margin-right: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      .home {
        font-size: 15px;
        color: #333333;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: #18a058;
        }
      }
      .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        .name {
          font-size: 15px;
          color: #222222;
          margin-left: 10px;
        }
      }
    }
  }
  &-content {
    width: 100%;
    height: 100%;
    margin: 80px auto 24px auto;
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    &-left {
      width: 15%;
      min-width: 200px;
      height: 100%;
      min-height: 612px;
      margin-right: 20px;
      &-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 20px 0px;
        &:hover {
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
            0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
        }
        .name {
          font-size: 20px;
          line-height: 20px;
          color: #333333;
          margin-top: 10px;
        }
        .introduction {
          font-size: 12px;
          color: #aaa;
          margin-top: 6px;
        }
        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          .n-statistic {
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }
    &-right {
      width: 60%;
      height: 100%;
      min-height: 612px;
      &-card {
        width: 100%;
        height: 100%;
        min-height: 599px;
        background: #fff;
        padding: 20px 40px;
        &:hover {
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
            0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
        }
      }
    }
  }
}
</style>