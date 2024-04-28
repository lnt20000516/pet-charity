<template>
  <div class="menu">
    <div
      class="menu-item"
      v-for="(item, index) in menuList"
      :key="index"
      @click="handleClick(item)"
      :class="{
        activeItem:
          activeRoute === item.key ||
          activeRoute === item.key2 ||
          activeRoute === item.key1,
      }"
    >
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const router = useRouter();
const activeRoute = ref(route.name);
const menuList = [
  {
    label: "首页",
    key: "home",
    key1: "dog",
    key2: "cat",
  },
  {
    label: "问答",
    key: "petAskList",
    key2: "petAskDetail",
  },
  {
    label: "领养",
    key: "petAdopt",
  },
  {
    label: "众筹",
    key: "petDonateList",
    key2: "petDonateDetail",
  },
];
watch(
  () => route.fullPath,
  () => {
    updateMenu(route);
  }
);
function updateMenu(route) {
  activeRoute.value = route.name;
}
function handleClick(menuItem) {
  router.push({ name: menuItem.key });
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  &-item {
    height: 100%;
    width: 100px;
    padding: 0px 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: #333333;
    font-family: "新宋体";
    margin: 0px 10px;
    &:hover {
      border-bottom: 2px solid #18a058;
      color: #18a058;
    }
  }
  .activeItem {
    border-bottom: 2px solid #18a058;
    color: #18a058;
  }
}
</style>