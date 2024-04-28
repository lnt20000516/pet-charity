<template>
  <div class="info">
    <div class="avatar">
      <img :src="userInfo.head" />
      <n-upload
        action="http://127.0.0.1:8000/user/avatar/upload"
        name="head"
        @error="handleErr"
        @finish="handleFinish"
        :show-file-list="false"
        :headers="userToken"
      >
        <n-button>修改头像</n-button>
        <p style="margin-top: 10px">允许JPG，PNG，JPEG</p>
      </n-upload>
    </div>
    <n-form ref="infoFormRef" :model="updateInfo" :rules="rules">
      <n-form-item path="nickname" label="昵称">
        <n-input v-model:value="updateInfo.nickname" />
      </n-form-item>
      <n-form-item path="qq" label="qq">
        <n-input v-model:value="updateInfo.qq" />
      </n-form-item>
      <n-form-item path="sex" label="性别">
        <n-radio-group v-model:value="updateInfo.sex" name="radiogroup">
          <n-space>
            <n-radio :value="1"> 男 </n-radio>
            <n-radio :value="2"> 女 </n-radio>
            <n-radio :value="0"> 保密 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item path="introduction" label="简介">
        <n-input
          v-model:value="updateInfo.introduction"
          type="textarea"
          maxlength="50"
          show-count
        />
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
import { isQQ } from "@/tools/regular";
const store = useStore();
const message = useMessage();
const infoFormRef = ref(null);
const userInfo = ref(
  store.getters.getUserInfo || JSON.parse(localStorage.getItem("userInfo"))
);
const updateInfo = ref({
  nickname: "",
  qq: "",
  sex: 0,
  introduction: "",
});
async function getUserData() {
  userInfo.value = await store.dispatch("getUserInfoAction");
  updateInfo.value.nickname = userInfo.value.nickname;
  updateInfo.value.qq = userInfo.value.qq;
  updateInfo.value.sex = userInfo.value.sex;
  updateInfo.value.introduction = userInfo.value.introduction;
}
const userToken = {
  TOKEN: userInfo.value?.token || localStorage.getItem("userToken"),
};
onMounted(() => {
  getUserData();
});
const handleFinish = ({ event }) => {
  const response = JSON.parse(event.target.response);
  userInfo.value.head = response.head;
  store.commit("updateUserInfo", userInfo.value);
  message.success("修改头像成功");
};
const handleErr = () => {
  message.error("修改头像失败");
};
function checkQQ(rule, value) {
  if (!value) {
    return new Error("请输入QQ号");
  } else if (!isQQ(value)) {
    return new Error("请输入正确的QQ号");
  }
  return true;
}
function checkSex(rule, value) {
  if (value == null || value == undefined) return new Error("请选择性别");
  return true;
}
const rules = {
  nickname: [
    {
      required: true,
      message: "请输入昵称",
      trigger: ["input", "blur"],
    },
  ],
  qq: [
    {
      required: true,
      validator: checkQQ,
      trigger: ["input", "blur"],
    },
  ],
  sex: [
    {
      required: true,
      validator: checkSex,
      trigger: ["change"],
    },
  ],
  introduction: [
    {
      required: true,
      message: "请输入简介",
      trigger: ["input", "blur"],
    },
  ],
};
function commit() {
  infoFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await store.dispatch(
        "updateUserInfoAction",
        updateInfo.value
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
.info {
  .avatar {
    margin: 20px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    img {
      width: 90px;
      height: 90px;
      margin-right: 20px;
    }
  }
}
</style>