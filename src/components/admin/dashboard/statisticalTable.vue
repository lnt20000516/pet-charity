<template>
  <div class="table-box">
    <div class="title">{{t(`StatisticsList_Top10`)}}</div>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="paginationReactive"
      :bordered="false"
      :stripe="false"
      :loading="loading"
    />
  </div>
</template>
<script setup>
import { NGradientText } from "naive-ui";
import { h, ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const data = ref([
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
  { no: 4, title: "Don't Look Back in Anger", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
]);
const store = useStore();
const columns = [
  {
    key: "phone",
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`UserName`) }
      );
    },
  },
  {
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () =>t(`Amount`) }
      );
    },
    key: "amount",
  },
  {
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`AmountDate`) }
      );
    },
    key: "time",
  },
];
const paginationReactive = reactive({
  page: 1,
  pageSize: 3,
  showSizePicker: false,
  onChange: (page) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  },
});
const loading = ref(false);
async function getTableData() {
  const res = await store.dispatch("donateAmountTopAction");
  data.value = res.map((v) => {
    return {
      amount: v.amount,
      phone: v.user.phone,
      time: v.donate_time.replace("T", " ").slice(0, 19),
    };
  });
  //   console.log(res);
}
onMounted(() => {
  loading.value = true;
  getTableData().then(() => {
    loading.value = false;
  });
});
</script>
<style lang="scss" scoped>
.table-box {
  .title {
    text-align: center;
    font-size: 20px;
    padding-top: 20px;
    margin-bottom: 10px;
  }
  margin: 0px 20px;
}
</style>