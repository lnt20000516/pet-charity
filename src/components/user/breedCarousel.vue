<template>
  <div class="carousel-swiper">
    <swiper
      :slides-per-view="4"
      :space-between="10"
      :autoplay="false"
      :loop="swiper_option.loop"
      :pagination="swiper_option.pagination"
      :navigation="false"
    >
      <!-- swiper_option.autoplay -->
      <swiper-slide v-for="item in list" :key="item.id" class="swiper-item">
        <img :src="item.path" />
        <div class="title">{{ item.name }}</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
SwiperCore.use([Autoplay, Pagination, Navigation]);
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    list: {
      type: Array,
      require: true,
    },
  },
  setup() {
    const swiper_option = reactive({
      autoplay: {
        deplay: 3000,
        disableOnInteraction: false,
      },
      loop: false,
      speed: 1000,
      pagination: {
        clickable: true,
      },
    });
    return {
      swiper_option,
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel-swiper {
  width: 85%;
  height: 100%;
  overflow: hidden;
  img {
    width: 200px;
    height: 200px;
    object-fit: fill;
  }
  .swiper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 20px;
      font-family: "新宋体";
      margin-bottom: 30px;
    }
  }
}
</style>