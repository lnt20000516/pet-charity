<template>
  <div class="modify-password">
    <n-form ref="formRef" :model="modifyData" :rules="rules">
      <n-form-item path="phone" :label="t(`Tel`)">
        <n-input v-model:value="modifyData.phone" :disabled="true" />
      </n-form-item>
      <n-form-item path="old_password" :label="t(`OldPass`)">
        <n-input
          v-model:value="modifyData.old_password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="new_password" :label="t(`NewPass`)">
        <n-input
          v-model:value="modifyData.new_password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <n-form-item path="re_new_password" :label="t(`ReNewPass`)">
        <n-input
          v-model:value="modifyData.re_new_password"
          :disabled="!modifyData.new_password"
          type="password"
          @keydown.enter.prevent
        />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="modify">
          {{ t(`Modify`) }}
        </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useDialog, useMessage } from "naive-ui";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const message = useMessage();
const dialog = useDialog();
const formRef = ref(null);
const router = useRouter();
const modifyData = reactive({
  phone: JSON.parse(localStorage.getItem("adminInfo")).phone,
  old_password: null,
  new_password: null,
  re_new_password: null,
});
const passwordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  }
  let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
  if (!reg.test(value)) {
    callback(new Error(t(`NewPassErr`)));
  } else {
    callback();
  }
};
const rePasswordRule = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  }
  if (value != modifyData.new_password) {
    callback(new Error(t(`ReNewPassErr`)));
  }
  callback();
};
const rules = reactive({
  phone: [
    { required: true, message: "请输入手机号", trigger: ["input", "blur"] },
  ],
  old_password: [
    {
      required: true,
      message: t(`OldPassEff`),
      trigger: ["input", "blur"],
    },
  ],
  new_password: [
    { required: true, validator: passwordRule, trigger: ["input", "blur"] },
  ],
  re_new_password: [
    { required: true, validator: rePasswordRule, trigger: ["input", "blur"] },
  ],
});

function modify(e) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (!errors) {
      dialog.warning({
        title: t(`warn`),
        content: t(`modifyContent`),
        positiveText: t(`positiveText`),
        negativeText: t(`negativeText`),
        onPositiveClick: async () => {
          const res = await store.dispatch("modifyPasswordAction", modifyData);
          if (res !== false) {
            message.success(t(`modifySuccess`));
            localStorage.removeItem("adminInfo");
            localStorage.removeItem("adminToken");
            router.push({ name: "login" });
          }
        },
        onNegativeClick: () => {
          message.error(t(`modifyErr`));
        },
      });
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss" scoped>
</style>