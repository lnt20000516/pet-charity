<template>
  <div class="layout-content-main">
    <Tag />
    <div class="page-view">
      <router-view v-slot="{ Component }">
        <transition name="fade-v">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import Tag from "./tag.vue";
</script>

<style lang="scss" scoped>
.layout-content-main {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 10px;
  .page-view {
    width: 100%;
    margin-top: 5px;
  }
}
</style>