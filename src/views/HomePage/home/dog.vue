<template>
  <div class="dog">
    <p class="return" @click="backList">
      <n-icon>
        <ArrowBackUp />
      </n-icon>
      返回首页
    </p>
    <div class="variety"><span>超小型</span></div>
    <div class="dog-box">
      <BreedCarousel :list="verySmall" />
    </div>
    <div class="variety"><span>小型</span></div>
    <div class="dog-box">
      <BreedCarousel :list="small" />
    </div>
    <div class="variety"><span>中等</span></div>
    <div class="dog-box">
      <BreedCarousel :list="medium" />
    </div>
    <div class="variety"><span>大型</span></div>
    <div class="dog-box">
      <BreedCarousel :list="large" />
    </div>
    <div class="variety"><span>超大型</span></div>
    <div class="dog-box">
      <BreedCarousel :list="veryLarge" />
    </div>
  </div>
</template>

<script setup>
import { ArrowBackUp } from "@vicons/tabler";
import BreedCarousel from "@/components/user/breedCarousel.vue";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

function backList() {
  router.push({ name: "home" });
}
const verySmall = ref([]);
const small = ref([]);
const medium = ref([]);
const large = ref([]);
const veryLarge = ref([]);
async function getBreedData() {
  const verySmallParams = {
    race: 1,
    variety: "超小型",
  };
  const smallParams = {
    race: 1,
    variety: "小型",
  };
  const mediumParams = {
    race: 1,
    variety: "中等",
  };
  const largeParams = {
    race: 1,
    variety: "大型",
  };
  const veryLargeParams = {
    race: 1,
    variety: "很大型",
  };
  verySmall.value = await store.dispatch("getBreedListAction", verySmallParams);
  small.value = (await store.dispatch("getBreedListAction", smallParams)).slice(
    0,
    10
  );
  medium.value = (
    await store.dispatch("getBreedListAction", mediumParams)
  ).slice(0, 10);
  large.value = (await store.dispatch("getBreedListAction", largeParams)).slice(
    0,
    10
  );
  veryLarge.value = await store.dispatch("getBreedListAction", veryLargeParams);
}
onMounted(() => {
  getBreedData();
});
</script>

<style lang="scss" scoped>
.dog {
  width: 100%;
  height: 100%;
  background: #fff;
  .return {
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 20px;
    padding-top: 20px;
    .n-icon {
      font-size: 16px;
      margin-right: 5px;
    }
  }
  .variety {
    font-size: 25px;
    font-family: "新宋体";
    margin-left: 20px;
    margin-bottom: 20px;
  }
  &-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>