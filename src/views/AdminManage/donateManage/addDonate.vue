<template>
  <div class="donateForm">
    <n-form
      ref="formRef"
      :model="donateForm"
      :rules="rules"
      size="medium"
      label-placement="top"
      class="donateForm-left-form"
    >
      <div class="donateForm-left">
        <div class="title">{{ t(`AddCrowdfunding`) }}</div>

        <n-form-item :label="t(`CrowdfundingTitle`)" path="name">
          <n-input
            v-model:value="donateForm.name"
            :placeholder="t(`TitleErr`)"
          />
        </n-form-item>
        <n-form-item :label="t(`Race`)" path="race">
          <n-select
            v-model:value="donateForm.race"
            :options="raceOptions"
            :placeholder="t(`RaceErr`)"
            @update:value="handleUpdateRace"
          />
        </n-form-item>
        <n-form-item :label="t(`Breed`)" path="breed">
          <n-select
            v-model:value="donateForm.breed"
            :options="breedOptions"
            :render-tag="renderSingleSelectTag"
            :render-label="renderLabel"
            :placeholder="t(`BreedErr`)"
          />
        </n-form-item>
        <n-form-item :label="t(`Sex`)" path="sex">
          <n-select
            v-model:value="donateForm.sex"
            :options="sexOptions"
            :placeholder="t(`SexErr`)"
          />
        </n-form-item>
        <n-form-item :label="t(`Money`)" path="amount">
          <n-input-number
            v-model:value="donateForm.amount"
            :placeholder="t(`MoneyErr`)"
            :step="100"
            :min="0"
            :allow-input="onlyAllowNumber"
          >
            <template #prefix> $ </template>
          </n-input-number>
        </n-form-item>
        <n-form-item :label="t(`Weight`)" path="weight">
          <n-input-number
            clearable
            :precision="2"
            v-model:value="donateForm.weight"
            :placeholder="t(`WeightErr`)"
            :min="0"
            :allow-input="onlyAllowNumber"
          >
            <template #suffix> kg </template>
          </n-input-number>
        </n-form-item>

        <n-form-item :label="t(`Birth`)" path="birth">
          <n-date-picker
            v-model:formatted-value="donateForm.birth"
            value-format="yyyy-MM-dd"
            type="date"
            clearable
            :placeholder="t(`BirthErr`)"
          />
        </n-form-item>
      </div>
      <div class="donateForm-right">
        <n-form-item :label="t(`Picture`)" path="images">
          <div class="donateForm-right-image">
            <n-upload
              action="http://127.0.0.1:8000/pet/image/create"
              name="image"
              :default-file-list="previewFileList"
              list-type="image-card"
              @preview="handlePreview"
              @finish="handleFinish"
              @remove="handleRemove"
            />
            <n-modal
              v-model:show="showModal"
              preset="card"
              style="width: 600px"
            >
              <img :src="previewImageUrl" style="width: 100%" />
            </n-modal>
          </div>
        </n-form-item>
        <n-form-item :label="t(`CrowdfundingDescription`)" path="description">
          <n-input
            type="textarea"
            :placeholder="t(`DescriptionEff`)"
            :autosize="{
              minRows: 6,
            }"
            round
            v-model:value="donateForm.description"
          />
        </n-form-item>
        <div class="commit-button">
          <n-button round type="primary" @click="commit">
            {{ t(`Commit`) }}
          </n-button>
        </div>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { NAvatar } from "naive-ui";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = useStore();
const donateForm = ref({
  name: "",
  breed: null,
  sex: null,
  weight: null,
  birth: null,
  description: "",
  amount: null,
  images: [],
  cover_image: null,
});
const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const rules = {
  name: [
    {
      required: true,
      message: t(`TitleErr`),
      trigger: ["input", "blur"],
    },
  ],
  race: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator(rule, value) {
        if (value === null || value === undefined) {
          return new Error(t(`RaceErr`));
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
          return new Error(t(`BreedErr`));
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
          return new Error(t(`SexErr`));
        }
        return true;
      },
    },
  ],
  images: [
    {
      required: true,
      validator() {
        if (donateForm.value.images == false) {
          return new Error(t(`PictureErr`));
        }
        return true;
      },
      trigger: ["input", "blur"],
    },
  ],
  weight: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error(t(`WeightEff`));
        } else if (Number(value) < 0) {
          return new Error(t(`WeightErr`));
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
      message: t(`BirthErr`),
    },
  ],
  amount: [
    {
      required: true,
      validator(rule, value) {
        if (!value) {
          return new Error(t(`MoneyErr`));
        } else if (Number(value) < 0) {
          return new Error(t(`MinMoney`));
        }
        return true;
      },
      trigger: ["blur", "input"],
    },
  ],
  description: [
    {
      required: true,
      message: t(`DescriptionEff`),
      trigger: ["input", "blur"],
    },
  ],
};
const raceOptions = [
  {
    label: t(`cat`),
    value: 0,
  },
  {
    label: t(`dog`),
    value: 1,
  },
];
const sexOptions = [
  {
    label: t(`male`),
    value: 0,
  },
  {
    label: t(`female`),
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
const formRef = ref(null);
const showModal = ref(false);
const previewImageUrl = ref("");
const previewFileList = ref([]);
function handlePreview(file) {
  const { thumbnailUrl } = file;
  previewImageUrl.value = thumbnailUrl;
  showModal.value = true;
}
const handleFinish = ({ file, event }) => {
  const res = JSON.parse((event?.target).response);
  file.status = "finished";
  file.url = res.id;
  file.thumbnailUrl = res.image;
  donateForm.value.images.push(res.id);
  return file;
};
function handleRemove(file) {
  donateForm.value.images = donateForm.value.images.filter(
    (item) => item != file.file.url
  );
}

function commit(e) {
  e.preventDefault();
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      donateForm.value.cover_image = donateForm.value.images[0];
      console.log(donateForm.value);
      const res = await store.dispatch("addDonateAction", donateForm.value);
      if (res) {
        window.$message.success(t(`addSuccess`));
        donateForm.value = {
          name: "",
          breed: null,
          sex: null,
          weight: null,
          birth: null,
          description: "",
          amount: null,
          images: [],
          cover_image: null,
        };
        previewFileList.value = [];
      }
    } else {
      console.log(errors);
    }
  });
}
</script>

<style lang="scss" scoped>
.donateForm {
  width: 98%;
  min-height: 90vh;
  background-color: #fff;
  &-left {
    width: 48%;
    float: left;
    &-form {
      padding: 20px;
    }
  }
  &-right {
    width: 48%;
    float: right;
    &-image {
      width: 100%;
      padding: 20px;
      border: 1px solid #efeff5;
      border-radius: 10px;
      .imageErr {
        font-size: 14px;
        color: #d03050;
      }
    }
    .err {
      border-color: #d03050;
    }
    .label {
      padding: 0px 0px 6px 2px;
      margin-top: 30px;
    }
  }
  .title {
    font-size: 18px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #4f4e4e;
    margin-top: 20px;
  }
}
</style>