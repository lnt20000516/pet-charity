<template>
  <n-menu
    v-model:value="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>
<script>
import { defineComponent, h, ref, watch } from "vue";
import { NIcon } from "naive-ui";
import { RouterLink, useRoute } from "vue-router";
import { DashboardFilled } from "@vicons/antd";
import { HandHoldingHeart } from "@vicons/fa";
import { DocumentText } from "@vicons/ionicons5";
import {
  TextBulletListAdd24Filled,
  TextBulletListLtr20Filled,
} from "@vicons/fluent";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const { t } = useI18n();
    function renderIcon(icon) {
      return () => h(NIcon, null, { default: () => h(icon) });
    }
    const currentRoute = useRoute();
    const activeKey = ref(currentRoute.name);
    const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "dashboard",
              },
            },
            { default: () => "Dashboard" }
          ),
        key: "dashboard",
        icon: renderIcon(DashboardFilled),
      },
      {
        label: t(`CrowdfundingManagement`),
        key: "donateManage",
        icon: renderIcon(HandHoldingHeart),
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: "donateList",
                  },
                },
                { default: () => t(`CrowdfundingList`) }
              ),
            key: "donateList",
            icon: renderIcon(TextBulletListLtr20Filled),
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    name: "addDonate",
                  },
                },
                { default: () => t(`AddCrowdfunding`) }
              ),
            key: "addDonate",
            icon: renderIcon(TextBulletListAdd24Filled),
          },
        ],
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "feedbackManage",
              },
            },
            { default: () =>t(`Feedback`) }
          ),
        key: "feedbackManage",
        icon: renderIcon(DocumentText),
      },
    ];

    watch(
      () => currentRoute.fullPath,
      () => {
        updateMenu(currentRoute);
      }
    );
    function updateMenu(currentRoute) {
      activeKey.value = currentRoute.name;
    }
    return {
      activeKey,
      menuOptions,
    };
  },
});
</script>

<style lang="scss">
.n-popover {
  cursor: pointer !important;
}
</style>