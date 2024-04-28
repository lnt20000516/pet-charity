<template>
  <div class="pet-donate">
    <div class="pet-donate-main">
      <div class="pet-donate-main-top">
        <md-input
          v-model="searchValue"
          name="search"
          placeholder="按下回车键开始搜索"
          class="search"
          v-on:keydown="checkEnterKey"
        >
          <n-icon size="16"><Search /> </n-icon>
          搜索众筹
        </md-input>
        <n-icon
          class="close"
          size="20"
          @click="closeSearch"
          v-show="isSearching"
        >
          <Close />
        </n-icon>
      </div>
      <div class="pet-donate-main-content">
        <div
          class="item"
          v-for="item in donateList"
          :key="item"
          @click="toDetail(item.id)"
        >
          <div class="item-top">
            <div class="item-top-left">
              <n-avatar round size="large" :src="item.cover_image.image" />
              <div class="info">
                <div class="title">
                  {{ item.name }}
                </div>
                <div class="tags">
                  <n-tag size="small"> {{ item.breed.name }} </n-tag>
                  <n-tag size="small"> {{ item.breed.variety }} </n-tag>
                </div>
              </div>
            </div>
            <div class="item-top-right">
              <p class="tip">平台监管</p>
            </div>
          </div>
          <div class="item-context">
            <n-ellipsis style="max-width: 96%" :tooltip="false">
              {{ item.description }}
            </n-ellipsis>
          </div>
          <div class="item-progress">
            <div class="info">
              <p>{{ Number(item.already_amount) }}</p>
              <p>已筹集金额</p>
            </div>
            <n-progress
              type="line"
              :percentage="
                $filters.formatDecimal(item.already_amount / item.amount, 2) *
                100
              "
              :indicator-placement="'inside'"
              processing
              :height="14"
              status="success"
            />
            <div class="info">
              <p class="text">{{ Number(item.amount) }}</p>
              <p class="text">目标金额</p>
            </div>
          </div>
          <div class="list">
            <p class="label">爱心捐赠榜：</p>
            <p
              v-show="item.donation_list.length == 0"
              style="font-size: 15px; color: #aaa"
            >
              暂无
            </p>
            <n-avatar
              round
              size="medium"
              v-for="i in item.donation_list"
              :key="i"
              :src="i.user.head"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MdInput from "@/components/common/MDinput/index.vue";
import { Search, Close } from "@vicons/ionicons5";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();
const searchValue = ref("");
const isSearching = ref(false);
function checkEnterKey(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}
function closeSearch() {
  isSearching.value = false;
  searchValue.value = "";
  getDonateList();
}
function handleSearch() {
  isSearching.value = true;
  getDonateList();
}
const donateList = ref([]);
async function getDonateList() {
  const request = {
    search: searchValue.value,
    state: 1,
  };
  donateList.value = await store.dispatch("getDonateListAction", request);
  console.log(donateList.value);
}
onMounted(() => {
  getDonateList();
});

function toDetail(id) {
  localStorage.setItem("donateId", id);
  router.push({
    path: "/petDonateDetail",
  });
}
</script>

<style lang="scss" scoped>
.pet-donate {
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
      align-items: flex-end;
      .search {
        position: relative;
        width: 90%;
      }
      .close {
        cursor: pointer;
        position: relative;
        right: 30px;
        font-size: 16px;
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        margin-top: 20px;
        width: 95%;
        height: 180px;
        padding: 15px 0px 15px 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 10px;
        background: #cfcece41;
        border-bottom: 1px solid #d4d4d471;
        border-radius: 20px;
        &:hover {
          cursor: pointer;
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
            0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
        }
        &-top {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &-left {
            display: flex;
            flex-direction: row;
            align-items: center;
            .info {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              margin-left: 15px;
              .title {
                font-size: 18px;
                font-weight: 700;
              }
              .tags {
                display: flex;
                flex-direction: row;
                align-items: center;
                .n-tag {
                  margin-right: 10px;
                  font-size: 10px;
                  color: #8c8c8c;
                }
              }
            }
          }
          &-right {
            margin-right: 0px;
            .tip {
              padding: 2px 10px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              background: #46d689;
              border-radius: 20px 0px 0px 20px;
              font-size: 10px;
            }
          }
        }
        &-context {
          width: 100%;
          margin-top: 10px;
          font-size: 15px;
          color: #535353;
        }
        &-progress {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 10px;
          .info {
            width: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 8px;
            color: #aaa;
          }
        }
        .list {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 10px;
          font-size: 18px;
          .n-avatar {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>