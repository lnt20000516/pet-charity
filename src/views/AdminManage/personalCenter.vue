<template>
  <div class="personal">
    <div class="personal-left">
      <n-card
        title="About me"
        hoverable
        :segmented="{
          content: true,
        }"
      >
        <div class="personal-left-avatar">
          <pan-thumb
            :image="adminInfo.head"
            :height="'100px'"
            :width="'100px'"
            :hoverable="false"
          >
            <div>Hello</div>
            {{ adminInfo.nickname }}
          </pan-thumb>
          <div class="name">
            {{ adminInfo.nickname }}
          </div>
          <div class="introduction">
            {{ adminInfo.introduction }}
          </div>
        </div>
        <div class="personal-left-info">
          <div class="title">
            <n-icon size="20">
              <personalInfo />
            </n-icon>
            <span>{{t(`Information`)}}</span>
          </div>
          <n-divider />
          <div class="item">
            <div class="label">{{t(`Tel`)}}:</div>
            <div class="value">{{ adminInfo.phone }}</div>
          </div>
          <div class="item">
            <div class="label">{{t(`QQ`)}}:</div>
            <div class="value">{{ adminInfo.qq }}</div>
          </div>
          <div class="item">
            <div class="label">{{t(`Sex`)}}:</div>
            <div class="value">{{ adminInfo.sex_value }}</div>
          </div>
          <div class="item">
            <div class="label">{{t(`CreateTime`)}}:</div>
            <div class="value">{{ adminInfo.create_time.slice(0, 10) }}</div>
          </div>
        </div>
      </n-card>
    </div>
    <div class="personal-right">
      <n-card
        hoverable
        :segmented="{
          content: true,
        }"
      >
        <n-tabs
          type="line"
          size="large"
          :tabs-padding="20"
          pane-style="padding: 20px;"
        >
          <n-tab-pane
            :name="t(`ModifyPass`)"
            style="padding: 20px 10px 20px 20px"
          >
            <ModifyPassword />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import PanThumb from "@/components/common/panThumb/index.vue";
import ModifyPassword from "@/components/admin/personalCenter/modifyPassword.vue";
import { PersonInfo16Regular as personalInfo } from "@vicons/fluent";
const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.personal {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80vh;
  .n-card {
    width: 100%;
    height: 100%;
  }
  &-left {
    width: 28%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-avatar {
      width: 100%;
      height: 170px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        font-size: 20px;
        font-weight: 900;
        margin-top: 10px;
      }
    }
    &-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 20px;
      .n-divider:not(.n-divider--vertical) {
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .title {
        font-size: 16px;
        color: #606266;
        display: flex;
        flex-direction: row;
        align-items: center;
        .n-icon {
          margin-right: 10px;
        }
      }
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        .label {
          font-size: 14px;
          margin-right: 10px;
          color: #333639;
        }
        .value {
          color: #606266;
        }
      }
    }
  }
  &-right {
    width: 48%;
    height: 100%;
    margin-left: 20px;
    .n-tabs .n-tab-pane {
      padding: 0;
      height: 100%;
      width: 90%;
    }
  }
}
</style>