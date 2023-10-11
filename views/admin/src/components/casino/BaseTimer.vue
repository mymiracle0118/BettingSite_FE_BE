<template>
    <div class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="base-timer__circle">
                <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                <path :stroke-dasharray="circleDasharray" class="base-timer__path-remaining" :class="remainingPathColor"
                    d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>
            </g>
        </svg>
        <span class="base-timer__label" :class="remainingPathColor">
            <template v-for="(digit, key) in formattedTimeLeft">
                <transition name="component-fade" mode="out-in" :key="key">
                    <span :key="digit">{{ digit }}</span>
                </transition>
            </template>
        </span>
        <!-- <span class="base-timer__label" :class="remainingPathColor">{{ formattedTimeLeft }}</span> -->
    </div>
</template>

<script>
    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 6;
    const ALERT_THRESHOLD = 3;

    const COLOR_CODES = {
        info: {
            color: "green"
        },
        warning: {
            color: "orange",
            threshold: WARNING_THRESHOLD
        },
        alert: {
            color: "red",
            threshold: ALERT_THRESHOLD
        }
    };

    // const this.totalTime = 60;

    export default {
        data() {
            return {
                
            };
        },

        props:['totalTime', 'currentTime'],

        computed: {
            circleDasharray() {
                return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
            },

            formattedTimeLeft() {
                return this.currentTime.toString().split("")
                /*const timeLeft = this.currentTime;
                const minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;

                if (seconds < 10) {
                    seconds = `0${seconds}`;
                }
                return `${minutes}:${seconds}`;*/
            },

            timeFraction() {
                const rawTimeFraction = this.currentTime / this.totalTime;
                return rawTimeFraction - (1 / this.totalTime) * (1 - rawTimeFraction);
            },

            remainingPathColor() {
                const {
                    alert,
                    warning,
                    info
                } = COLOR_CODES;

                if (this.currentTime <= alert.threshold) {
                    return alert.color;
                } else if (this.currentTime <= warning.threshold) {
                    return warning.color;
                } else {
                    return info.color;
                }
            }
        },

        watch: {
          
        },

        mounted() {
        },

        methods: {
            
           
        }
    };
</script>

<style scoped>
    .base-timer .component-fade-enter-active,
    .base-timer .component-fade-leave-active {
        transition: all .3s;
    }

    .base-timer .component-fade-enter{
        opacity: 0;
        transform: translateY(-10px);
    }
    .base-timer .component-fade-leave-to
    {
        opacity: 0;
        transform: translateY(10px);
    }
</style>
