<template>
  <div class="menu">
    <n-menu v-model:value="activeKey" mode="vertical" :options="menuOptions" />
  </div>
</template>

<script setup>
import { h, ref, watch } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink, useRoute } from "vue-router";
import {
  PersonInfo20Regular as person,
  AnimalCat24Regular as pet,
  PersonFeedback16Regular as feedback,
  BoxArrowUp20Regular as adopt
} from "@vicons/fluent";
const route = useRoute();
const activeKey = ref(route.name);
function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "personalInfo",
          },
        },
        { default: () => "个人信息" }
      ),
    key: "personalInfo",
    icon: renderIcon(person),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "myPets",
          },
        },
        { default: () => "我的宠物" }
      ),
    key: "myPets",
    icon: renderIcon(pet),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "adopt",
          },
        },
        { default: () => "发布领养" }
      ),
    key: "adopt",
    icon: renderIcon(adopt),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "feedback",
          },
        },
        { default: () => "系统反馈" }
      ),
    key: "feedback",
    icon: renderIcon(feedback),
  },
];
watch(
  () => route.fullPath,
  () => {
    updateMenu(route);
  }
);
function updateMenu(route) {
  activeKey.value = route.name;
}
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  margin-top: 20px;
}
</style>