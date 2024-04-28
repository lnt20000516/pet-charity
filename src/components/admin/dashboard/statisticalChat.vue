<template>
  <div class="chart">
    <div class="title">{{t(`Statistics_10Day`)}}</div>
    <div id="chart" class="chart-box"></div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const echart = inject("echarts");
let data = reactive([]);
let xData = reactive([]);
let yData = reactive([]);
const store = useStore();
async function getData() {
  data = await store.dispatch("donateAmountStatisticsAction");
  xData = data.map((v) => v.date);
  yData = data.map((v) => v.amount);
}
onMounted(() => {
  const myChart = echart.init(document.getElementById("chart"));
  getData().then(() => {
    myChart.setOption({
      xAxis: {
        type: "category",
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: yData,
          type: "bar",
        },
      ],
      color: ["#A6CF98"],
      //A6CF98 7FB77E 7FCD91
    });
  });
  window.addEventListener("resize", myChart.resize);
});
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s ease-in-out;
  .title {
    font-size: 20px;
    padding-top: 20px;
  }
  .chart-box {
    width: 100%;
    height: 100%;
  }
}
.chart:hover {
  box-shadow: 0 8px 16px rgba(150, 150, 150, 0.2);
}
</style>