<template>
  <div class="follow">
    <div class="empty" v-if="followsList.length == 0">
      <n-icon size="60">
        <Empty />
      </n-icon>
      <p>你还没有关注任何人</p>
    </div>
    <n-list hoverable clickable v-else>
      <n-list-item v-for="(item, index) in followsList" :key="item">
        <div class="item">
          <div class="item-left">
            <n-avatar
              round
              :size="48"
              :src="
                item.following.head ||
                'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
              "
              @click="toHisHome(item.following.id)"
            />
            <div class="info">
              <div class="name">{{ item.following.nickname }}</div>
              <div class="introduction">
                {{ item.following.introduction || "无" }}
              </div>
            </div>
          </div>
          <div class="item-right">
            <n-button
              type="success"
              round
              v-if="!item.isFollows"
              @click="following(item, index)"
            >
              关注
            </n-button>
            <n-button
              type="tertiary"
              round
              v-else
              @click="following(item, index)"
            >
              已关注
            </n-button>
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
const followsList = ref([]);
const userId = JSON.parse(localStorage.getItem("userInfo")).id;
async function getFollows() {
  const request = {
    followers: userId,
  };
  followsList.value = await store.dispatch("getFriendListAction", request);
  followsList.value.map(async (v) => {
    v.isFollows = true;
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
    cancel: item.isFollows,
    userId: item.following.id,
  };
  const res = await store.dispatch("followOrCancelAction", request);
  if (res) {
    if (item.isFollows) message.success("取消关注成功");
    else message.success("关注成功");
    followsList.value[index].isFollows = !item.isFollows;
  }
}
onMounted(() => {
  getFollows();
});
</script>

<style lang="scss" scoped>
.follow {
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
  }
}
</style>