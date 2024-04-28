<template>
  <div class="pet-ask">
    <div class="pet-ask-main">
      <div class="pet-ask-main-top">
        <md-input
          v-model="searchValue"
          name="search"
          placeholder="按下回车键开始搜索"
          class="search"
          v-on:keydown="checkEnterKey"
        >
          <n-icon size="16"><Search /> </n-icon>
          搜索问答
        </md-input>
        <n-icon
          class="close"
          size="20"
          @click="closeSearch"
          v-show="isSearching"
        >
          <Close />
        </n-icon>
      </div>
      <div class="pet-ask-main-content">
        <n-tabs
          type="line"
          animated
          ref="tabRef"
          v-model:value="tabValue"
          @update:value="handleUpdate"
        >
          <n-tab-pane
            :name="tab.name"
            :tab="tab.tab"
            v-for="tab in tabs"
            :key="tab"
            :disabled="!isSearching && tab.name == 4"
          >
            <div class="ask-box">
              <div
                class="ask-box-item"
                v-for="(item, index) in questionList"
                :key="item.id"
                @click="openDetails(item)"
              >
                <div class="ask-box-item-left">
                  <div class="ask-box-item-left-top">
                    <n-avatar
                      round
                      :size="40"
                      :src="item.user.head"
                      @click.stop="toHisHome(item.user.id)"
                    />
                    <div class="info">
                      <div class="name" @click.stop="toHisHome(item.user.id)">
                        {{ item.user.nickname || "匿名用户" }}
                      </div>
                      <div class="date">
                        {{ item.create_time.slice(0, 16).replace("T", " ") }}
                      </div>
                    </div>
                  </div>
                  <div class="ask-box-item-left-content">
                    <div class="title">
                      <n-button strong secondary type="success"> 问 </n-button>
                      {{ item.question }}
                    </div>
                    <div class="ask">
                      <n-button strong secondary type="warning"> 答 </n-button>
                      {{ item.newAnswer || "暂无" }}
                    </div>
                  </div>
                </div>
                <div
                  class="ask-box-item-right"
                  :class="{
                    'ask-box-item-right-haveDel': userId == item.user.id,
                  }"
                >
                  <p class="del" v-show="userId == item.user.id">
                    <n-tooltip trigger="hover">
                      <template #trigger>
                        <n-icon @click.stop="del(item.id, index)">
                          <Close
                        /></n-icon>
                      </template>
                      删除该问题
                    </n-tooltip>
                  </p>
                  <n-button ghost round>
                    查看{{ item.answerCount }}条回答
                    <n-icon>
                      <Right />
                    </n-icon>
                  </n-button>
                </div>
              </div>
            </div>
          </n-tab-pane>
        </n-tabs>
      </div>
    </div>
    <div class="add">
      <n-button type="primary" circle class="add-btn" @click="showModal">
        <template #icon>
          <n-icon size="30px"><Add /></n-icon>
        </template>
      </n-button>
    </div>
    <n-modal v-model:show="modalIsShow" :mask-closable="false">
      <n-card
        style="width: 600px"
        title="添加问题"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form ref="questionFormRef" :model="questionModel" :rules="rules">
          <n-form-item label="分类" path="classification">
            <n-select
              v-model:value="questionModel.classification"
              :options="classOptions"
              disabled
            />
          </n-form-item>
          <n-form-item path="question" label="问题">
            <n-input v-model:value="questionModel.question" />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="footer">
            <n-button
              type="warning"
              size="small"
              ghost
              @click="onNegativeClick"
            >
              取消
            </n-button>
            <n-button
              type="success"
              size="small"
              ghost
              @click="onPositiveClick"
            >
              确认
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import MdInput from "@/components/common/MDinput/index.vue";
import { ref, onMounted, nextTick } from "vue";
import { Search, Close } from "@vicons/ionicons5";
import {
  ChevronRight28Filled as Right,
  Add12Regular as Add,
} from "@vicons/fluent";
import { useStore } from "vuex";
const store = useStore();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
import { useMessage, useDialog } from "naive-ui";
const dialog = useDialog();
const message = useMessage();
const userId = JSON.parse(localStorage.getItem("userInfo")).id;
const searchValue = ref("");
const tabValue = ref("1" || localStorage.getItem("askTabValue"));
const tabRef = ref(null);
const questionList = ref([]);
const isSearching = ref(false);
const tabs = ref([
  {
    name: "1",
    tab: "宠物百科",
  },
  {
    name: "2",
    tab: "养宠问答",
  },
  {
    name: "3",
    tab: "寻宠启事",
  },
  {
    name: "4",
    tab: "搜索结果",
  },
]);
function openDetails(item) {
  router.push({
    path: "/petAskDetail",
  });

  localStorage.setItem("questionInfo", JSON.stringify(item));
}
function toHisHome(id) {
  localStorage.setItem("otherId", id);
  localStorage.setItem("preRoute", route.fullPath);
  if (id == userId) {
    router.push({
      path: "/personalCenter",
    });
  } else {
    router.push({
      path: "/othersCenter",
    });
  }
}
function checkEnterKey(event) {
  if (event.key === "Enter") {
    handleSearch();
  }
}
function closeSearch() {
  isSearching.value = false;
  tabValue.value = "1";
  nextTick(() => tabRef.value?.syncBarPosition());
  searchValue.value = "";
}
function handleSearch() {
  tabValue.value = "4";
  isSearching.value = true;
  nextTick(() => tabRef.value?.syncBarPosition());
  getQuestionList();
}
function handleUpdate(value) {
  tabValue.value = value;
  questionModel.value.classification = value;
  getQuestionList();
  localStorage.setItem("askTabValue", value);
}
async function getQuestionList() {
  let requestData = {};
  if (tabValue.value == 4) {
    requestData = {
      search: searchValue.value,
    };
  } else {
    requestData = {
      classification: tabValue.value,
      search: searchValue.value,
    };
  }
  questionList.value = await store.dispatch(
    "getQuestionListAction",
    requestData
  );
}
onMounted(() => {
  getQuestionList();
});
function del(id, index) {
  dialog.warning({
    title: "警告",
    content: "你确定要删除该问题吗？，删除后，该问题的所有回答也将删除",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      store.dispatch("deleteQuestionAction", id);
      questionList.value.splice(index, 1);
      message.success("删除成功");
    },
    onNegativeClick: () => {
      message.error("取消删除");
    },
  });
}

const questionFormRef = ref(null);
const modalIsShow = ref(false);
const questionModel = ref({
  classification: tabValue.value,
  question: "",
});
const classOptions = ref([
  {
    value: "1",
    label: "宠物百科",
  },
  {
    value: "2",
    label: "养宠问答",
  },
  {
    value: "3",
    label: "寻宠启事",
  },
]);
const rules = {
  classification: [
    {
      required: true,
      message: "请选择分类",
      trigger: ["change", "blur"],
    },
  ],
  question: [
    {
      required: true,
      message: "请输入回复内容",
      trigger: ["input", "blur"],
    },
  ],
};
function showModal() {
  modalIsShow.value = true;
}
function onNegativeClick() {
  message.error("Cancel");
  questionModel.value.answer = "";
  modalIsShow.value = false;
}
function onPositiveClick() {
  questionFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await store.dispatch(
        "createQuestionAction",
        questionModel.value
      );
      const user = await store.dispatch("getUserInfoIdAction", res.user);
      res.user = user;
      questionList.value.push(res);
      message.success("创建问题成功");
      modalIsShow.value = false;
    } else {
      console.log(errors);
      message.error("验证失败");
    }
  });
}
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  .n-button {
    margin-left: 10px;
  }
}
.pet-ask {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .add {
    position: absolute;
    bottom: 100px;
    right: 100px;
    &-btn {
      width: 50px;
      height: 50px;
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.1),
        0 3px 6px 0 rgba(0, 0, 0, 0.08), 0 5px 12px 4px rgba(0, 0, 0, 0.06);
    }
  }
  &-main {
    width: 85%;
    min-height: 90vh;
    background: #fff;
    padding: 20px;
    &-top {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      .search {
        position: relative;
        width: 90%;
      }
      .close {
        cursor: pointer;
        position: relative;
        right: 30px;
        font-size: 16px;
      }
    }
    &-content {
      margin-top: 20px;
      .ask-box {
        width: 100%;
        height: 100%;
        &-item {
          width: 100%;
          height: 150px;
          padding: 20px 20px 10px 20px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          border-bottom: 1px solid #d4d4d471;
          &:hover {
            background: #cfcece41;
            cursor: pointer;
          }
          &-left {
            width: 80%;
            height: 100%;
            &-top {
              display: flex;
              flex-direction: row;
              align-items: center;
              .info {
                margin-left: 10px;
                .name {
                  font-size: 16px;
                  color: #808080;
                  font-weight: 600;
                }
                .date {
                  font-size: 14px;
                  color: #aaa;
                }
              }
            }
            &-content {
              .title {
                font-size: 20px;
                font-weight: 900;
                margin: 10px 0px;
              }
              .ask {
                font-size: 15px;
                color: #808080;
              }
            }
          }
          &-right {
            margin-bottom: 20px;
          }
          &-right-haveDel {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            .del {
              margin-top: 20px;
              cursor: pointer;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>