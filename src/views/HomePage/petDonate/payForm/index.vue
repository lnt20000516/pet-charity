<template>
  <div class="pay">
    <div class="pay-main">
      <div class="step">
        <n-space vertical class="steps" justify="center">
          <n-steps :current="currentTab" :status="currentStatus">
            <n-step title="填写捐款信息" description="确保填写正确" />
            <n-step title="确认捐款信息" description="确认捐款信息" />
            <n-step title="完成捐款" description="恭喜您，捐款成功" />
          </n-steps>
          <step1
            v-if="currentTab === 1"
            @nextStep="nextStep"
            @getMoney="changeMoney"
          />
          <step2
            v-if="currentTab === 2"
            @nextStep="nextStep"
            @prevStep="prevStep"
            :money="money"
          />
          <step3 v-if="currentTab === 3" :money="money" />
        </n-space>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import step1 from "./Step1.vue";
import step2 from "./Step2.vue";
import step3 from "./Step3.vue";
const currentTab = ref(1);
const currentStatus = ref("process");
const money = ref(null);
function nextStep() {
  if (currentTab.value < 3) {
    currentTab.value += 1;
  }
}
function prevStep() {
  if (currentTab.value > 1) {
    currentTab.value -= 1;
  }
}

function changeMoney(value) {
  money.value = value;
}
</script>

<style lang="scss" scoped>
.pay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-main {
    width: 85%;
    height: 100%;
    min-height: 50vh;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .step {
      margin-top: 50px;
      width: 60%;
      min-height: 500px;
    }
  }
}
</style>