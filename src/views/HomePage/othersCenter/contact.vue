<template>
  <div class="contact">
    <n-tabs type="line" animated>
      <n-tab-pane name="contact" tab="联系方式">
        <n-form ref="contactFormRef">
          <n-form-item path="phone" label="电话">
            <n-input
              v-model:value="userContact.phone"
              disabled
              placeholder="无"
            />
          </n-form-item>
          <n-form-item path="qq" label="QQ">
            <n-input v-model:value="userContact.qq" disabled placeholder="无" />
          </n-form-item>
          <n-form-item path="mail" label="电子邮件">
            <n-input
              v-model:value="userContact.mail"
              disabled
              placeholder="无"
            />
          </n-form-item>
          <n-form-item path="wechat" label="微信">
            <n-input
              v-model:value="userContact.wechat"
              disabled
              placeholder="无"
            />
          </n-form-item>
        </n-form>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const userContact = ref({
  phone: "",
  qq: "",
  mail: "",
  wechat: "",
});
const userInfo = ref({});
async function getUserInfo() {
  const id = localStorage.getItem("otherId");
  userInfo.value = await store.dispatch("getUserInfoIdAction", id);
  userContact.value = userInfo.value.contact;
}
onMounted(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
</style>s