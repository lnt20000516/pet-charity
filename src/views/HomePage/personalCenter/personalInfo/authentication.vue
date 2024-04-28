<template>
  <div class="authentication">
    <!-- <div class="tip">
      v-if="verified"
      <p>您已实名认证</p>
    </div> -->
    <n-watermark
      content="您已实名认证"
      cross
      selectable
      :font-size="16"
      :line-height="16"
      :width="192"
      :height="128"
      :x-offset="12"
      :y-offset="28"
      :rotate="-15"
    >
      <n-form ref="realFormRef" :model="realModel" :rules="rules">
        <n-form-item path="realName" label="真实姓名">
          <n-input v-model:value="realModel.realName" :disabled="verified" />
        </n-form-item>
        <n-form-item path="idCard" label="身份证号" v-show="!verified">
          <n-input v-model:value="realModel.idCard" :disabled="verified" />
        </n-form-item>
        <div
          style="display: flex; justify-content: flex-end"
          v-show="!verified"
        >
          <n-button round type="primary" @click="commit"> 提交 </n-button>
        </div>
      </n-form>
    </n-watermark>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
import { isCardID } from "@/tools/regular";
const reload = inject("reload");
const store = useStore();
const message = useMessage();
const realFormRef = ref(null);
const userInfo = ref(
  store.getters.getUserInfo || JSON.parse(localStorage.getItem("userInfo"))
);
const verified = ref(false);
const realModel = ref({
  realName: "",
  idCard: "",
});
function checkCardID(rule, value) {
  if (!value) {
    return new Error("请输入身份证号");
  } else if (!isCardID(value)) {
    return new Error("请输入正确的身份证号");
  }
  return true;
}
const rules = {
  idCard: [
    {
      required: true,
      validator: checkCardID,
      trigger: ["input", "blur"],
    },
  ],
  realName: [
    {
      required: true,
      message: "请输入真实姓名",
      trigger: ["input", "blur"],
    },
  ],
};
function commit() {
  realFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = store.dispatch("authenticationAction", realModel.value);
      if (res == true) {
        message.success("实名认证成功");
        reload();
      }
    }
  });
}
async function getUserData() {
  userInfo.value = await store.dispatch("getUserInfoAction");
  realModel.value.realName = userInfo.value.real_name;
  verified.value = userInfo.value.verified;
}
onMounted(() => {
  getUserData();
});
</script>

<style lang="scss" scoped>
.authentication {
  margin: 20px 0px;
  .tip {
    font-size: 28px;
    text-align: center;
    color: #aaa;
  }
}
</style>