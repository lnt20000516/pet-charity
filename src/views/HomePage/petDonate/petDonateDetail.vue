<template>
  <div class="donate-detail">
    <div class="donate-detail-main">
      <div class="donate-detail-main-top">
        <p class="return" @click="backList">
          <n-icon>
            <ArrowBackUp />
          </n-icon>
          返回众筹列表
        </p>
        <n-button type="primary" class="btn" @click="toPay">
          我要捐款
        </n-button>
      </div>
      <n-divider title-placement="left"> 基本信息 </n-divider>
      <div class="info">
        <div class="content">
          <div class="image">
            <n-image :src="donateInfo.cover_image?.image" />
            <n-tag :bordered="false" type="success">
              {{ donateInfo.breed?.name }}
            </n-tag>
            <n-tag :bordered="false" type="warning">
              {{ donateInfo.breed?.variety }}
            </n-tag>
          </div>
          <div class="information">
            <div class="title">{{ donateInfo.name }}</div>
            <div class="description">
              <span class="label">众筹说明:</span>
              <n-ellipsis
                expand-trigger="click"
                line-clamp="4"
                :tooltip="false"
              >
                {{ donateInfo.description }}
                {{ donateInfo.description }}
              </n-ellipsis>
            </div>
            <div class="progress">
              <div class="money">
                <p>{{ Number(donateInfo.already_amount) }}</p>
                <p>已筹集金额</p>
              </div>
              <n-progress
                type="line"
                :height="14"
                :percentage="
                  $filters.formatDecimal(
                    donateInfo.already_amount / donateInfo.amount,
                    2
                  ) * 100
                "
                :indicator-placement="'inside'"
                processing
                status="success"
              />
              <div class="money">
                <p class="text">{{ Number(donateInfo.amount) }}</p>
                <p class="text">目标金额</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <n-divider title-placement="left"> 照片 </n-divider>
      <div class="info">
        <div class="content">
          <n-image-group>
            <n-space>
              <n-image
                v-for="item in donateInfo.images"
                :key="item"
                width="150"
                height="150"
                :src="item.image"
              />
            </n-space>
          </n-image-group>
        </div>
      </div>
      <n-divider title-placement="left"> 捐赠榜 </n-divider>
      <div class="info">
        <div class="content">
          <div class="empty" v-if="donateInfo.donation_list?.length == 0">
            <p>暂无捐款人</p>
          </div>
          <div class="donate-list" v-else>
            <n-list hoverable clickable>
              <n-list-item
                v-for="(item, index) in donateInfo.donation_list"
                :key="item"
              >
                <div class="item">
                  <div class="item-left">
                    <n-icon size="40" v-show="index == 0">
                      <Top1 />
                    </n-icon>
                    <n-icon size="40" v-show="index == 1">
                      <Top2 />
                    </n-icon>
                    <n-icon size="40" v-show="index == 2">
                      <Top3 />
                    </n-icon>
                    <n-tag :bordered="false" type="success" v-show="index >= 3">
                      {{ index + 1 }}
                    </n-tag>
                    <n-avatar
                      round
                      :size="48"
                      :src="item.user.head"
                      @click="toHisHome(item.user.id)"
                    />
                    <div class="user-info">
                      <div class="name">{{ item.user.nickname }}</div>
                      <div>
                        {{ item.user.introduction || "Ta暂时没有介绍" }}
                      </div>
                    </div>
                  </div>
                  <div class="count">￥{{ item.amount }}</div>
                  <div class="item-right">
                    <div class="date">
                      {{ item.donate_time.slice(0, 16).replace("T", " ") }}
                    </div>
                  </div>
                </div>
              </n-list-item>
            </n-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowBackUp } from "@vicons/tabler";
import { computed, onMounted, ref } from "vue";
import Top1 from "@/assets/svg/top1.vue";
import Top2 from "@/assets/svg/top2.vue";
import Top3 from "@/assets/svg/top3.vue";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useStore } from "vuex";
const store = useStore();
import { useMessage } from "naive-ui";
const message = useMessage();

function backList() {
  router.push({ name: "petDonateList" });
}
const id = computed(() => {
  return localStorage.getItem("donateId") || null;
});
const donateInfo = ref({});
async function getDonateInfo() {
  donateInfo.value = await store.dispatch("getDonateInfoAction", id.value);
}
onMounted(() => {
  getDonateInfo();
});

function toHisHome(id) {
  localStorage.setItem("otherId", id);
  localStorage.setItem("preRoute", route.fullPath);
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  if (id == userId) {
    router.push({
      path: "/personalCenter",
    });
  } else {
    router.push({
      path: "/othersCenter",
    });
  }
}

function toPay() {
  const verified = JSON.parse(localStorage.getItem("userInfo")).verified;
  if (verified) {
    router.push({
      path: "/pay",
      query: {
        id: id.value,
      },
    });
  } else {
    message.error("未实名认证不可进行捐赠，请先进行实名认证");
  }
}
</script>

<style lang="scss" scoped>
.donate-detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-main {
    width: 85%;
    min-height: 90vh;
    background: #fff;
    padding: 20px;
    &-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .return {
        font-size: 14px;
        margin-bottom: 20px;
        color: #aaa;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        .n-icon {
          font-size: 16px;
          margin-right: 5px;
        }
      }
      .btn {
        margin-right: 50px;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      .content {
        width: 80%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
      }
    }
    .image {
      width: 200px;
      margin-top: 10px;
      .n-image {
        width: 200px;
        height: 150px;
      }
      .n-tag {
        margin-right: 10px;
      }
    }
    .information {
      margin-left: 20px;
      min-width: 400px;
      .title {
        font-size: 23px;
        font-weight: 700;
      }
      .description {
        font-size: 15px;
        color: #222222;
        .label {
          font-size: 16px;
          font-weight: 700;
          display: block;
        }
      }
      .progress {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 10px;
        .money {
          width: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 8px;
          color: #aaa;
        }
      }
    }
    .empty {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #aaa;
    }
    .donate-list {
      width: 100%;
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
          .n-tag {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .user-info {
            font-size: 15px;
            color: #aaa;
            min-width: 200px;
            .name {
              font-size: 20px;
              color: #222222;
            }
          }
        }
        .count {
          font-size: 20px;
        }
        &-right {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-right: 30px;
          .date {
            font-size: 15px;
            color: #aaa;
          }
        }
      }
    }
  }
}
</style>