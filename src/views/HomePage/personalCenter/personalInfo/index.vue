<template>
  <div class="personal-info">
    <n-tabs
      type="line"
      animated
      v-model:value="tabsValue"
      @update:value="handleUpdate"
    >
      <n-tab-pane name="info" tab="基础信息"> <Info /> </n-tab-pane>
      <n-tab-pane name="contact" tab="联系方式"> <Contact /> </n-tab-pane>
      <n-tab-pane name="authentication" tab="实名认证">
        <Authentication />
      </n-tab-pane>
      <n-tab-pane name="password" tab="修改密码"> <Retrieve /> </n-tab-pane>
      <n-tab-pane name="account" tab="账户信息"> <Account /> </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import Info from "./info.vue";
import Contact from "./contact.vue";
import Authentication from "./authentication.vue";
import Retrieve from "./retrieve.vue";
import Account from "./account.vue";
import { ref } from "vue";
const tabsValue = ref(localStorage.getItem("personalTab") || "info");
function handleUpdate(value) {
  localStorage.setItem("personalTab", value);
}
</script>

<style lang="scss" scoped>

</style>