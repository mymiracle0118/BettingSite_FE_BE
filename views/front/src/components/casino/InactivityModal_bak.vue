<template>
    <div class="disconnected-message">
        <div class="text-center">
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <b>Disconnection due to inactivity</b>
        </div>
        <div class="mt-3 text-center">Are you there? You have been disconnected. Please go back to home or start
            playing again</div>
        <div class="disconnected-buttons mt-3">
            <button @click="$parent.$parent.$parent.reconnectTv()" type="button" class="btn btn-outline-primary">Reconnect</button>
            <router-link class="btn btn-outline-danger" :to="{ name: 'owncasinolist' }">
                Home
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
        }
    },
    methods:{
    }
}
</script>