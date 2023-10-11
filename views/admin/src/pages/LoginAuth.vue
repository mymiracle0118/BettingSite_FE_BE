<template>
    <div class="login-auth" :class="{ 'loader-section-parent': loading }">
        <Loader :isVisible="loading"></Loader>
        <div class="loginInner1 authentication">
            <div class="log-logo m-b-20 text-center">
                <img :src="logoPath" class="logo-login">
            </div>
            <div class="featured-box-login featured-box-secundary default">
                <template v-if="authId == 1">
                    <h3 class="text-center">Security Code Verification</h3>
                    <div class="mt-3 text-center">Enter 6-digit code from your security auth verification App</div>
                </template>
                <template v-else-if="authId == 2">
                    <h3 class="text-center">Security Code Verification Using Telegram App</h3>
                    <div class="mt-3 text-center">Enter 6-digit code from your telegram bot
                        <span v-if="authId == 2" class="">
                            <a href="javascript:void(0)" @click="genOtpTele()">Resend Code</a>
                        </span>
                    </div>
                </template>

                <form class="mt-3" role="form" autocomplete="off" @submit.prevent="verifyCode()" method="post">
                    <div style="display: flex; flex-direction: row;">
                        <OtpInput ref="otpInput" input-classes="otp-input" separator="" :num-inputs="6"
                            :should-auto-focus="true" :is-input-num="true" @on-change="handleOnChange"
                            @on-complete="handleOnComplete" />

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import OtpInput from "@bachdgvn/vue-otp-input";

    import Loader from '@/components/loader'

    export default {
        components: {
            OtpInput,
            Loader
        },
        mounted() {
            this.authId = this.$route.params.authId;
            if(this.authId == 2){
                this.genOtpTele();
            }
        },
        data() {
            return {
                logoPath: LOGO_PATH,
                imgPath: IMG_PATH,
                loading: false,
                 formData: {
                   code: ""
                },
                authId: "",
            }
        },
        methods: {
            handleOnComplete(value) {
              this.formData.code = value
              this.verifyCode();
            },
            handleOnChange(value) {
                this.formData.code = value
            },
            handleClearInput() {
              this.$refs.otpInput.clearInput();
            },
            verifyCode() {
                this.loading = true
                ServiceApi.callApi("user/verifycode", {"code": parseInt(this.formData.code), "authId": this.authId})
                .then(response => {
                    this.loading = false
                    if (response.status == 200) {
                        this.$router.push({name: 'home'})
                    } else {
                        this.$refs.otpInput.clearInput();
                        this.makeToast('danger', response.message);
                    }
                }).catch(res => {
                    if (res.response.status == 422) {
                        this.makeToast('danger', res.response.data.message);
                    }
                    this.loading = false
                });  
            },
            genOtpTele() {
                this.loading = true
                ServiceApi.callApi("user/genotptele", {})
                .then(response => {
                    this.loading = false
                    if (response.status == 200) {
                        this.makeToast('success', response.message);
                    } else {
                        this.makeToast('danger', response.message);
                    }
                }).catch(res => {
                    if (res.response.status == 422) {
                        this.makeToast('danger', res.response.data.message);
                    }
                    this.loading = false
                });  
            },
        }
    }
</script>