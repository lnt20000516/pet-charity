<template>
  <div class="register">
    <div class="login-top">
      <p>Welcome to register</p>
      <div class="login-top-r">
        <p>Account already exists?</p>
        <router-link :to="{ path: '/login' }">
          <p style="color: #18a058; cursor: pointer">Sign in</p>
        </router-link>
      </div>
    </div>
    <p class="sign-text">Sign up</p>
    <div class="form">
      <n-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-placement="top"
      >
        <n-form-item path="phone" label="Enter your phone number">
          <n-input
            v-model:value="registerForm.phone"
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
            v-model:value="registerForm.code"
            placeholder="4位验证码"
            :maxlength="4"
            size="large"
            round
            :allow-input="onlyAllowNumber"
            :loading="loadingCode"
            @keydown.enter.prevent
          >
            <template #suffix>
              <span
                :class="{ code: true, disabled: !canClick }"
                @click="countDown(registerForm.phone)"
                >{{ content }}</span
              >
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="newPassword" label="Enter your password">
          <n-input
            type="password"
            show-password-on="mousedown"
            v-model:value="registerForm.newPassword"
            placeholder="密码"
            :maxlength="20"
            size="large"
            round
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="rePassword" label="Enter your password again">
          <n-input
            type="password"
            show-password-on="mousedown"
            v-model:value="registerForm.rePassword"
            placeholder="重复密码"
            :maxlength="20"
            size="large"
            round
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-button type="primary" @click="register()" :loading="loading">
          Sign up
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { isTelOk, checkPassword } from "@/tools/regular.js";
import { useStore } from "vuex";
import { useSendCode } from "@/tools/countDown";
import { useRouter } from "vue-router";
const store = useStore();
const registerFormRef = ref(null);
const loadingRef = ref(false);
const loading = loadingRef;
const router = useRouter();
const registerForm = reactive({
  phone: "15555555555",
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
  if (value != registerForm.newPassword) {
    callback(new Error("两次密码不一致"));
  }
  callback();
};
const registerRules = reactive({
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
function register() {
  registerFormRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        loadingRef.value = true;
        const isRegister = await store.dispatch("registerAction", registerForm);
        if (isRegister) {
          const retrieveForm = {
            phone: registerForm.phone,
            code: registerForm.code,
            newPassword: registerForm.newPassword,
          };
          const isRetrieve = await store.dispatch(
            "retrieveAction",
            retrieveForm
          );
          if (isRetrieve) {
            await store.dispatch("userLoginAction", registerForm);
            window.$message.success("注册成功，已为你自动登录");
            router.push("/homePage");
          }
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
.register {
  border-radius: 30px;
  box-shadow: 0 0 5px #b5b5b5;
  background-color: white;
  width: 30%;
  height: 80%;
  padding: 30px;
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