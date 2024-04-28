<template>
  <div class="retrieve">
    <n-form
      ref="retrieveFormRef"
      :model="retrieveForm"
      :rules="retrieveRules"
      label-placement="top"
    >
      <n-form-item path="phone" label="用户名">
        <n-input v-model:value="retrieveForm.phone" disabled />
      </n-form-item>
      <n-form-item path="oldPassword" label="旧密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="retrieveForm.oldPassword"
          :maxlength="20"
        />
      </n-form-item>
      <n-form-item path="newPassword" label="新密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="retrieveForm.newPassword"
          :maxlength="20"
        />
      </n-form-item>
      <n-form-item path="rePassword" label="重复密码">
        <n-input
          type="password"
          show-password-on="mousedown"
          v-model:value="retrieveForm.rePassword"
          :maxlength="20"
        />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="retrieve"> 提交 </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { checkPassword } from "@/tools/regular.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
const message = useMessage();
const router = useRouter();
const store = useStore();
const retrieveFormRef = ref(null);
const phone = ref(
  store.getters.getUserInfo.phone ||
    JSON.parse(localStorage.getItem("userInfo")).phone
);
const retrieveForm = ref({
  newPassword: "",
  rePassword: "",
  oldPassword: "",
  phone: phone.value,
});

const passwordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入新密码"));
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
    callback(new Error("请确认新密码"));
  }
  if (value != retrieveForm.value.newPassword) {
    callback(new Error("两次密码不一致"));
  }
  callback();
};
const retrieveRules = reactive({
  newPassword: [
    { required: true, validator: passwordRule, trigger: ["input", "blur"] },
  ],
  rePassword: [
    { required: true, validator: rePasswordRule, trigger: ["input", "blur"] },
  ],
  oldPassword: [
    { required: true, message: "请输入旧密码", trigger: ["input", "blur"] },
  ],
  phone: [
    { required: true, message: "请输入手机号", trigger: ["input", "blur"] },
  ],
});
function retrieve() {
  retrieveFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const isRetrieve = await store.dispatch(
        "retrieveAction",
        retrieveForm.value
      );
      if (isRetrieve) {
        message.success("修改成功，请重新登录");
        router.push({ name: "login" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userToken");
        return true;
      }
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss" scoped>
.retrieve {
  margin: 20px 0px;
}
</style>