<template>
    <div class="disconnected-box" v-if="isVisible">
        <div class="disconnected-message">
            <div class="text-center">
                <i class="fas fa-exclamation-triangle mr-1"></i>
                <b>Disconnection due to inactivity</b>
            </div>
            <div class="mt-1">Are you there? You have been disconnected. Please go back to home or start playing again</div>
            <div class="disconnected-buttons mt-2">
                <button @click="$parent.reconnectTv()" type="button" class="btn btn-outline-primary">Reconnect</button>
                <router-link class="btn btn-outline-danger" :to="{ name: 'owncasinolist' }">
                    Home
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            isVisible: false
        }
    },
    methods:{
        show(){
            this.isVisible = true
        },
        hide(){
            this.isVisible = false
        }
    }
}
</script>