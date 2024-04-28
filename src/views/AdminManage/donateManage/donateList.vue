<template>
  <div class="donate">
    <div class="donate-header">
      <div class="donate-header-top">
        <n-input-group class="search">
          <n-input :style="{ width: '100%' }" v-model:value="searchValue" />
          <n-button type="primary" ghost @click="search()">
            {{ !closeSearch ? t(`Search`) :t(`CloseSearch`) }}
          </n-button>
        </n-input-group>
      </div>
    </div>
    <div class="donate-content">
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
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        :title="rowData.name"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra>
          <span class="state" @click="changeState(rowData)">{{ state }}</span>
        </template>
        <div class="tips">
          <span>{{t(`CompletedAmount`)}}：{{ rowData.already_amount }}</span>
          <span>{{t(`TargetAmount`)}}：{{ rowData.amount }}</span>
        </div>
        <n-progress
          type="line"
          :percentage="percentage"
          :indicator-placement="'inside'"
          processing
          status="success"
        />
        <div class="content-top">
          <n-image
            width="200"
            :src="rowData.cover_image.image"
            preview-disabled
          />
          <div class="content-top-right">
            <span>{{ rowData.breed.name }} | {{ rowData.breed.variety }}</span>
            <span>{{t(`Sex`)}}：{{ rowData.sex_value }}</span>
            <span>{{t(`Weight`)}}：{{ rowData.weight }}kg</span>
            <span>{{t(`Birth`)}}：{{ rowData.birth }}</span>
          </div>
        </div>
        <n-divider />
        <div class="content-bottom">
          <div class="desc">{{ rowData.description }}</div>
          <div
            style="
              overflow: auto;
              width: 530px;
              display: flex;
              flex-direction: row;
              gap: 8px;
            "
          >
            <n-image-group>
              <n-image
                v-for="(item, index) in rowData.images"
                :key="index"
                width="100"
                height="100"
                :src="item.image"
              >
              </n-image>
            </n-image-group>
          </div>
        </div>
        <template #footer>
          <div class="footer">
            <p>
              {{t(`CreatedOn`)}}：<span>{{ createTime }}</span>
            </p>
            <p>
               {{t(`ReleaseDate`)}}：<span>{{ publishTime }}</span>
            </p>
            <p>
               {{t(`CompletionDate`)}}：<span>{{ finishTime }}</span>
            </p>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive, h, onMounted, nextTick } from "vue";
import { NGradientText, useMessage, useDialog } from "naive-ui";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const searchValue = ref(null);
let searchData = {};
const closeSearch = ref(false);
const data = ref([]);
function search() {
  if (closeSearch.value) {
    closeSearch.value = false;
    searchData = {};
    searchValue.value = null;
    getTableData();
  } else {
    closeSearch.value = true;
    searchData.search = searchValue.value;
    getTableData();
  }
  console.log(searchData);
}

const columns = [
  {
    key: "breed.name",
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`Breed`) }
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
        { default: () => t(`Description`) }
      );
    },
    key: "name",
  },
  {
    title() {
      return h(
        NGradientText,
        {
          size: "14",
          type: "success",
        },
        { default: () => t(`Statue`) }
      );
    },
    key: "stateInfo",
  },
];
let rowData = reactive({});
let delId;
let createTime = "";
let publishTime = "";
let finishTime = "";
let percentage = 0;
const showModal = ref(false);
const showDropdown = ref(false);
const x = ref(0);
const y = ref(0);
const options = [
  {
    label: () => h("span", { style: { color: "red" } }, t(`delete`)),
    key: "delete",
  },
];
const message = useMessage();
const dialog = useDialog();
function handleSelect() {
  showDropdown.value = false;
  dialog.warning({
    title: t(`warn`),
    content: t(`warnContent`),
    positiveText: t(`positiveText`),
    negativeText: t(`negativeText`),
    onPositiveClick: async () => {
      const res = await store.dispatch("deleteDonateAction", delId);
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
const rowProps = (row) => {
  return {
    style: "cursor: pointer;",
    onClick: () => {
      showModal.value = true;
      rowData = row;
      percentage = (row.already_amount / row.amount) * 100;
      createTime = rowData.create_time
        ? rowData.create_time.slice(0, 10)
        : "---";
      publishTime = rowData.publish_time
        ? rowData.publish_time.slice(0, 10)
        : "---";
      finishTime = rowData.finish_time
        ? rowData.finish_time.slice(0, 10)
        : "---";
      switch (row.state) {
        case 0: {
          state.value = t(`IssueCrowdfunding`);
          break;
        }
        case 1: {
          state.value = t(`CompleteCrowdfunding`);
          break;
        }
        case 2: {
          state.value = t(`CrowdfundingCompleted`);
        }
      }
    },
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

let state = ref("");
function changeState(row) {
  let stateData = { state: 0 };
  let content = "";
  let stateInfo = "";
  let afterState = "";
  switch (row.state) {
    case 0: {
      stateData.state = 1;
      content = t(`ReleaseContent`);
      stateInfo = t(`Crowdfunding`);
      afterState = t(`CompleteCrowdfunding`);
      break;
    }
    case 1: {
      stateData.state = 2;
      content = t(`CrowdfundingEnd`);
      stateInfo = t(`EndContent`);
      afterState = t(`CrowdfundingCompleted`);
      break;
    }
    case 2: {
      return;
    }
  }
  dialog.warning({
    title: t(`warn`),
    content: content,
    positiveText: t(`positiveText`),
    negativeText: t(`negativeText`),
    onPositiveClick: async () => {
      await store.dispatch("updateDonateStateAction", {
        param1: stateData,
        param2: row.id,
      });
      message.success(t(`modifySuccess`));
      const index = data.value.findIndex((item) => item.id === row.id);
      data.value[index].stateInfo = stateInfo;
      data.value[index].state = stateData.state;
      state.value = afterState;
    },
    onNegativeClick: () => {
      message.error(t(`modifyErr`));
    },
  });
}
async function getTableData() {
  data.value = await store.dispatch("getDonateListAction", searchData);
  data.value.forEach((item) => {
    switch (item.state) {
      case 0: {
        item.stateInfo = t(`ToBeReleased`);
        break;
      }
      case 1: {
        item.stateInfo = t(`Crowdfunding`);
        break;
      }
      case 2: {
        item.stateInfo = t(`EndContent`);
        break;
      }
    }
  });
}
onMounted(() => {
  loading.value = true;
  getTableData().then(() => {
    loading.value = false;
  });
});
</script>

<style lang="scss" scoped>
.donate {
  width: 98%;
  min-height: 78vh;
  background-color: #fff;
  &-header {
    width: 100%;
    padding: 20px;
    &-top {
      display: flex;
      flex-direction: row;
      align-items: center;
      .search {
        width: 450px;
      }
    }
    &-bottom {
      margin-top: 20px;
      width: 450px;
    }
  }
  &-content {
    width: 95%;
    padding: 10px;
  }
}
.tips {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #aaa;
  margin-bottom: 5px;
}
.state {
  cursor: pointer;
  color: #18a058;
}
.content-top {
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  .content-top-right {
    margin-left: 30px;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: left;
  }
}
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #919090;
}
</style>