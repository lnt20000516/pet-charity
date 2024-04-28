<template>
  <div class="index">
    <div class="box zoomIn">
      <router-view v-slot="{ Component }">
        <transition
          name="fade-transform"
          mode="out-in"
          :duration="{ enter: 400, leave: 400 }"
          appear
        >
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div>
    <!-- <img src="@/assets/imgs/bg-l.png" id="l" class="fadeIn" />
    <img src="@/assets/imgs/bg-r.png" id="r" class="fadeIn" /> -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  localStorage.clear();
});
</script>

<style lang="scss">
.index {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/imgs/bg.png");
  overflow: hidden;
  #l {
    width: 269px;
    height: 256px;
    position: absolute;
    top: 150px;
    left: 180px;
  }
  #r {
    width: 450px;
    height: 450px;
    position: absolute;
    top: 50px;
    right: 80px;
    z-index: 1;
  }
  .box {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
}
</style>