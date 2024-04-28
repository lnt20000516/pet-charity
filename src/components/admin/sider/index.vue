<template>
  <div class="logo">
    <div class="image">
      <img
        src="../../../assets/imgs/logo.png"
        :class="{ imageM: collapsed, imageL: !collapsed }"
      />
    </div>
    <p :class="{ title: true, disabled: collapsed }">chatPerity</p>
  </div>
  <Menu :collapsed="collapsed" />
</template>

<script>
import Menu from "./menu.vue";
export default {
  components: {
    Menu,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .image {
    width: 64px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .imageM {
      width: 45px;
      height: 45px;
    }
    .imageL {
      width: 50px;
      height: 50px;
    }
  }
  .title {
    font-size: 20px;
    font-family: Poppins;
  }
  .disabled {
    display: none;
  }
}
</style>