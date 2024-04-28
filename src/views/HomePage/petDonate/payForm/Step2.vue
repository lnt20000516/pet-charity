<template>
  <n-form
    :label-width="90"
    :model="donateModel"
    :rules="rules"
    label-placement="left"
    ref="donateFormRef"
    style="max-width: 500px; margin: 40px auto 0 80px"
  >
    <n-form-item label="付款账户" path="myAccount">
      <span>账户余额</span>
    </n-form-item>
    <n-form-item label="捐赠项目" path="project">
      <span>{{ donateInfo.name }}</span>
    </n-form-item>
    <n-form-item label="转账金额" path="money">
      <span>￥{{ money }}</span>
    </n-form-item>
    <n-divider />
    <n-form-item label="支付密码" path="payPassword">
      <n-input type="password" v-model:value="donateModel.payPassword" />
    </n-form-item>
    <div style="margin-left: 80px">
      <n-space>
        <n-button @click="prevStep">上一步</n-button>
        <n-button type="primary" :loading="loading" @click="formSubmit"
          >提交</n-button
        >
      </n-space>
    </div>
  </n-form>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps({
  money: {
    type: String || Number,
  },
});
const id = computed(() => {
  return route.query.id || null;
});

const loading = ref(false);
const donateFormRef = ref(null);
const donateModel = ref({
  donateId: Number(id.value),
  amount: Number(props.money),
  payPassword: "",
});

const rules = {
  payPassword: {
    required: true,
    message: "请输入支付密码",
    trigger: "blur",
  },
};

const emit = defineEmits(["prevStep", "nextStep"]);

function prevStep() {
  emit("prevStep");
}

function formSubmit() {
  loading.value = true;
  donateFormRef.value.validate(async (errors) => {
    if (!errors) {
      const res = await store.dispatch(
        "makeDonationsAction",
        donateModel.value
      );
      if (res) {
        emit("nextStep");
      }
    }
  });
  loading.value = false;
}
const donateInfo = ref({});
async function getDonateInfo() {
  donateInfo.value = await store.dispatch("getDonateInfoAction", id.value);
}
onMounted(() => {
  getDonateInfo();
});
</script>