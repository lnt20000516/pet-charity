<template>
  <div class="feedback">
    <div class="feedback-top">
      <n-input-group class="search">
        <n-input :style="{ width: '100%' }" v-model:value="searchValue" />
        <n-button type="primary" ghost @click="search()">
          {{ !closeSearch ? t(`Search`) : t(`CloseSearch`) }}
        </n-button>
      </n-input-group>
    </div>
    <div class="feedback-content">
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="paginationReactive"
        :bordered="false"
        :stripe="false"
        :loading="loading"
        :row-props="rowProps"
      />
      <n-dropdown
        placement="bottom-start"
        trigger="manual"
        :x="x"
        :y="y"
        :options="options"
        :show="showDropdown"
        :on-clickoutside="onClickoutside"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { h, reactive, ref, onMounted, nextTick } from "vue";
import { NGradientText, useMessage, useDialog } from "naive-ui";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const message = useMessage();
const dialog = useDialog();
const columns = [
  {
    key: "score",
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`star`) }
      );
    },
  },
  {
    key: "nickname",
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`nickName`) }
      );
    },
  },
  {
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () =>t(`title`)}
      );
    },
    key: "title",
  },
  {
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`content`) }
      );
    },
    key: "content",
  },
  {
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`CreatedOn`) }
      );
    },
    key: "create_time",
  },
];
const data = ref([]);
const paginationReactive = reactive({
  page: 1,
  pageSize: 8,
  showSizePicker: false,
  onChange: (page) => {
    paginationReactive.page = page;
  },
  onUpdatePageSize: (pageSize) => {
    paginationReactive.pageSize = pageSize;
    paginationReactive.page = 1;
  },
});
const loading = ref(false);
const rowProps = (row) => {
  return {
    onContextmenu: (e) => {
      delId = row.id;
      e.preventDefault();
      showDropdown.value = false;
      nextTick().then(() => {
        showDropdown.value = true;
        x.value = e.clientX;
        y.value = e.clientY;
      });
    },
  };
};
let delId;
const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);
const options = [
  {
    label: () => h("span", { style: { color: "red" } }, t(`delete`)),
    key: "delete",
  },
];
function handleSelect() {
  showDropdown.value = false;
  dialog.warning({
    title: t(`warn`),
    content: t(`warnContent`),
    positiveText: t(`positiveText`),
    negativeText: t(`negativeText`),
    onPositiveClick: async () => {
      const res = await store.dispatch("deleteFeedbackAction", delId);
      if (res === true) {
        message.success(t(`deleteSuccess`));
        const index = data.value.findIndex((item) => item.id === delId);
        if (index != -1) {
          data.value.splice(index, 1);
        }
      }
    },
    onNegativeClick: () => {
      message.error(t(`deleteErr`));
    },
  });
}
function onClickoutside() {
  showDropdown.value = false;
}
const closeSearch = ref(false);
const searchValue = ref(null);
let searchData = {};
function search() {
  if (closeSearch.value) {
    closeSearch.value = false;
    searchData = {};
    searchValue.value = null;
    getFeedbackData();
  } else {
    closeSearch.value = true;
    searchData.search = searchValue.value;
    getFeedbackData();
  }
}
async function getFeedbackData() {
  const res = await store.dispatch("getFeedbackAction", searchData);
  data.value = res;
  data.value.map((v) => {
    v.create_time = v.create_time.slice(0, 10);
  });
}
onMounted(() => {
  loading.value = true;
  getFeedbackData().then(() => {
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.feedback {
  width: 98%;
  min-height: 78vh;
  background-color: #fff;
  &-top {
    width: 100%;
    padding: 20px;
    .search {
      width: 450px;
    }
  }
  &-content {
    margin-left: 10px;
  }
}
</style>