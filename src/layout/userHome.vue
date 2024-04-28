<template>
  <n-layout class="user-home">
    <n-scrollbar style="max-height: 100vh">
      <n-layout-header class="user-home-header">
        <Header />
      </n-layout-header>
      <n-layout-content class="user-home-content">
        <router-view v-slot="{ Component }">
          <transition name="fade-v">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-layout-content>
    </n-scrollbar>
  </n-layout>
</template>

<script setup>
import Header from "@/components/user/header/index.vue";
</script>

<style lang="scss" scoped>
.user-home {
  width: 100%;
  min-height: 100vh;
  background: #f5f7f9;
  position: relative;
  &-header {
    width: 100%;
    height: 10vh;
    background: #fff;
    border-bottom: 1px solid #e6e6e6a3;
    position: fixed;
    top: 0;
    z-index: 3;
  }
  &-content {
    margin-top: 72px;
    width: 100%;
    min-height: 90vh;
    background: #f5f7f9;
  }
}
</style>