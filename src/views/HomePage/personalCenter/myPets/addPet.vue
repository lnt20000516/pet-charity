<template>
  <div class="add-pet">
    <n-form ref="petFormRef" :model="petModel" :rules="rules">
      <n-form-item path="images" label="图片">
        <div class="upload">
          <div class="imgs">
            <div
              class="image"
              v-for="(item, index) in previewList"
              :key="item"
              @mouseenter="showClose = true"
              @mouseleave="showClose = false"
            >
              <img :src="item.image" />
              <n-icon
                size="20"
                class="icon"
                v-show="showClose"
                @click="removeImg(index, item)"
                ><Close
              /></n-icon>
            </div>
          </div>
          <div class="push">
            <n-upload
              action="http://127.0.0.1:8000/pet/image/create"
              name="image"
              @error="handleErr"
              @finish="handleFinish"
              :show-file-list="false"
            >
              <n-button class="btn" type="primary" dashed>
                <n-icon size="40"><Add /></n-icon>
              </n-button>
            </n-upload>
          </div>
        </div>
      </n-form-item>
      <n-form-item path="name" label="姓名">
        <n-input v-model:value="petModel.name" />
      </n-form-item>
      <n-form-item label="种族" path="race">
        <n-select
          v-model:value="petModel.race"
          :options="raceOptions"
          @update:value="handleUpdateRace"
        />
      </n-form-item>
      <n-form-item label="品种" path="breed">
        <n-select
          v-model:value="petModel.breed"
          :options="breedOptions"
          :render-tag="renderSingleSelectTag"
          :render-label="renderLabel"
        />
      </n-form-item>
      <n-form-item label="性别" path="sex">
        <n-select v-model:value="petModel.sex" :options="sexOptions" />
      </n-form-item>
      <n-form-item label="体重" path="weight">
        <n-input-number
          clearable
          :precision="2"
          v-model:value="petModel.weight"
          :min="0"
          :allow-input="onlyAllowNumber"
        >
          <template #suffix> kg </template>
        </n-input-number>
      </n-form-item>

      <n-form-item label="生日" path="birth">
        <n-date-picker
          v-model:formatted-value="petModel.birth"
          value-format="yyyy-MM-dd"
          type="date"
          clearable
        />
      </n-form-item>
      <n-form-item label="是否公开" path="visual">
        <n-radio-group v-model:value="petModel.visual" name="radiogroup">
          <n-space>
            <n-radio :value="true"> 公开 </n-radio>
            <n-radio :value="false"> 不公开 </n-radio>
          </n-space>
        </n-radio-group>
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
import { Add, Close } from "@vicons/ionicons5";
import { useMessage } from "naive-ui";
const message = useMessage();
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const store = useStore();
const petFormRef = ref(null);
const previewList = ref([]);
const showClose = ref(false);
const havePetInfo = ref(false);
function removeImg(index, item) {
  previewList.value.splice(index, 1);
  petModel.value.images = petModel.value.images.slice(item.id);
}
const handleFinish = ({ event }) => {
  const response = JSON.parse(event.target.response);
  const img = {
    id: response.id,
    image: response.image,
  };
  petModel.value.images.push(response.id);
  previewList.value.push(img);
  message.success("添加图片成功");
};
const handleErr = () => {
  message.error("添加图片失败");
};
const petModel = ref({
  name: "",
  breed: null,
  sex: null,
  weight: null,
  birth: null,
  visual: null,
  images: [],
  cover_image: null,
  race: null,
});
const raceOptions = [
  {
    label: "猫",
    value: 0,
  },
  {
    label: "狗",
    value: 1,
  },
];
const sexOptions = [
  {
    label: "公",
    value: 0,
  },
  {
    label: "母",
    value: 1,
  },
];
const breedOptions = ref([]);
async function handleUpdateRace(value) {
  const raceData = {
    race: value,
  };
  const res = await store.dispatch("getBreedListAction", raceData);
  breedOptions.value = res.map(({ name, id, ...rest }) => {
    return {
      ...rest,
      label: name,
      value: id,
    };
  });
}
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
const rules = {
  images: [
    {
      required: true,
      validator() {
        if (petModel.value.images.length == 0) {
          return new Error("至少选择一张图片");
        }
        return true;
      },
      trigger: ["change", "blur"],
    },
  ],
  weight: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error("请输入体重");
        } else if (Number(value) < 0) {
          return new Error("体重必须大于0");
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  birth: [
    {
      required: true,
      trigger: ["blur", "change"],
      message: "请选择生日",
    },
  ],
  name: [
    {
      required: true,
      message: "请输入姓名",
      trigger: ["input", "blur"],
    },
  ],
  race: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator(rule, value) {
        if (value === null || value === undefined) {
          return new Error("请选择种族");
        }
        return true;
      },
    },
  ],
  breed: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator(rule, value) {
        if (value === null || value === undefined) {
          return new Error("请选择品种");
        }
        return true;
      },
    },
  ],
  sex: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator(rule, value) {
        if (value === null || value === undefined) {
          return new Error("请选择性别");
        }
        return true;
      },
    },
  ],
  visual: [
    {
      required: true,
      validator(rule, value) {
        if (value == null || value == undefined) {
          return new Error("请选择是否公开");
        }
        return true;
      },
      trigger: ["change"],
    },
  ],
};
function commit() {
  petFormRef.value?.validate((errors) => {
    if (!errors) {
      if (!havePetInfo.value) {
        try {
          store.dispatch("addPetAction", petModel.value);
          message.success("添加成功");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const request = {
            data: petModel.value,
            id: JSON.parse(localStorage.getItem("petInfo")).id,
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
  // eslint-disable-next-line no-prototype-builtins
  havePetInfo.value = localStorage.hasOwnProperty("petInfo");
  if (havePetInfo.value) {
    const petInfo = JSON.parse(localStorage.getItem("petInfo"));
    petModel.value.name = petInfo.name;
    petModel.value.race = petInfo.breed.race;
    petModel.value.breed = petInfo.breed.id;
    petModel.value.sex = petInfo.sex;
    petModel.value.weight = Number(petInfo.weight);
    petModel.value.birth = petInfo.birth;
    petModel.value.visual = petInfo.visual;
    petModel.value.cover_image = petInfo.cover_image;
    handleUpdateRace(petInfo.breed.race);
    petInfo.images.map((v) => {
      petModel.value.images.push(v.id);
      previewList.value.push({
        id: v.id,
        image: v.image,
      });
    });
  }
});
</script>

<style lang="scss" scoped>
.add-pet {
  .upload {
    display: flex;
    flex-direction: row;
    align-items: center;
    .imgs {
      display: flex;
      flex-direction: row;
      align-items: center;
      .image {
        width: 80px;
        height: 80px;
        margin: 0px 5px;
        position: relative;
        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
        }
        .icon {
          position: absolute;
          top: 0;
          right: 0;
          cursor: pointer;
          color: #ffffff9b;
        }
      }
    }
    .push {
      margin-left: 10px;
      .btn {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>