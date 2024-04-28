<template>
  <div class="dashboard">
    <div class="dashboard-left">
      <StatisticChat />
      <div class="table">
        <StatisticalTable />
      </div>
    </div>
    <div class="dashboard-right">
      <div class="genderChartBox">
        <p class="title">{{ t(`UserRatio`) }}</p>
        <div class="genderChartItem"><GenderRatioChart /></div>
      </div>
      <div class="userCount">
        <n-card
          :title="t(`UsersNumber`)"
          hoverable
          :segmented="{
            content: true,
          }"
        >
          <template #header-extra>
            <n-icon size="30" :component="Users" color="#18A058" />
          </template>
          <n-skeleton v-if="loading" text :repeat="3" />
          <n-statistic tabular-nums v-else>
            <n-number-animation
              :from="0"
              :to="statisticsData.userCount"
              :duration="5000"
            />
          </n-statistic>
        </n-card>
        <n-card
          :title="t(`CrowdfundingNumber`)"
          hoverable
          :segmented="{
            content: true,
          }"
        >
          <template #header-extra>
            <n-icon size="30" :component="Donate" color="#F0A020" />
          </template>
          <n-skeleton v-if="loading" text :repeat="3" />
          <n-statistic tabular-nums v-else>
            <n-number-animation
              :from="0"
              :to="statisticsData.donateCount"
              :duration="5000"
            />
          </n-statistic>
        </n-card>
        <n-card
          :title="t(`CrowdfundingAmount`)"
          hoverable
          :segmented="{
            content: true,
          }"
        >
          <template #header-extra>
            <n-icon size="30" :component="MoneyBillWave" color="#2080F0" />
          </template>
          <n-skeleton v-if="loading" text :repeat="3" />
          <n-statistic tabular-nums v-else>
            <template #prefix> $ </template>
            <n-number-animation
              :from="0"
              :to="statisticsData.donateAmount"
              :duration="4000"
            />
          </n-statistic>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatisticChat from "@/components/admin/dashboard/statisticalChat.vue";
import StatisticalTable from "@/components/admin/dashboard/statisticalTable.vue";
import GenderRatioChart from "@/components/admin/dashboard/genderRatioChart.vue";
import { reactive, ref, onMounted } from "vue";
import { Users } from "@vicons/tabler";
import { Donate, MoneyBillWave } from "@vicons/fa";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let statisticsData = reactive({
  userCount: 10,
  donateCount: 10,
  donateAmount: 1000,
});
const loading = ref(false);
const store = useStore();
async function getStatisticsData() {
  statisticsData = await store.dispatch("statisticsAction");
}
onMounted(() => {
  loading.value = true;
  getStatisticsData().then(() => {
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .dashboard-left {
    width: 58%;
    height: 100%;
    .table {
      width: 100%;
      height: 42vh;
      background-color: #fff;
      margin-top: 15px;
      &:hover {
        box-shadow: 0 8px 16px rgba(150, 150, 150, 0.2);
      }
    }
  }
  .dashboard-right {
    width: 35%;
    height: 100%;
    margin-right: 40px;
    .userCount {
      .n-card {
        margin-top: 10px;
      }
    }
    .genderChartBox {
      width: 100%;
      height: 30%;
      background-color: #fff;
      .title {
        width: 100%;
        height: 20%;
        padding-left: 20px;
        padding-top: 15px;
        font-size: 18px;
      }
      .genderChartItem {
        width: 100%;
        height: 80%;
      }
      &:hover {
        box-shadow: 0 8px 16px rgba(150, 150, 150, 0.2);
      }
    }
  }
}
</style>