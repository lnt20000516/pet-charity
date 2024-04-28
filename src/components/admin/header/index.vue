<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <div
        @click="() => $emit('update:collapsed', !collapsed)"
        class="layout-header-trigger layout-header-trigger-min"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <n-breadcrumb>
        <template
          v-for="routeItem in breadcrumbList"
          :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name"
        >
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <Language />
      <FullScreen />
      <Avatar />
    </div>
  </div>
</template>

<script>
import components from "./components";
import { defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: { ...components },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const generator = (routerMap) => {
      return routerMap.map((item) => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name,
          disabled: item.path === "/",
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
          // Recursion
          currentMenu.children = generator(item.children, currentMenu);
        }
        return currentMenu;
      });
    };

    const breadcrumbList = computed(() => {
      return generator(route.matched);
    });
    const dropdownSelect = (key) => {
      router.push({ name: key });
    };
    return {
      breadcrumbList,
      dropdownSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 64px;
  box-shadow: 0 1px 4px #00152914;
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;
  &-left {
    display: flex;
    align-items: center;
  }
  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }
  }
  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
  .n-icon {
    cursor: pointer;
  }
}
</style>