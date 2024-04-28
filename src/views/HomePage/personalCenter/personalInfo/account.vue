<template>
  <div class="account">
    <n-divider>修改支付密码</n-divider>
    <n-form
      ref="payFormRef"
      :model="payForm"
      :rules="rules"
      label-placement="top"
    >
      <n-form-item path="phone" label="用户名">
        <n-input
          v-model:value="payForm.phone"
          type="text"
          maxlength="11"
          disabled
        >
        </n-input>
      </n-form-item>
      <n-form-item path="code" label="验证码">
        <n-input
          type="text"
          v-model:value="payForm.code"
          placeholder="4位验证码"
          :maxlength="4"
          :allow-input="onlyAllowNumber"
        >
          <template #suffix>
            <span
              :class="{ code: true, disabled: !canClick }"
              @click="countDown(payForm.phone)"
              >{{ content }}</span
            >
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="newPayPassword" label="新支付密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="payForm.newPayPassword"
          placeholder="支付密码为6位"
          :minLength="6"
          :maxlength="6"
          :allow-input="onlyAllowNumber"
        />
      </n-form-item>
      <n-form-item path="rePayPassword" label="重复支付密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="payForm.rePayPassword"
          :maxlength="6"
          :allow-input="onlyAllowNumber"
        />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="commit"> 提交 </n-button>
      </div>
    </n-form>
    <n-divider>账户余额</n-divider>
    <div class="balance">
      <n-statistic label="您的账户余额为" tabular-nums>
        <n-number-animation
          ref="numberAnimationInstRef"
          :from="0"
          :to="balance"
        />
        <template #suffix> ￥ </template>
      </n-statistic>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useStore } from "vuex";
import { useSendCode } from "@/tools/countDown";
const { content, canClick, countDown } = useSendCode();
import { useMessage } from "naive-ui";
const message = useMessage();
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const store = useStore();
const userInfo = ref(
  store.getters.userInfo || JSON.parse(localStorage.getItem("userInfo"))
);
const balance = ref(userInfo.value.balance);
const reload = inject("reload");
const payFormRef = ref(null);
const payForm = ref({
  code: "",
  newPayPassword: "",
  phone: userInfo.value.phone,
  rePayPassword: "",
});
const codeRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  }
  callback();
};
const rePayPasswordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请确认新密码"));
  }
  if (value != payForm.value.newPayPassword) {
    callback(new Error("两次密码不一致"));
  }
  callback();
};
const newPayPasswordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入新密码"));
  } else if (value.length != 6) {
    callback(new Error("支付密码必须为6位"));
  }
  callback();
};
const rules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: ["input", "blur"] },
  ],
  code: [{ required: true, validator: codeRule, trigger: ["input", "blur"] }],
  newPayPassword: [
    {
      required: true,
      validator: newPayPasswordRule,
      trigger: ["input", "blur"],
    },
  ],
  rePayPassword: [
    {
      required: true,
      validator: rePayPasswordRule,
      trigger: ["input", "blur"],
    },
  ],
};
function commit() {
  payFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const isRetrieve = await store.dispatch(
        "updatePayPasswordAction",
        payForm.value
      );
      if (isRetrieve == true) {
        message.success("修改成功");
        reload();
      }
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss" scoped>
.account {
  margin: 20px 0px;
  .code {
    cursor: pointer;
    color: #18a058;
  }
  .balance {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>