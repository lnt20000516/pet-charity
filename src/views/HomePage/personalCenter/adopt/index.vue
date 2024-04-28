<template>
  <div class="adopt">
    <n-tabs
      type="line"
      animated
      v-model:value="adoptTabsValue"
      @update:value="handleUpdate"
    >
      <n-tab-pane name="myAdopt" tab="我发布的领养"> <MyAdopt /> </n-tab-pane>
      <n-tab-pane name="addAdopt" tab="发布领养/修改领养信息">
        <AddAdopt />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import MyAdopt from "./myAdopt.vue";
import AddAdopt from "./addAdopt.vue";
import { ref } from "vue";
const adoptTabsValue = ref(localStorage.getItem("adoptTab") || "myAdopt");
function handleUpdate(value) {
  localStorage.setItem("adoptTab", value);
  localStorage.removeItem("adoptInfo");
}
</script>

<style lang="scss" scoped>
</style>