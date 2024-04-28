<template>
  <div class="my-pet">
    <div class="empty" v-show="petsList.length == 0">
      <p>暂无宠物</p>
    </div>
    <div
      class="item"
      v-for="(item, index) in petsList"
      :key="item"
      @click="showDetail(item)"
    >
      <div class="item-left">
        <div class="item-left-image">
          <img :src="item.cover_image.image" />
        </div>
        <div class="item-left-info">
          <div class="name">{{ item.name }}</div>
          <div class="birth">
            <n-icon v-if="item.sex"><Female /></n-icon>
            <n-icon v-else><Male /></n-icon>
            {{ item.birth }}
          </div>
        </div>
      </div>
      <div class="item-right">
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon @click.stop="del(index, item)" class="delete"
              ><Delete
            /></n-icon>
          </template>
          删除宠物
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon @click.stop="changeInfo(item)" class="change"
              ><Pencil
            /></n-icon>
          </template>
          修改宠物信息
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon v-if="item.visual" @click.stop="lock(item, index)"
              ><LockOpen
            /></n-icon>
            <n-icon v-else @click.stop="lock(item, index)"><Lock /></n-icon>
          </template>
          是否公开
        </n-tooltip>
      </div>
    </div>
    <n-modal v-model:show="showPet">
      <div class="box">
        <div class="box-left">
          <div class="cover">
            <img :src="petInfo.cover_image.image" />
          </div>
        </div>
        <div class="box-right">
          <n-divider>宠物信息</n-divider>
          <div class="title">{{ petInfo.name }}</div>
          <div class="info">品种：{{ petInfo.breed.name }}</div>
          <div class="info">性别：{{ petInfo.sex_value }}</div>
          <div class="info">生日：{{ petInfo.birth }}</div>
          <div class="info">体重：{{ Number(petInfo.weight) }}kg</div>
          <n-divider>照片</n-divider>
          <div class="images">
            <n-image-group>
              <n-image
                v-for="(item, index) in petInfo.images"
                :key="index"
                width="100"
                height="80"
                :src="item.image"
              >
              </n-image>
            </n-image-group>
          </div>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script setup>
import { MaleSharp as Male, FemaleSharp as Female } from "@vicons/ionicons5";
import { Lock, LockOpen, Pencil } from "@vicons/tabler";
import { Delete24Regular as Delete } from "@vicons/fluent";
import { useStore } from "vuex";
import { onMounted, ref, inject } from "vue";
import { useMessage, useDialog } from "naive-ui";
const dialog = useDialog();
const message = useMessage();
const store = useStore();
const petsList = ref([]);
const reload = inject("reload");

const showPet = ref(false);
const petInfo = ref({});
function showDetail(item) {
  petInfo.value = item;
  showPet.value = true;
}
function del(index, item) {
  dialog.warning({
    title: "警告",
    content: "你确认要删除该宠物吗？",
    positiveText: "确认",
    negativeText: "取消",
    onPositiveClick: () => {
      petsList.value.splice(index, 1);
      store.dispatch("delPetAction", item.id);
      message.success("删除成功");
    },
    onNegativeClick: () => {
      message.error("取消删除");
    },
  });
}
async function lock(item, index) {
  const data = ref({
    visual: !item.visual,
  });
  const request = {
    data: data.value,
    id: item.id,
  };
  const res = await store.dispatch("updatePetInfoAction", request);
  petsList.value[index].visual = res.visual;
}
function changeInfo(item) {
  reload();
  localStorage.setItem("petTab", "addPet");
  localStorage.setItem("petInfo", JSON.stringify(item));
}
async function getPets() {
  const request = {
    user: JSON.parse(localStorage.getItem("userInfo")).id,
  };
  petsList.value = await store.dispatch("getOneselfPetsAction", request);
}
onMounted(() => {
  getPets();
});
</script>

<style lang="scss" scoped>
.box {
  width: 700px;
  min-height: 300px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  &-left {
    width: 300px;
    height: 100%;
    .cover {
      width: 100%;
      height: 350px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &-right {
    width: 380px;
    height: 100%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .images {
      overflow: auto;
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
    .title {
      font-size: 20px;
      color: #222222;
      font-weight: 800;
    }
    .info {
      font-size: 15px;
      color: #686868;
    }
  }
}
.my-pet {
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
    height: 100px;
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
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin: 0px 15px;
        }
      }
      &-info {
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        .name {
          font-size: 20px;
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