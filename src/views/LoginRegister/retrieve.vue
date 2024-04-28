<template>
  <div class="retrieve">
    <div class="login-top">
      <p>Welcome to retrieve</p>
      <div class="login-top-r">
        <p>Remember the password?</p>
        <router-link :to="{ path: '/login' }">
          <p style="color: #18a058; cursor: pointer">Sign in</p>
        </router-link>
      </div>
    </div>
    <p class="sign-text">Retrieve password</p>
    <div class="form">
      <n-form
        ref="retrieveFormRef"
        :model="retrieveForm"
        :rules="retrieveRules"
        label-placement="top"
      >
        <n-form-item path="phone" label="Enter your phone number">
          <n-input
            v-model:value="retrieveForm.phone"
            type="text"
            size="large"
            placeholder="电话号码"
            round
            maxlength="11"
            @keydown.enter.prevent
            clearable
            :allow-input="onlyAllowNumber"
          >
          </n-input>
        </n-form-item>
        <n-form-item path="code" label="Enter your verification code">
          <n-input
            type="text"
            v-model:value="retrieveForm.code"
            placeholder="4位验证码"
            :maxlength="4"
            size="large"
            round
            :allow-input="onlyAllowNumber"
            @keydown.enter.prevent
            :loading="loadingCode"
          >
            <template #suffix>
              <span
                :class="{ code: true, disabled: !canClick }"
                @click="countDown(retrieveForm.phone)"
                >{{ content }}</span
              >
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="newPassword" label="Enter your new password">
          <n-input
            type="password"
            show-password-on="mousedown"
            v-model:value="retrieveForm.newPassword"
            placeholder="密码"
            :maxlength="20"
            size="large"
            round
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="rePassword" label="Enter your new password again">
          <n-input
            type="password"
            show-password-on="mousedown"
            v-model:value="retrieveForm.rePassword"
            placeholder="重复密码"
            :maxlength="20"
            size="large"
            round
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-button type="primary" @click="retrieve()" :loading="loading">
          Sign up
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { isTelOk, checkPassword } from "@/tools/regular.js";
import { useSendCode } from "@/tools/countDown";
import { useStore } from "vuex";
const store = useStore();
import { useMessage } from "naive-ui";
const message = useMessage();
import { useRouter } from "vue-router";
const router = useRouter();
const retrieveFormRef = ref(null);
const loadingRef = ref(false);
const loading = loadingRef;
const retrieveForm = reactive({
  phone: localStorage.getItem("activePhone") || "",
  code: "",
  newPassword: "",
  rePassword: "",
});

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const phoneRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入电话号码"));
  }
  let reg = isTelOk(value);
  if (reg != true) {
    callback(new Error(reg));
  }
  callback();
};
const codeRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  }
  callback();
};
const passwordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
  let reg = checkPassword(value);
  if (reg != true) {
    callback(new Error(reg));
  } else {
    callback();
  }
};
const rePasswordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  }
  if (value != retrieveForm.newPassword) {
    callback(new Error("两次密码不一致"));
  }
  callback();
};
const retrieveRules = reactive({
  code: [{ required: true, validator: codeRule, trigger: ["input", "blur"] }],
  phone: [{ required: true, validator: phoneRule, trigger: ["input", "blur"] }],
  newPassword: [
    { required: true, validator: passwordRule, trigger: ["input", "blur"] },
  ],
  rePassword: [
    { required: true, validator: rePasswordRule, trigger: ["input", "blur"] },
  ],
});
const { content, canClick, countDown, loadingCode } = useSendCode();
function retrieve() {
  retrieveFormRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        loadingRef.value = true;
        const isRetrieve = await store.dispatch("retrieveAction", retrieveForm);
        if (isRetrieve) {
          message.success("修改密码成功，返回登录页重新登录");
          localStorage.setItem("activePhone", retrieveForm.phone);
          router.push({ name: "login" });
          return true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingRef.value = false;
      }
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss">
.retrieve {
  width: 30%;
  height: 80%;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 0 5px #b5b5b5;
  background-color: white;
  .login-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .login-top-r {
      font-size: 10px;
    }
  }
  .sign-text {
    font-size: 35px;
    margin: 0;
  }
  .form {
    margin-top: 40px;
    .tip {
      margin-top: 20px;
      margin-bottom: 3px;
    }
    .n-button {
      width: 100%;
      height: 40px;
      margin-top: 10px;
    }
    .code {
      cursor: pointer;
      color: #18a058;
    }
    .disabled {
      cursor: not-allowed;
      color: #b3b3b3 !important;
    }
  }
}
</style>