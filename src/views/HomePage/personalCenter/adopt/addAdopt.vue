<template>
  <div>
    <n-form ref="adoptFormRef" :model="adoptModel" :rules="rules">
      <n-form-item label="宠物" path="pet">
        <n-select
          v-model:value="adoptModel.pet"
          :options="petOptions"
          :render-tag="renderSingleSelectTag"
          :render-label="renderLabel"
        />
      </n-form-item>
      <n-form-item path="title" label="标题">
        <n-input v-model:value="adoptModel.title" />
      </n-form-item>
      <n-form-item path="description" label="简介">
        <n-input v-model:value="adoptModel.description" type="textarea" />
      </n-form-item>
      <n-form-item path="requirements" label="领养要求">
        <n-input v-model:value="adoptModel.requirements" type="textarea" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="commit"> 提交 </n-button>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { ref, h, onMounted } from "vue";
import { NAvatar } from "naive-ui";
import { useStore } from "vuex";
const store = useStore();
import { useMessage } from "naive-ui";
const message = useMessage();
const haveAdoptInfo = ref(false);
const adoptFormRef = ref(null);
const adoptModel = ref({
  pet: null,
  title: "",
  description: "",
  requirements: "",
});
const rules = {
  pet: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator() {
        if (adoptModel.value.pet == null || adoptModel.value.pet == undefined) {
          return new Error("请选择宠物");
        }
        return true;
      },
    },
  ],
  title: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: "请输入标题",
    },
  ],
  description: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: "请输入简介",
    },
  ],
  requirements: [
    {
      required: true,
      trigger: ["blur", "input"],
      message: "请输入领养要求",
    },
  ],
};
const petOptions = ref([]);
const renderSingleSelectTag = ({ option }) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    [
      h(NAvatar, {
        src: option.path,
        round: true,
        size: 24,
        style: {
          marginRight: "12px",
        },
      }),
      option.label,
    ]
  );
};
const renderLabel = (option) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    [
      h(NAvatar, {
        src: option.path,
        round: true,
        size: 24,
        style: {
          marginRight: "12px",
        },
      }),
      option.label,
    ]
  );
};
async function getPet() {
   const request = {
    user: JSON.parse(localStorage.getItem("userInfo")).id,
  };
  const res = await store.dispatch("getOneselfPetsAction",request);
  petOptions.value = res.map((item) => {
    return {
      label: item.name,
      value: item.id,
      path: item.cover_image.image,
    };
  });
}
function commit() {
  adoptFormRef.value?.validate((errors) => {
    if (!errors) {
      console.log(haveAdoptInfo.value);
      if (!haveAdoptInfo.value) {
        try {
          store.dispatch("addAdoptAction", adoptModel.value);
          message.success("添加成功");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const request = {
            data: adoptModel.value,
            id: JSON.parse(localStorage.getItem("adoptInfo")).id,
          };
          store.dispatch("updatePetInfoAction", request);
          message.success("修改成功");
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
}
onMounted(() => {
  getPet();
  // eslint-disable-next-line no-prototype-builtins
  haveAdoptInfo.value = localStorage.hasOwnProperty("adoptInfo");
  if (haveAdoptInfo.value) {
    const adoptInfo = JSON.parse(localStorage.getItem("adoptInfo"));
    adoptModel.value.pet = adoptInfo.pet.id;
    adoptModel.value.title = adoptInfo.title;
    adoptModel.value.description = adoptInfo.description;
    adoptModel.value.requirements = adoptInfo.requirements;
  }
});
</script>

<style lang="scss" scoped>
</style>