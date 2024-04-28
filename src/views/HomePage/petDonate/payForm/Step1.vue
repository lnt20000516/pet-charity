<template>
  <n-form
    :label-width="90"
    :model="donateModel"
    :rules="rules"
    label-placement="left"
    ref="donateFormRef"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="付款账户">
      <n-input type="text" placeholder="账户余额" disabled />
    </n-form-item>
    <n-form-item label="众筹项目">
      <n-input type="text" :placeholder="donateInfo.name" disabled />
    </n-form-item>
    <n-form-item label="捐赠金额" path="money">
      <n-input
        placeholder="请输入捐赠金额"
        v-model:value="donateModel.money"
        :allow-input="onlyAllowNumber"
      >
        <template #prefix>
          <span class="text-gray-400">￥</span>
        </template>
      </n-input>
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button type="tertiary" @click="toDonateList"
          >返回众筹详情页</n-button
        >
        <n-button type="primary" @click="submit">下一步</n-button>
      </n-space>
    </div>
  </n-form>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useStore } from "vuex";
const store = useStore();
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const id = computed(() => {
  return route.query.id || null;
});
const donateInfo = ref({});
const donateFormRef = ref(null);
const donateModel = ref({
  donateId: id.value,
  money: null,
});
const rules = {
  money: [
    {
      required: true,
      validator(rule, value) {
        const maxMoney =
          donateInfo.value.amount - donateInfo.value.already_amount;
        if (!value) {
          return new Error("请输入捐款金额");
        } else if (Number(value) < 0 || Number(value) > maxMoney) {
          return new Error("金额必须大于0且小于" + maxMoney);
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
};
const emit = defineEmits(["nextStep", "getMoney"]);

async function getDonateInfo() {
  donateInfo.value = await store.dispatch("getDonateInfoAction", id.value);
  console.log(donateInfo.value);
}
onMounted(() => {
  getDonateInfo();
});
function submit() {
  donateFormRef.value.validate((errors) => {
    if (!errors) {
      emit("nextStep");
      emit("getMoney", donateModel.value.money);
    }
  });
}
function toDonateList() {
  router.push({
    path: "/petDonateDetail",
    query: {
      id: id.value,
    },
  });
}
</script>