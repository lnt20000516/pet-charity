<template>
  <div class="others">
    <n-scrollbar style="max-height: 100vh">
      <div class="others-header">
        <div class="others-header-left">
          <p class="title">{{ userInfo.nickname }}的个人中心</p>
        </div>
        <div class="others-header-right">
          <p class="home" @click="backPre">返回上一页</p>
        </div>
      </div>
      <div class="others-content">
        <div class="others-content-left">
          <div class="others-content-left-card">
            <pan-thumb
              :image="
                userInfo.head ||
                'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
              "
              :height="'100px'"
              :width="'100px'"
              :hoverable="false"
            >
              <div>Hello</div>
              {{ userInfo.nickname }}
            </pan-thumb>
            <div class="name">{{ userInfo.nickname }}</div>
            <div class="introduction">{{ userInfo.introduction }}</div>
            <div class="box">
              <n-button type="success" v-if="!isFollow" @click="following">
                关注Ta
              </n-button>
              <n-button type="tertiary" v-else @click="following">
                已关注
              </n-button>
            </div>
            <Menu />
          </div>
        </div>
        <div class="others-content-right">
          <div class="others-content-right-card">
            <router-view v-slot="{ Component }">
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
import Menu from "@/components/user/others/menu.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useStore } from "vuex";
const store = useStore();
import { useMessage } from "naive-ui";
const message = useMessage();
const userInfo = ref({});
const isFollow = ref(false);
function backPre() {
  const preRoute = localStorage.getItem("preRoute");
  router.push({ path: preRoute });
  localStorage.removeItem("preRoute");
}
async function getUserInfo() {
  const id = localStorage.getItem("otherId");
  userInfo.value = await store.dispatch("getUserInfoIdAction", id);
}
async function handelFollower() {
  const req = {
    followers: JSON.parse(localStorage.getItem("userInfo")).id,
    following: localStorage.getItem("otherId"),
  };
  const res = await store.dispatch("getFriendListAction", req);
  console.log(res);
  if (res.length == 0) isFollow.value = false;
  else isFollow.value = true;
}
async function following() {
  const request = {
    cancel: isFollow.value,
    userId: localStorage.getItem("otherId"),
  };
  const res = await store.dispatch("followOrCancelAction", request);
  if (res) {
    if (isFollow.value) message.success("取消关注成功");
    else message.success("关注成功");
    isFollow.value = !isFollow.value;
  }
}
onMounted(() => {
  getUserInfo().then(() => {
    handelFollower();
  });
});
</script>

<style lang="scss" scoped>
.others {
  width: 100%;
  height: 100vh;
  background: #f5f7f9;
  &-header {
    position: fixed;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 38px;
    padding: 10px 0px;
    display: flex;
    flex-direction: row;
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
    }
  }
  &-content {
    width: 100%;
    height: 100%;
    margin: 72px auto 24px auto;
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