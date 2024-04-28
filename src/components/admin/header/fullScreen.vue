<template>
  <div class="fullScreen">
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="20" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <FullScreenExit v-else />
        </n-icon>
      </template>
      {{ !isFullscreen ? "全屏" : "取消全屏" }}
    </n-tooltip>
  </div>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
const { isFullscreen, toggle } = useFullscreen();
import {
  FullscreenExitOutlined as FullScreenExit,
  FullscreenOutlined as FullScreen,
} from "@vicons/antd";

</script>

<style lang="scss" scoped>
.fullScreen {
  cursor: pointer;
  margin-right: 20px;
}
</style>