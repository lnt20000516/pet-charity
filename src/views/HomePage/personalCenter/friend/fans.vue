<template>
  <div class="fans">
    <div class="empty" v-if="fansList.length == 0">
      <n-icon size="60">
        <Empty />
      </n-icon>
      <p>你还没有粉丝</p>
    </div>
    <n-list hoverable clickable v-else>
      <n-list-item v-for="(item, index) in fansList" :key="item">
        <div class="item">
          <div class="item-left">
            <n-avatar
              round
              :size="48"
              :src="
                item.followers.head ||
                'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
              "
              @click="toHisHome(item.followers.id)"
            />
            <div class="info">
              <div class="name">{{ item.followers.nickname }}</div>
              <div class="introduction">
                {{ item.followers.introduction || "无" }}
              </div>
            </div>
          </div>
          <div class="item-right">
            <n-button
              type="success"
              round
              v-if="!item.isEachOther"
              @click="following(item, index)"
            >
              关注
            </n-button>
            <n-button type="tertiary" round v-else> 互相关注 </n-button>
          </div>
        </div>
      </n-list-item>
    </n-list>
  </div>
</template>

<script setup>
import { CalendarEmpty32Regular as Empty } from "@vicons/fluent";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useMessage } from "naive-ui";
const message = useMessage();
const fansList = ref([]);
const userId = JSON.parse(localStorage.getItem("userInfo")).id;
async function getFans() {
  const request = {
    following: userId,
  };
  fansList.value = await store.dispatch("getFriendListAction", request);
  fansList.value.map(async (v) => {
    const req = {
      followers: v.following.id,
      following: v.followers.id,
    };
    const res = await store.dispatch("getFriendListAction", req);
    if (res.length == 0) v.isEachOther = false;
    else v.isEachOther = true;
  });
}
function toHisHome(id) {
  if (id == userId) {
    router.push({
      path: "/personalCenter",
    });
  } else {
    router.push({
      path: "/othersCenter",
    });
    localStorage.setItem("otherId", id);
    localStorage.setItem("preRoute", route.fullPath);
  }
}
async function following(item, index) {
  const request = {
    cancel: item.isEachOther,
    userId: item.followers.id,
  };
  const res = await store.dispatch("followOrCancelAction", request);
  if (res) {
    if (item.isEachOther) message.success("取消关注成功");
    else message.success("关注成功");
    fansList.value[index].isEachOther = !item.isEachOther;
  }
}
onMounted(() => {
  getFans();
});
</script>

<style lang="scss" scoped>
.fans {
  width: 100%;
  height: 100%;
  .empty {
    width: 100%;
    height: 100%;
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #aaa;
  }
  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      .n-avatar {
        margin: 0px 15px;
      }
      .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 15px;
        color: #aaa;
        min-width: 200px;
        .name {
          font-size: 20px;
          color: #222222;
        }
      }
    }
    &-right {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>