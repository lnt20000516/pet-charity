<template>
  <div>
    <n-result
      status="success"
      title="捐款成功"
      description="感谢您的捐款，祝你生活愉快"
      class="step-result"
    >
      <template #default>
        <div class="information">
          <n-grid
            cols="2 s:2 m:3 l:3 xl:3 2xl:3"
            responsive="screen"
            class="my-1"
          >
            <n-gi>捐赠项目：</n-gi>
            <n-gi>{{ donateInfo.name }}</n-gi>
          </n-grid>
          <n-grid
            cols="2 s:2 m:3 l:3 xl:3 2xl:3"
            responsive="screen"
            class="my-1"
          >
            <n-gi>捐赠金额：</n-gi>
            <n-gi
              >￥<span class="money">{{ money }}</span> 元</n-gi
            >
          </n-grid>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-center">
          <n-button type="primary" @click="returnDonateDetail" class="mr-4"
            >返回众筹列表</n-button
          >
        </div>
      </template>
    </n-result>
  </div>
</template>

<script  setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();

const id = computed(() => {
  return route.query.id || null;
});
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  money: {
    type: String || Number,
  },
});
function returnDonateDetail() {
  router.push({
    path: "/petDonateList",
  });
}
const donateInfo = ref({});
async function getDonateInfo() {
  donateInfo.value = await store.dispatch("getDonateInfoAction", id.value);
}
onMounted(() => {
  getDonateInfo();
});
</script>

<style lang="scss" scoped>
.step-result {
  max-width: 560px;
  margin: 40px auto 0;

  ::v-deep(.n-result-content) {
    background-color: #fafafa;
    padding: 24px 40px;
  }

  .information {
    line-height: 22px;

    .ant-row:not(:last-child) {
      margin-bottom: 24px;
    }
  }

  .money {
    font-family: "Helvetica Neue", sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
}
</style>