<template>
  <div class="pet-adopt">
    <div class="pet-adopt-main">
      <div class="pet-adopt-main-top">
        <md-input
          v-model="searchValue"
          name="search"
          placeholder="按下回车键开始搜索"
          class="search"
          v-on:keydown="checkEnterKey"
        >
          <n-icon size="16"><Search /> </n-icon>
          搜索领养
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
      <div class="empty" v-show="petList.length == 0">
        <p>对不起，暂无数据</p>
      </div>
      <div class="pet-adopt-main-content">
        <div
          class="item"
          v-for="item in petList"
          :key="item"
          @click="showModal(item)"
        >
          <div class="item-top">
            <n-avatar
              round
              size="large"
              :src="item.pet.user.head"
              @click.stop="toHisHome(item.pet.user.id, '/othersCenter')"
            />
            <div class="info">
              <div class="name">{{ item.pet.user.nickname }}</div>
              <div class="date">
                {{ item.create_time.slice(0, 16).replace("T", " ") }}
              </div>
            </div>
          </div>
          <div class="item-content">
            <img :src="item.pet.cover_image.image" />
          </div>
          <div class="item-bottom">
            <div class="title">
              <n-ellipsis style="max-width: 270px" :tooltip="false">
                {{ item.title }}
              </n-ellipsis>
            </div>
            <div class="info">
              <n-tag type="success"> {{ item.pet.breed.name }} </n-tag>
              <n-tag type="warning"> {{ item.pet.breed.variety }} </n-tag>
              <n-tag type="error"> {{ item.pet.sex_value }} </n-tag>
              <n-tag type="info"> {{ Number(item.pet.weight) }} kg </n-tag>
            </div>
            <div class="introduction">
              <n-ellipsis style="max-width: 270px" :tooltip="false">
                {{ item.description }}
              </n-ellipsis>
            </div>
            <div class="ask">
              <n-ellipsis style="max-width: 270px" :tooltip="false">
                领养要求：
                {{ item.requirements }}
              </n-ellipsis>
            </div>
          </div>
        </div>
      </div>
    </div>
    <n-modal v-model:show="isModalShow">
      <div class="box">
        <div class="box-left">
          <div class="cover">
            <img :src="adoptInfo.pet.cover_image.image" />
          </div>
          <n-divider>照片</n-divider>
          <div class="images">
            <n-image-group>
              <n-image
                v-for="(item, index) in adoptInfo.pet.images"
                :key="index"
                width="100"
                height="80"
                :src="item.image"
              >
              </n-image>
            </n-image-group>
          </div>
        </div>
        <div class="box-right">
          <n-divider>宠物信息</n-divider>
          <div class="title">{{ adoptInfo.pet.name }}</div>
          <div class="info">品种：{{ adoptInfo.pet.breed.name }}</div>
          <div class="info">性别：{{ adoptInfo.pet.sex_value }}</div>
          <div class="info">生日：{{ adoptInfo.pet.birth }}</div>
          <div class="info">体重：{{ Number(adoptInfo.pet.weight) }}kg</div>
          <n-divider>领养信息</n-divider>
          <div class="title">{{ adoptInfo.title }}</div>
          <div class="context">
            <span class="label">简介：</span>
            {{ adoptInfo.description }}
          </div>
          <div class="context">
            <span class="label"> 领养要求：</span>{{ adoptInfo.requirements }}
          </div>
          <n-button type="primary" @click.stop="adopt(adoptInfo.pet.user.id)">
            查看联系方式
          </n-button>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import MdInput from "@/components/common/MDinput/index.vue";
import { Search, Close } from "@vicons/ionicons5";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useMessage } from "naive-ui";
const message = useMessage();
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
  getPetList();
}
function handleSearch() {
  isSearching.value = true;
  getPetList();
}

const petList = ref([]);
async function getPetList() {
  const request = {
    search: searchValue.value,
  };
  petList.value = await store.dispatch("getAdoptListAction", request);
}
onMounted(() => {
  getPetList();
});
function toHisHome(id, path) {
  localStorage.setItem("otherId", id);
  localStorage.setItem("preRoute", route.fullPath);
  const userId = JSON.parse(localStorage.getItem("userInfo")).id;
  if (id == userId) {
    router.push({
      path: "/personalCenter",
    });
  } else {
    router.push({
      path: path,
    });
  }
}
function adopt(id) {
  const verified = JSON.parse(localStorage.getItem("userInfo")).verified;
  if (verified) {
    toHisHome(id, "/othersContact");
  } else {
    message.error("未实名认证不可查看，请先进行实名认证");
  }
}
const isModalShow = ref(false);
const adoptInfo = ref({});
function showModal(item) {
  isModalShow.value = true;
  adoptInfo.value = item;
}
</script>

<style lang="scss" scoped>
.n-divider {
  margin-top: 14px !important;
  margin-bottom: 14px !important;
}

.box {
  width: 700px;
  min-height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: #fff;
  &-left {
    width: 380px;
    height: 100%;
    .cover {
      width: 100%;
      height: 250px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .images {
      overflow: auto;
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
  &-right {
    width: 320px;
    height: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .title {
      font-size: 20px;
      color: #222222;
      font-weight: 800;
    }
    .info {
      font-size: 15px;
      color: #686868;
    }
    .context {
      font-size: 15px;
      color: #686868;
    }
    .label {
      color: #222222;
      font-size: 16px;
      font-weight: 700;
    }
    .n-button {
      margin-top: 20px;
      width: 100%;
    }
  }
}
.pet-adopt {
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
    .empty {
      width: 100%;
      height: 300px;
      font-size: 20px;
      color: #aaa;
      font-family: "新宋体";
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    &-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
      .item {
        width: 290px;
        height: 445px;
        background: #c4c4c425;
        margin-bottom: 20px;
        border-radius: 5px;
        border-radius: 20px;
        &:hover {
          cursor: pointer;
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.1),
            0 3px 6px 0 rgba(0, 0, 0, 0.08), 0 5px 12px 4px rgba(0, 0, 0, 0.06);
        }
        &:last-child:nth-child(4n - 1) {
          margin-right: 306px;
        }
        &:last-child:nth-child(4n - 2) {
          margin-right: 613px;
        }
        &-top {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 10px;
          .info {
            margin-left: 10px;
            .name {
              font-size: 18px;
            }
            .date {
              font-size: 12px;
              color: #aaa;
            }
          }
        }
        &-content {
          width: 100%;
          height: 250px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        &-bottom {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: 10px;
          padding-left: 10px;
          .title {
            font-size: 20px;
            font-weight: 800;
          }
          .info {
            display: flex;
            flex-direction: row;
            align-items: center;
            .n-tag {
              margin-right: 10px;
            }
          }
          .introduction {
            font-size: 14px;
            color: #aaa;
            margin-top: 5px;
          }
          .ask {
            font-size: 14px;
            color: #aaa;
          }
        }
      }
    }
  }
}
</style>