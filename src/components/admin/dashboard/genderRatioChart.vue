<template>
  <div id="genderChart"></div>
</template>
<style lang="scss">
#genderChart {
  width: 100%;
  height: 100%;
  padding-top: 5px;
}
</style>
<script setup>
import { ref, onMounted, inject } from "vue";
import { useStore } from "vuex";
const echart = inject("echarts");
let maleCount = ref(0);
let femaleCount = ref(0);
let secrecy = ref(0);
const store = useStore();
async function getSexData() {
  const data = await store.dispatch("userGenderAction");
  let total = 0;
  data.map((v) => {
    total = total + v.count;
  });
  data.map((v) => {
    switch (v.sex) {
      case "secrecy": {
        secrecy.value = Math.round((v.count / total) * 100);
        break;
      }
      case "man": {
        maleCount.value = Math.round((v.count / total) * 100);
        break;
      }
      case "woman": {
        femaleCount.value = Math.round((v.count / total) * 100);
        break;
      }
    }
  });
}
onMounted(() => {
  const chart = echart.init(document.getElementById("genderChart"));
  getSexData().then(() => {
    chart.setOption({
      legend: {
        show: false,
      },
      tooltip: {},
      xAxis: {
        show: false,
        type: "value",
      },
      yAxis: {
        type: "category",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          name: "Male",
          type: "bar",
          stack: "total",
          label: {
            show: true,
            position: "insideLeft",
            formatter: "{c}%",
          },
          itemStyle: {
            color: "#81C6E8",
          },
          data: [maleCount.value].map((v) => {
            if (v === 0) {
              return {
                value: 0,
                itemStyle: {
                  opacity: 0,
                },
              };
            } else {
              return v;
            }
          }),
        },
        {
          name: "Female",
          type: "bar",
          stack: "total",
          label: {
            show: true,
            position: "insideRight",
            formatter: "{c}%",
          },
          itemStyle: {
            color: "#E49393",
          },
          data: [femaleCount.value].map((v) => {
            if (v === 0) {
              return {
                value: 0,
                itemStyle: {
                  opacity: 0,
                },
              };
            } else {
              return v;
            }
          }),
        },
        {
          name: "Secrecy",
          type: "bar",
          stack: "total",
          label: {
            show: true,
            position: "insideRight",
            formatter: "{c}%",
          },
          itemStyle: {
            color: "#D8D8D8",
          },
          data: [secrecy.value].map((v) => {
            if (v === 0) {
              return {
                value: 0,
                itemStyle: {
                  opacity: 0,
                },
              };
            } else {
              return v;
            }
          }),
        },
      ],
    });
  });

  window.addEventListener("resize", chart.resize);
});
</script>