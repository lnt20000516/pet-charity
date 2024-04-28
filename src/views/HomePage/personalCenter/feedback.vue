<template>
  <div class="feedback">
    <n-divider>添加用户反馈</n-divider>
    <n-form ref="feedbackFormRef" :model="feedbackModel" :rules="rules">
      <n-form-item path="nickname" label="昵称">
        <n-input v-model:value="feedbackModel.nickname" disabled />
      </n-form-item>
      <n-form-item path="title" label="标题">
        <n-input v-model:value="feedbackModel.title" />
      </n-form-item>
      <n-form-item path="content" label="内容">
        <n-input
          v-model:value="feedbackModel.content"
          type="textarea"
          maxlength="30"
          show-count
        />
      </n-form-item>
      <n-form-item path="score" label="评级">
        <n-rate v-model:value="feedbackModel.score" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="commit"> 提交 </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useMessage } from "naive-ui";
import { useStore } from "vuex";
const store = useStore();
const message = useMessage();
const reload = inject("reload");
const userInfo = ref(
  store.getters.getUserInfo || JSON.parse(localStorage.getItem("userInfo"))
);
const feedbackFormRef = ref(null);
const feedbackModel = ref({
  nickname: userInfo.value.nickname,
  title: "",
  content: "",
  score: 0,
});
const rules = {
  nickname: [
    {
      required: true,
      message: "请输入昵称",
      trigger: ["input", "blur"],
    },
  ],
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: ["input", "blur"],
    },
  ],
  content: [
    {
      required: true,
      message: "请输入内容",
      trigger: ["input", "blur"],
    },
  ],
  score: [
    {
      required: true,
      validator(rule, value) {
        if (value == 0) {
          return new Error("请选择评级");
        }
        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
};
function commit() {
  feedbackFormRef.value?.validate(async (errors) => {
    if (!errors) {
      await store.dispatch("addFeedbackAction", feedbackModel.value);
      reload();
      message.success("感谢您的反馈，我们一定会做的更好");
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss" scoped>
</style>