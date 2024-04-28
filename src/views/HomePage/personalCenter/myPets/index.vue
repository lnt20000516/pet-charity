<template>
  <div class="my-pets">
    <n-tabs
      type="line"
      animated
      v-model:value="petTabsValue"
      @update:value="handleUpdate"
    >
      <n-tab-pane name="myPets" tab="我的宠物"> <MyPet /> </n-tab-pane>
      <n-tab-pane name="addPet" tab="添加宠物/修改宠物信息">
        <AddPet />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import MyPet from "./myPet.vue";
import AddPet from "./addPet.vue";
import { ref } from "vue";
const petTabsValue = ref(localStorage.getItem("petTab") || "myPets");
function handleUpdate(value) {
  localStorage.setItem("petTab", value);
  localStorage.removeItem("petInfo");
}
</script>

<style lang="scss" scoped>
</style>