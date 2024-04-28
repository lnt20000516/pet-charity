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
  BookContacts20Regular as contact,
  AnimalCat24Regular as pet,
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
            name: "hisPets",
          },
        },
        { default: () => "Ta的宠物" }
      ),
    key: "hisPets",
    icon: renderIcon(pet),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "othersContact",
          },
        },
        { default: () => "联系方式" }
      ),
    key: "othersContact",
    icon: renderIcon(contact),
    show: JSON.parse(localStorage.getItem("userInfo")).verified,
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