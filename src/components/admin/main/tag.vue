<template>
  <div class="main-tag">
    <div
      class="tag-item"
      :class="{ 'active-item': item.path === activePath }"
      v-for="(item, index) in tags"
      :key="item.path"
    >
      <span @click="goPage(item.path)">{{ item.name }}</span>
      <n-icon
        size="15"
        :component="Close"
        @click="handleClose(index)"
        v-if="index !== 0"
      />
    </div>
  </div>
</template>

<script setup>
import { Close } from "@vicons/ionicons5";
import { reactive, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const activePath = ref("");
const tags = reactive([
  {
    name: route.meta.title,
    path: route.fullPath,
  },
]);
watch(
  () => route,
  (to) => {
    activePath.value = to.fullPath;
    const hasTag = tags.find((item) => item.path === to.fullPath);
    if (!hasTag) {
      tags.push({
        name: to.meta.title,
        path: to.fullPath,
      });
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
function goPage(path) {
  router.push(path);
}
function handleClose(index) {
  tags.splice(index, 1);
  let path = "";
  if (tags[index]) path = tags[index].path;
  else path = tags[index - 1].path;
  router.push({ path: path });
}
</script>

<style lang="scss" scoped>
.main-tag {
  width: 100%;
  height: 44px;
  display: flex;
  transition: all 0.2s ease-in-out;
  .tag-item {
    white-space: nowrap;
    overflow: hidden;
    height: 32px;
    padding: 6px 16px 4px;
    border-radius: 3px;
    margin-right: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    color: #1f2225;
    .n-icon {
      margin-left: 5px;
      color: #808695;
    }
    &:hover {
      color: #515a6e;
      box-shadow: 0 4px 8px rgba(150, 150, 150, 0.2);
    }
  }
  .active-item,
  .active-item:hover {
    color: #18a058;
  }
}
</style>