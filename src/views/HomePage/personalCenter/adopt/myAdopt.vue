<template>
  <div class="my-adopt">
    <div class="empty" v-show="adoptList.length == 0">
      <p>暂未发布领养</p>
    </div>
    <div class="item" v-for="item in adoptList" :key="item">
      <div class="item-left">
        <div class="item-left-image">
          <img :src="item.pet.cover_image.image" />
        </div>
        <div class="item-left-info">
          <div class="title">{{ item.title }}</div>
          <div class="tags">
            <n-tag type="success"> {{ item.pet.breed.name }} </n-tag>
            <n-tag type="warning"> {{ item.pet.breed.variety }} </n-tag>
            <n-tag type="error"> {{ item.pet.sex_value }} </n-tag>
            <n-tag type="info"> {{ Number(item.pet.weight) }}kg </n-tag>
          </div>
          <div class="content">
            <n-ellipsis style="max-width: 240px" :tooltip="false">
              {{ item.description }}
            </n-ellipsis>
          </div>
          <div class="ask">
            领养要求：<n-ellipsis style="max-width: 240px" :tooltip="false">
              {{ item.requirements }}
            </n-ellipsis>
          </div>
        </div>
      </div>
      <div class="item-right">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon @click.stop="del(index, item.id)" class="delete"
              ><Delete
            /></n-icon>
          </template>
          删除发布
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon @click.stop="changeInfo(item)" class="change"
              ><Pencil
            /></n-icon>
          </template>
          修改发布信息
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pencil } from "@vicons/tabler";
import { Delete24Regular as Delete } from "@vicons/fluent";
import { ref, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { useMessage, useDialog } from "naive-ui";
const dialog = useDialog();
const message = useMessage();
const store = useStore();
const adoptList = ref([]);
const reload = inject("reload");
function del(index, id) {
  dialog.warning({
    title: "警告",
    content: "你确认要删除该宠物吗？",
    positiveText: "确认",
    negativeText: "取消",
    onPositiveClick: () => {
      store.dispatch("deleteAdoptAction", id);
      adoptList.value.splice(index, 1);
      message.success("删除成功");
    },
    onNegativeClick: () => {
      message.error("取消删除");
    },
  });
}
function changeInfo(item) {
  reload();
  localStorage.setItem("adoptTab", "addAdopt");
  localStorage.setItem("adoptInfo", JSON.stringify(item));
}
async function getAdoptList() {
  const request = {
    pet__user: JSON.parse(localStorage.getItem("userInfo")).id,
  };
  adoptList.value = await store.dispatch("getAdoptListAction", request);
}
onMounted(() => {
  getAdoptList();
});
</script>

<style lang="scss" scoped>
.my-adopt {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 150px;
    border-bottom: 1px solid #efeff5;
    &:hover {
      background: #efeff5;
      cursor: pointer;
    }
    &-left {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-image {
        img {
          width: 110px;
          height: 110px;
          object-fit: cover;
          margin: 0px 15px;
        }
      }
      &-info {
        height: 110px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        .title {
          font-size: 20px;
          font-weight: 700;
        }
        .tags {
          width: 200px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }
      }
    }
    &-right {
      margin-right: 20px;
      font-size: 20px;
      .change {
        margin-right: 10px;
      }
      .delete {
        margin-right: 10px;
        color: #d03050;
      }
    }
  }
}
</style>