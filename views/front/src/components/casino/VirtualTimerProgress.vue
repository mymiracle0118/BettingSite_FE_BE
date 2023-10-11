<template>
    <div class="progress mobile-timer virtual" :style="{'width': width}">
        <div class="progress-bar" :class="getProgressClass()" :style="{'width':getWidth}">
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },

        props: ['totalTime', 'currentTime', 'width'],

        computed: {
            getWidth() {
                if(this.totalTime > 3){
                    return `${((this.currentTime * 100) / this.totalTime).toFixed(2)}%`;
                }else{
                    return '0%'
                }
            },
        },
        methods:{
            getProgressClass(){
                if(this.currentTime <= 3) {
                    return 'bg-danger'
                } else if(this.currentTime <= 6){
                    return 'bg-warning'
                } else {
                    return 'bg-success'
                }
            }
        }
    };
</script>