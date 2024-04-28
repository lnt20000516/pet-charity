<template>
  <div class="header">
    <div class="header-left">
      <Menu />
    </div>
    <div class="header-right">
      <Avatar />
    </div>
  </div>
</template>

<script setup>
import Menu from "./menu.vue";
import Avatar from "./avatar.vue";
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  &-left {
    width: 80%;
    height: 100%;
  }
  &-right {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 50px;
    justify-content: flex-end;
  }
}
</style>