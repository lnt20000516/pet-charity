<template>
  <div class="carousel-swiper">
    <swiper
      :autoplay="swiper_option.autoplay"
      :loop="swiper_option.loop"
      :pagination="swiper_option.pagination"
    >
      <swiper-slide v-for="(item, index) in list" :key="index">
        <img :src="item.url" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Autoplay, Pagination } from "swiper";
SwiperCore.use([Autoplay, Pagination]);
import "swiper/css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const list = [
      {
        url: require("../../assets/imgs/carousel/p1.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p19.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p3.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p4.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p5.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p17.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p7.jpg"),
      },
      {
        url: require("../../assets/imgs/carousel/p13.jpg"),
      },
    ];
    const swiper_option = reactive({
      autoplay: {
        deplay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      speed: 1000,
      pagination: {
        clickable: true,
      },
    });
    return {
      swiper_option,
      list,
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel-swiper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 500px;
    object-fit: fill;
  }
}
</style>