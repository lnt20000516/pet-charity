<template>
  <div class="language">
    <n-dropdown trigger="hover" :options="langList" @select="handleSelect">
      <n-icon size="20">
        <Language />
      </n-icon>
    </n-dropdown>
  </div>
</template>

<script setup>
import { Language } from "@vicons/ionicons5";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const lang = ref(localStorage.getItem("language") || "zh-CN");
const langList = ref([
  {
    label: "English",
    key: "en-US",
  },
  {
    label: "简体中文",
    key: "zh-CN",
  },
]);
function handleSelect(key) {
  location.reload();
  lang.value = key;
  locale.value = key;
  localStorage.setItem("language", key);
}
</script>

<style lang="scss" scoped>
.language {
  margin-right: 10px;
  cursor: pointer;
}
</style>