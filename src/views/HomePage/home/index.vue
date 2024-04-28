<template>
  <div class="home">
    <div class="carousel">
      <Swiper />
    </div>
    <div class="breed">
      <div class="breed-header">
        <p>品种一览</p>
      </div>
      <div class="breed-content">
        <div class="item">
          <img src="../../../assets/imgs/home/dog3.jpg" />
          <div class="item-box">
            <div class="item-box-main">
              <div class="info">狗狗有各种不同的尺寸、骨型和个性</div>
              <div>
                你需要 <span class="emp">了解</span>
                <span class="to" @click="toBreed('dog')">狗狗品种</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <img src="../../../assets/imgs/home/cat3.jpg" />
          <div class="item-box">
            <div class="item-box-main">
              <div class="info">每只猫咪都具有独特的性格和个性</div>
              <div>
                你需要 <span class="emp">了解</span>
                <span class="to" @click="toBreed('cat')">猫咪品种</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swiper from "@/components/user/carouselSwiper.vue";
import { useRouter } from "vue-router";
const router = useRouter();
function toBreed(name) {
  router.push({ name: name });
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  .carousel {
    width: 100%;
    height: 500px;
  }
  .breed {
    width: 100%;
    min-height: 85vh;
    padding: 20px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-header {
      font-size: 25px;
      font-family: "新宋体";
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    &-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 60%;
      margin-top: 30px;
      .item {
        width: 391px;
        height: 500px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        &-box {
          position: absolute;
          bottom: 0px;
          left: 0px;
          height: 30%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          &-main {
            width: 80%;
            height: 40%;
            background: #ffffff9d;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
            font-size: 15px;
            cursor: default;
            .emp {
              font-size: 25px;
            }
            .to {
              margin-left: 10px;
              font-size: 18px;
              &:hover {
                cursor: pointer;
                color: #d7b592;
              }
            }
          }
        }
      }
    }
  }
}
</style>