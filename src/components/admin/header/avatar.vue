<template>
  <div class="avatar">
    <n-dropdown :options="options" @select="handleSelect">
      <n-avatar round :size="40" :src="adminInfo.head" />
    </n-dropdown>
  </div>
</template>

<script setup>
import { NIcon } from "naive-ui";
import { h } from "vue";
import {
  // PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
const options = [
  // {
  //   label: t(`PersonalCenter`),
  //   key: "profile",
  //   icon: renderIcon(UserIcon),
  // },
  {
    label: t(`LoginOut`),
    key: "logout",
    icon: renderIcon(LogoutIcon),
  },
];
function handleSelect(key) {
  switch (key) {
    // case "profile": {
    //   router.push({ name: "personalCenter" });
    //   break;
    // }
    case "logout": {
      router.push({ name: "login" });
      localStorage.clear();
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;
}
</style>