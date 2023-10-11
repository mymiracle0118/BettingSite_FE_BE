<template>
    <span>
        <transition name="slide-fade" mode="out-in">
            <img v-if="getBall(ball)" :key="ball" :src="`${imgPath}${getBall(ball)}.png`">
        </transition>
    </span>
</template>

<script>
export default {
    props:['ball'],
    data() {
        return{
            imgPath: IMG_PATH + 'front/img/superOver/balls/'
        }
    },
    methods:{
        getBall(ball){
            if(ball.length == 3){
                return ball.slice(0,1)
            }else if(ball.length == 4){
                return ball.slice(0,2)
            }
        }
    }
}
</script>