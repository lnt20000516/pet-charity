<template>
  <div class="cat">
    <p class="return" @click="backList">
      <n-icon>
        <ArrowBackUp />
      </n-icon>
      返回首页
    </p>
    <div class="variety"><span>短毛</span></div>
    <div class="cat-box">
      <BreedCarousel :list="shortHair" />
    </div>
    <div class="variety"><span>中长毛</span></div>
    <div class="cat-box">
      <BreedCarousel :list="mediumHair" />
    </div>
    <div class="variety"><span>长毛</span></div>
    <div class="cat-box">
      <BreedCarousel :list="longHair" />
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
const shortHair = ref([]);
const mediumHair = ref([]);
const longHair = ref([]);
async function getBreedData() {
  const shortHairParams = {
    race: 0,
    variety: "短毛",
  };
  const mediumHairParams = {
    race: 0,
    variety: "中长毛",
  };
  const longHairParams = {
    race: 0,
    variety: "长毛",
  };

  shortHair.value = await store.dispatch("getBreedListAction", shortHairParams);
  mediumHair.value = await store.dispatch(
    "getBreedListAction",
    mediumHairParams
  );
  longHair.value = await store.dispatch("getBreedListAction", longHairParams);
}
onMounted(() => {
  getBreedData();
});
</script>

<style lang="scss" scoped>
.cat {
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