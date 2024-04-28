<template>
  <div class="login">
    <div class="login-top">
      <p>Welcome to login</p>
      <div class="login-top-r">
        <p>No Account?</p>
        <router-link :to="{ path: '/register' }">
          <p style="color: #18a058; cursor: pointer">Sign up</p>
        </router-link>
      </div>
    </div>
    <p class="sign-text">Sign in</p>
    <div class="form">
      <n-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-placement="top"
      >
        <n-form-item path="phone" label="Enter your phone number">
          <n-input
            v-model:value="loginForm.phone"
            type="text"
            size="large"
            placeholder="电话号码"
            round
            maxlength="11"
            @keydown.enter.prevent
            clearable
            :allow-input="onlyAllowNumber"
          />
        </n-form-item>
        <n-form-item path="password" label="Enter your password">
          <n-input
            type="password"
            show-password-on="mousedown"
            v-model:value="loginForm.password"
            placeholder="密码"
            :maxlength="20"
            size="large"
            round
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="identity" label="Pick your identity">
          <n-radio-group v-model:value="status" name="statusSet" size="large">
            <n-radio-button
              :key="identityGroup[0].value"
              :value="identityGroup[0].value"
              :label="identityGroup[0].label"
            />
            <n-radio-button
              :key="identityGroup[1].value"
              :value="identityGroup[1].value"
              :label="identityGroup[1].label"
            />
          </n-radio-group>
        </n-form-item>
        <n-button type="primary" :loading="loading" @click="login()">
          Sign In
        </n-button>
      </n-form>
      <p
        style="
          margin: 20px 0px 20px 0px;
          color: #c0c0c0;
          text-align: center;
          cursor: default;
        "
      >
        OR
      </p>
      <div class="other">
        <p>Forgot your password?</p>
        <router-link to="retrieve">
          <p style="margin-left: 30px; cursor: pointer; color: #18a058">
            retrieve password
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { isTelOk, checkPassword } from "@/tools/regular.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

//登录表单的元素
const loginFormRef = ref(null);

//登录按钮的loading
const loadingRef = ref(false);
const loading = loadingRef;

//登录表单的数据
const loginForm = reactive({
  phone: localStorage.getItem("activePhone") || "15511111111",
  password: "123qwe123",
});

//只允许输入数字
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

//登录表单的rules
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
const passRule = (rule, value, callback) => {
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
const identityRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请选择身份"));
  }
  callback();
};
const loginRules = reactive({
  password: [
    { required: true, validator: passRule, trigger: ["input", "blur"] },
  ],
  phone: [{ required: true, validator: phoneRule, trigger: ["input", "blur"] }],
  identity: [
    { required: true, validator: identityRule, trigger: ["input", "blur"] },
  ],
});

//身份选择
const status = ref("user");
const identityGroup = [
  {
    value: "admin",
    label: "管理员",
  },
  {
    value: "user",
    label: "用户",
  },
];

//处理登录的逻辑
async function login() {
  loadingRef.value = true;
  loginFormRef.value?.validate(async (errors) => {
    if (!errors) {
      let flag;
      try {
        switch (status.value) {
          case "user":
            flag = await store.dispatch("userLoginAction", loginForm);
            router.push("/homePage");
            break;
          case "admin":
            flag = await store.dispatch("adminLoginAction", loginForm);
            router.push("/adminManage");
            break;
        }
        if (flag) {
          window.$message.success("登录成功");
        }
        loadingRef.value = false;
      } catch (error) {
        loadingRef.value = false;
      }
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss">
.login {
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
    .n-button {
      width: 100%;
      height: 40px;
      margin-top: 20px;
    }
    .other {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>