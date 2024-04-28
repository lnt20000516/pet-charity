<template>
  <div class="ask-detail">
    <div class="ask-detail-main">
      <p class="return" @click="backList">
        <n-icon>
          <ArrowBackUp />
        </n-icon>
        返回问答列表
      </p>
      <div class="ask-user">
        <div class="ask-user-left">
          <n-avatar
            round
            :size="48"
            :src="
              questionInfo.user?.head ||
              'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
            "
            @click="toHisHome(questionInfo.user.id)"
          />
          <div class="info">
            <div class="name">{{ questionInfo.user?.nickname }}</div>
            <div class="date">
              {{ questionInfo.create_time?.slice(0, 16).replace("T", " ") }}
            </div>
          </div>
        </div>
        <div class="ask-user-right">
          <n-button type="warning" @click="showModal">
            我来回答
            <n-icon>
              <Pencil />
            </n-icon>
          </n-button>
        </div>
        <n-modal v-model:show="modalIsShow" :mask-closable="false">
          <n-card
            style="width: 600px"
            title="添加回答"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
          >
            <n-form ref="answerFormRef" :model="answerModel" :rules="rules">
              <n-form-item path="answer" label="回复内容">
                <n-input
                  v-model:value="answerModel.answer"
                  type="textarea"
                  maxlength="70"
                  show-count
                />
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
      <div class="question">
        <n-button color="#18a058" size="medium"> 问 </n-button>
        <div class="question-info">{{ questionInfo.question }}</div>
      </div>
      <n-divider />
      <div class="answer">
        <div
          class="answer-item"
          v-for="(item, index) in answerList"
          :key="item"
        >
          <div class="answer-item-top">
            <div class="answer-item-top-left">
              <n-avatar
                round
                :size="40"
                :src="
                  item.user.head ||
                  'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
                "
                @click="toHisHome(item.user.id)"
              />
              <div class="info">
                <div class="name">{{ item.user.nickname || "匿名用户" }}</div>
                <div class="date">
                  {{ item.create_time.slice(0, 16).replace("T", " ") }}
                </div>
              </div>
            </div>
            <div class="answer-item-top-right">
              <p
                class="del"
                v-show="userId == item.user.id"
                @click="del(item.id, index)"
              >
                删除回答
              </p>
            </div>
          </div>
          <div class="answer-item-content">
            <n-button color="#f0a020" size="small"> 答 </n-button>
            <div class="info">{{ item.answer }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pencil } from "@vicons/ionicons5";
import { ArrowBackUp } from "@vicons/tabler";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import { useStore } from "vuex";
const store = useStore();
import { useMessage, useDialog } from "naive-ui";
const message = useMessage();
const dialog = useDialog();
const userId = JSON.parse(localStorage.getItem("userInfo")).id;
const id = computed(() => {
  return JSON.parse(localStorage.getItem("questionInfo")).id || null;
});
const answerList = ref([]);
const questionInfo = ref({});
async function getQuestionInfo() {
  questionInfo.value = JSON.parse(localStorage.getItem("questionInfo"));
}
async function del(id, index) {
  dialog.warning({
    title: "警告",
    content: "你确定要删除该回答吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      store.dispatch("deleteAnswerAction", id);
      answerList.value.splice(index, 1);
      message.success("删除成功");
    },
    onNegativeClick: () => {
      message.error("取消删除");
    },
  });
}
function backList() {
  router.push({ name: "petAskList" });
}
async function getAskDetail() {
  const request = {
    question: id.value,
  };
  answerList.value = await store.dispatch("getAnswerListAction", request);
}
onMounted(() => {
  getQuestionInfo();
  getAskDetail();
});

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

const answerFormRef = ref(null);
const modalIsShow = ref(false);
const answerModel = ref({
  question: id.value,
  answer: "",
});
const rules = {
  answer: [
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
  answerModel.value.answer = "";
  modalIsShow.value = false;
}
function onPositiveClick() {
  answerFormRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await store.dispatch("createAnswerAction", answerModel.value);
      const user = await store.dispatch("getUserInfoIdAction", res.user);
      res.user = user;
      answerList.value.push(res);
      message.success("添加回复成功");
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
.ask-detail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-main {
    width: 85%;
    min-height: 90vh;
    background: #fff;
    padding: 20px;
    .return {
      font-size: 14px;
      margin-bottom: 20px;
      color: #aaa;
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      .n-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }
    .ask-user {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &-left {
        display: flex;
        flex-direction: row;
        align-items: center;
        .n-avatar {
          cursor: pointer;
        }
        .info {
          margin-left: 10px;
          cursor: default;
          .name {
            font-size: 20px;
          }
          .date {
            font-size: 15px;
            color: #aaa;
          }
        }
      }
      &-right {
        margin-right: 20px;
        margin-top: 20px;
      }
    }
    .question {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;
      cursor: default;
      &-info {
        font-size: 20px;
        font-weight: 900;
        margin-left: 10px;
      }
    }
    .answer {
      width: 100%;
      margin: 20px;
      &-item {
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #d4d4d471;
        &-top {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          &-left {
            display: flex;
            flex-direction: row;
            align-items: center;
            .n-avatar {
              cursor: pointer;
            }
            .info {
              margin-left: 10px;
              cursor: default;
              .name {
                font-size: 18px;
              }
              .date {
                font-size: 15px;
                color: #aaa;
              }
            }
          }
          &-right {
            margin-right: 20px;
            .del {
              cursor: pointer;
              color: #ed375b;
            }
          }
        }
        &-content {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 20px;
          .info {
            margin-left: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>