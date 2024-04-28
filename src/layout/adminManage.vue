<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger="bar"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      class="layout-sider"
    >
      <Side :collapsed="collapsed" />
    </n-layout-sider>
    <n-scrollbar>
      <n-layout>
        <n-layout-header class="layout-header-fix">
          <Header v-model:collapsed="collapsed" />
        </n-layout-header>
        <n-layout-content class="layout-content">
          <n-scrollbar>
            <Main />
          </n-scrollbar>
        </n-layout-content>
      </n-layout>
    </n-scrollbar>
  </n-layout>
</template>

<script setup>
import { ref } from "vue";
import Side from "@/components/admin/sider/index.vue";
import Header from "@/components/admin/header/index.vue";
import Main from "@/components/admin/main/index.vue";
const collapsed = ref(false);
</script>

<style lang="scss">
.layout {
  height: 100vh;
  display: flex;
  flex-direction: row;
  flex: auto;
  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
  .layout-header-fix {
    position: sticky;
    top: 0;
    right: 0;
    left: 240px;
    z-index: 11;
  }
  .layout-content {
    flex: auto;
    width: 100%;
    min-height: 100vh;
    background: #f5f7f9;
  }
}
</style>