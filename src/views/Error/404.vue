<template>
  <div class="err404">
    <lottie-player
      src="https://assets5.lottiefiles.com/packages/lf20_ev7j1sm1.json"
      background="transparent"
      speed="1"
      style="width: 500px; height: 500px"
      loop
      autoplay
    ></lottie-player>
    <div class="info">抱歉，你访问的页面不存在</div>
    <div class="handles">
      <n-button type="tertiary" @click="goBack()">返回上一页</n-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function goBack() {
  router.go(-1);
}
</script>

<style lang="scss">
.err404 {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  .info {
    font-size: 15px;
    color: #aaa;
  }
  .handles {
    display: inline-block;
    margin-top: 10px;
  }
}
</style>