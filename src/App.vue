<template>
  <n-loading-bar-provider>
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <global-container />
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-loading-bar-provider>
</template>

<script setup>
import GlobalContainer from "@/layout/global.vue";
import { provide } from "vue";
import * as echarts from "echarts";
provide("echarts", echarts);
</script>

 <style lang="scss">
@import "@/assets/scss/common.scss";
</style>

