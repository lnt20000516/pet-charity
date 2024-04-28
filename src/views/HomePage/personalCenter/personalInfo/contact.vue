<template>
  <div class="contact">
    <n-form ref="contactFormRef" :model="contactModel" :rules="rules">
      <n-form-item path="phone" label="电话">
        <n-input v-model:value="contactModel.phone" />
      </n-form-item>
      <n-form-item path="qq" label="QQ">
        <n-input v-model:value="contactModel.qq" />
      </n-form-item>
      <n-form-item path="mail" label="电子邮件">
        <n-input v-model:value="contactModel.mail" />
      </n-form-item>
      <n-form-item path="wechat" label="微信">
        <n-input v-model:value="contactModel.wechat" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="commit"> 提交 </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
import { isQQ, isEmail, isTelOk } from "@/tools/regular";
const store = useStore();
const message = useMessage();
const contactFormRef = ref(null);
const userInfo = ref(
  store.getters.getUserInfo || JSON.parse(localStorage.getItem("userInfo"))
);
const contactModel = ref({
  phone: "",
  qq: "",
  mail: "",
  wechat: "",
});
function checkQQ(rule, value) {
  if (!value) {
    return new Error("请输入QQ号");
  } else if (!isQQ(value)) {
    return new Error("请输入正确的QQ号");
  }
  return true;
}
function checkPhone(rule, value) {
  if (!value) {
    return new Error("请输入电话号码");
  } else if (isTelOk(value) != true) {
    return new Error(isTelOk(value));
  }
  return true;
}
function checkMail(rule, value) {
  if (!value) {
    return new Error("请输入电子邮箱");
  } else if (!isEmail(value)) {
    return new Error("邮箱格式有误");
  }
  return true;
}
const rules = {
  qq: [
    {
      required: true,
      validator: checkQQ,
      trigger: ["input", "blur"],
    },
  ],
  phone: [
    {
      required: true,
      validator: checkPhone,
      trigger: ["input", "blur"],
    },
  ],
  mail: [
    {
      required: true,
      validator: checkMail,
      trigger: ["input", "blur"],
    },
  ],
  wechat: [
    {
      required: true,
      message: "请输入微信号",
      trigger: ["input", "blur"],
    },
  ],
};
async function getUserData() {
  userInfo.value = await store.dispatch("getUserInfoAction");
  contactModel.value.phone = userInfo.value.contact.phone;
  contactModel.value.qq = userInfo.value.contact.qq;
  contactModel.value.mail = userInfo.value.contact.mail;
  contactModel.value.wechat = userInfo.value.contact.wechat;
}
onMounted(() => {
  getUserData();
});
function commit() {
  contactFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await store.dispatch(
        "updateContactAction",
        contactModel.value
      );
      if (res == true) message.success("修改成功");
      else {
        const data = res.response.data;
        for (let v in data) {
          message.error(data[v][0]);
        }
      }
    }
  });
}
</script>

<style lang="scss" scoped>
.contact {
  margin: 20px 0px;
}
</style>