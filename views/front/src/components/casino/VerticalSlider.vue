<template>
    <div class="d-inline-block w-100 v-slider">
        <div @click="up()" v-show="slides.length >= slidePerPage"><i class="fas fa-angle-up"></i></div>
        <div ref="sliderOuter" class="v-slider-outer" :style="[ { 'height': `${slideOuterHeight}px` } ]" style="overflow : hidden;">
            <template v-for="(slide, key) in slides">
                <div :key="key" :style="[ { 'height': `${slideHeight}px` } ]">
                    <img :src="`${imgPath}${slide}.png`" class="w-100">
                </div>
            </template>
        </div>
        <div @click="down()" v-show="slides.length >= slidePerPage"><i class="fas fa-angle-down"></i></div>
    </div>
</template>

<script>
export default {
    props:['slides', 'options'],
    mounted(){
        // console.log(this.options.height/this.options.perPage)
        // this.slideHeight = this.options.height/this.options.perPage
    },
    watch: {
        slides(){
            // console.log('watch slides')
            this.scrollBottom()
        }
    },
    computed: {
        slideHeight(){
            var height, perPage 
            if(_.has(this.options, 'breakpoints')){
                // console.log('has breakpoint')
                if(getWidth() <= 320){
                    // console.log('width is 320')
                    height = this.options.breakpoints.w320.height
                    perPage = this.options.breakpoints.w320.perPage
                }
                else if(getWidth() <= 375){
                    // console.log('width is 375')
                    height = this.options.breakpoints.w375.height
                    perPage = this.options.breakpoints.w375.perPage
                }
                else if(getWidth() <= 425){
                    // console.log('width is 425')
                    height = this.options.breakpoints.w425.height
                    perPage = this.options.breakpoints.w425.perPage
                }
                else if(getWidth() <= 768){
                    // console.log('width is 768')
                    height = this.options.breakpoints.w768.height
                    perPage = this.options.breakpoints.w768.perPage
                }
                else if(getWidth() <= 1024){
                    // console.log('width is 1024')
                    height = this.options.breakpoints.w1024.height
                    perPage = this.options.breakpoints.w1024.perPage
                }
                else if(getWidth() <= 1440){
                    // console.log('width is 1440')
                    height = this.options.breakpoints.w1440.height
                    perPage = this.options.breakpoints.w1440.perPage
                }
                else if(getWidth() <= 1920){
                    // console.log('width is 1920')
                    height = this.options.breakpoints.w1920.height
                    perPage = this.options.breakpoints.w1920.perPage
                }
                else{
                    height = 100
                    perPage = 2
                }
            }
            else{
                height = this.options.height
                perPage = this.options.perPage
            }
            // console.log(height, perPage, height/perPage)
            return height/perPage
        },
        slideOuterHeight(){
            var height
            if(_.has(this.options, 'breakpoints')){
                // console.log('has breakpoint')
                if(getWidth() <= 320){
                    // console.log('width is 320')
                    height = this.options.breakpoints.w320.height
                }
                else if(getWidth() <= 375){
                    // console.log('width is 375')
                    height = this.options.breakpoints.w375.height
                }
                else if(getWidth() <= 425){
                    // console.log('width is 425')
                    height = this.options.breakpoints.w425.height
                }
                else if(getWidth() <= 768){
                    // console.log('width is 768')
                    height = this.options.breakpoints.w768.height
                }
                else if(getWidth() <= 1024){
                    // console.log('width is 1024')
                    height = this.options.breakpoints.w1024.height
                }
                else if(getWidth() <= 1440){
                    // console.log('width is 1440')
                    height = this.options.breakpoints.w1440.height
                }
                else if(getWidth() <= 1920){
                    // console.log('width is 1920')
                    height = this.options.breakpoints.w1920.height
                }
                else{
                    height = 100
                }
            }
            else{
                height = this.options.height
            }
            // console.log(height)
            return height
        },
        slidePerPage(){
            var perPage 
            if(_.has(this.options, 'breakpoints')){
                // console.log('has breakpoint')
                if(getWidth() <= 320){
                    // console.log('width is 320')
                    perPage = this.options.breakpoints.w320.perPage
                }
                else if(getWidth() <= 375){
                    // console.log('width is 375')
                    perPage = this.options.breakpoints.w375.perPage
                }
                else if(getWidth() <= 425){
                    // console.log('width is 425')
                    perPage = this.options.breakpoints.w425.perPage
                }
                else if(getWidth() <= 768){
                    // console.log('width is 768')
                    perPage = this.options.breakpoints.w768.perPage
                }
                else if(getWidth() <= 1024){
                    // console.log('width is 1024')
                    perPage = this.options.breakpoints.w1024.perPage
                }
                else if(getWidth() <= 1440){
                    // console.log('width is 1440')
                    perPage = this.options.breakpoints.w1440.perPage
                }
                else if(getWidth() <= 1920){
                    // console.log('width is 1920')
                    perPage = this.options.breakpoints.w1920.perPage
                }
                else{
                    perPage = 2
                }
            }
            else{
                perPage = this.options.perPage
            }
            // console.log(perPage)
            return perPage
        },
    },
    data() {
        return{
            // slideHeight: 0,
            // slideOuterHeight: 0,
            imgPath: IMG_PATH + 'front/img/cards/',
        }
    },
    methods:{
        scrollBottom(){
            const self = this
            setTimeout(() => {
                let content = self.$refs.sliderOuter
                content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' })
            }, 300);
        },
        up(){
            let content = this.$refs.sliderOuter
            var curruntScroll = content.scrollTop
            // console.log(curruntScroll ,curruntScroll -= this.slideHeight)
            content.scrollTo({ top: (curruntScroll -= this.slideHeight), behavior: 'smooth' })
        },
        down(){
            let content = this.$refs.sliderOuter
            var curruntScroll = content.scrollTop
            // console.log(curruntScroll ,curruntScroll += this.slideHeight)
            content.scrollTo({ top: (curruntScroll += this.slideHeight), behavior: 'smooth' })
        }
    }
}
</script>