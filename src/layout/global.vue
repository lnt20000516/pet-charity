<template>
  <router-view />
</template>

<script>
import { useMessage, useNotification, useLoadingBar } from "naive-ui";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    window.$message = useMessage();
    window.$notification = useNotification();
    window.$loadingBar = useLoadingBar();
  },
});
</script>
