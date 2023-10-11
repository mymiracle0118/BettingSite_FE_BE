<template>
    <span>
        <!-- <div class="card-close" v-if="card == 1"></div> -->
        <transition name="slide-fade" mode="out-in">
            <img v-if="lotteryCard" :key="card" :src="`${newImgPath}${card}.png`">
            <img v-else :key="card" :src="`${imgPath}${card}.png`">

            <!-- <img :key="card" :src="`${imgPath}${card}.jpg`"> -->
            <!-- <img key="2" v-else :src="`${imgPath}1.svg`"> -->
        </transition>
    </span>
</template>
<script>
export default {
    props:['card', 'lotteryCard'],
    data() {
        return{
            imgPath: IMG_PATH + 'front/img/cards/',
            newImgPath: IMG_PATH + 'front/img/lottery/cards/',
        }
    }
}
</script>
<style scoped>
/*.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s ease;
  transform-style: preserve-3d;
}

.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}*/
</style>