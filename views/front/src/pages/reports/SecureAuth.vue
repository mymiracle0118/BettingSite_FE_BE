<template>
    <div class="report-box security-auth w-100">
        <div class="report-title">
            <div class="report-name">Secure Auth Verification</div>

        </div>
        <template v-if="authId != null">
            <div class="text-center">
                <b>Secure Auth Verification Status:</b>
                <a href="javascript:void(0)" @click="disableAuth()" class="btn btn-success"
                    v-if="authId == '1' || authId == '2'"
                    title="Click here to disable secure auth verification">Enabled</a>
                <span class="badge badge-danger" v-else>Disabled</span>
            </div>
            <template v-if="authId == 0">
                <div class="mt-2 text-center">Please select below option to enable secure auth verification</div>
                <div class="casino-report-tabs mt-3">
                    <ul class="nav nav-tabs">
                        <li class="nav-item" @click="enableAuth(1)">
                            <a class="nav-link" :class="{'active': selected == 1}">Eanable Using Mobile App</a>
                        </li>
                        <li class="nav-item" @click="enableAuth(2)">
                            <a class="nav-link" :class="{'active': selected == 2}">Enable Using Telegram</a>
                        </li>
                    </ul>
                </div>
            </template>
            <div class="tab-content">
                <template v-if="selected == 1 || authId == '1'">
                    <div class="tab-pane mobile-app active"
                        :class="[{'loader-section-parent': loading }]">
                        <Loader :isVisible="loading"></Loader>
                        <div class="text-center">
                            <template v-if="tokenval != ''">
                                <div class="mt-3">Please enter below auth code in your 'Secure Auth Verification App'.
                                </div>
                                <div class="mt-3">
                                    <div class="verify-code">{{ tokenval }}</div>
                                </div>
                            </template>

                            <template v-if="authId == '1' || tokenval != ''">
                                <div class="mt-3">
                                    <b>If you haven't downloaded,<br>please download 'Secure Auth Verification App' from
                                        below
                                        link.</b>
                                </div>
                                <div class="mt-3">Using this app you will receive auth code during login authentication
                                </div>
                                <div class="mt-3">
                                    <a :href="auth_apk_url">
                                        <button class="btn btn-primary">
                                            <i class="fab fa-android"></i>
                                            <span>Download on the Android</span>
                                        </button>
                                    </a>
                                </div>
                            </template>

                        </div>
                    </div>
                </template>
                <template v-if="selected == 2 || authId == '2'">
                    <div class="tab-pane telegram active"
                        :class="[{ 'loader-section-parent': loading }]">
                        <Loader :isVisible="loading"></Loader>
                        <template v-if="authId == 0">
                            <div class="text-center">
                                <b>Please enter your login password to continue</b>
                                <div class="form-group mt-3 secure-password">
                                    <input type="password" placeholder="Enter your login password" v-model="tdata.password" class="form-control">
                                    <button class="btn btn-primary ml-2 vt" @click="getTelegramConnectionId()">Get
                                        Connection
                                        ID</button>
                                </div>
                                <div class="mt-3 follow-instruction" v-if="tdata.connectionId != ''">
                                    <b>Please follow below instructions for the telegram 2-step verification</b>
                                    <p>Find <a target="_blank" href="https://t.me/secure_auth_bot?start"
                                            class="text-primary">@secure_auth_bot</a> in your telegram and type
                                        <kbd>/start</kbd>
                                        command. Bot will respond you.</p>
                                    <p>After this type <kbd>/connect {{ tdata.connectionId }}</kbd> and
                                        send it to
                                        BOT.</p>
                                    <p>Now your telegram account will be linked with your website account and 2-Step
                                        verification
                                        will be enabled.</p>
                                    <hr>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>

                <template v-if="authoff.status == true">
                    <div class="tab-pane active">
                        <div class="mt-2 mb-3 login-auth">
                            <h3 class="text-center">Security Code Verification</h3>
                            <div class="mt-3 text-center">Enter 6-digit code from your security auth
                                verification
                                App</div>
                            <form class="mt-3" role="form" autocomplete="off" @submit.prevent="verifyCode()"
                                method="post">
                                <div style="display: flex; flex-direction: row; justify-content:center">
                                    <OtpInput ref="otpInput" input-classes="otp-input" separator="" :num-inputs="6"
                                        :should-auto-focus="true" :is-input-num="true" @on-change="handleOnChange"
                                        @on-complete="handleOnComplete" />
                                </div>
                            </form>
                        </div>
                    </div>
                </template>

            </div>
        </template>

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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            this.getAuth();
        },
        data() {
            return {
                imgPath: IMG_PATH,
                loading: false,
                auth_apk_url: `${AUTH_APK_URL}SecureAuthApp-${AUTH_APK_VERSION}.apk`,
                time: {
                    total: 30
                },
                tokenval: "",
                authoff: {
                    status: false,
                    code: ""
                },
                selected: "",
                tdata: {
                    connectionId: "",
                    password: ""
                },
                authId: null,
            }
        },
        methods: {
            getAuth() {
                ServiceApi.callApi("api/front/getauth", {})
                    .then(response => {
                        if (response.status == 200) {
                            this.authId = response.data
                        } else {
                            this.authId = null
                        }
                    })
                    .catch(e => {
                        this.authId = null
                    });
            },
            enableAuth(value) {
                this.selected = value
                this.authoff.status = false
                this.tdata = {
                    connectionId: "",
                    password: ""
                }
                if (this.selected == 1) {
                    this.loading = true
                    ServiceApi.callApi("api/front/authon", {})
                        .then(response => {
                            this.loading = false
                            if (response.status == 200) {
                                this.tokenval = response.data
                                // this.$bvToast.toast(response.msg, {
                                //     variant: 'success',
                                //     toaster: 'b-toaster-top-full',
                                //     autoHideDelay: 3000,
                                // })
                            } else {
                                this.tokenval = ""
                                this.$bvToast.toast(response.msg, {
                                    variant: 'danger',
                                    toaster: 'b-toaster-top-full',
                                    autoHideDelay: 3000,
                                })
                            }
                        })
                        .catch(e => {
                            this.tokenval = ""
                            this.loading = false
                        });
                }
            },
            getTelegramConnectionId() {
                this.loading = true
                ServiceApi.callApi("api/front/authontele", {
                        'password': this.tdata.password
                    })
                    .then(response => {
                        if (response.status == 200) {
                            this.tdata.connectionId = response.data
                            // this.$bvToast.toast(response.msg, {
                            //     variant: 'success',
                            //     toaster: 'b-toaster-top-full',
                            //     autoHideDelay: 3000,
                            // })
                        } else {
                            this.tdata.connectionId = ""
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                        }
                        this.loading = false
                    })
                    .catch(e => {
                        this.loading = false
                    });
            },
            disableAuth() {
                this.authoff.status = true
                if (this.authId == 2) {
                    this.loading = true
                    ServiceApi.callApi("api/front/userchecktele", {})
                        .then(response => {
                            this.loading = false
                            if (response.status == 200) {
                                this.tdata.connectionId = response.cval
                                this.$bvToast.toast(response.msg, {
                                    variant: 'success',
                                    toaster: 'b-toaster-top-full',
                                    autoHideDelay: 3000,
                                })
                            } else {
                                if (response.status != 403) {
                                    this.$bvToast.toast(response.msg, {
                                        variant: 'danger',
                                        toaster: 'b-toaster-top-full',
                                        autoHideDelay: 3000,
                                    })
                                }
                            }
                        }).catch(res => {
                            this.loading = false
                        });
                }
            },
            handleOnComplete(value) {
              this.authoff.code = value
              this.verifyCode();
            },
            handleOnChange(value) {
                this.authoff.code = value
            },
            handleClearInput() {
              this.$refs.otpInput.clearInput();
            },
            verifyCode() {
                this.loading = true
                ServiceApi.callApi("api/front/authoff", {'code': parseInt(this.authoff.code), 'authId': this.authId})
                .then(response => {
                    this.loading = false
                    if (response.status == 200) {
                        this.$bvToast.toast(response.msg, {
                            variant: 'success',
                            toaster: 'b-toaster-top-full',
                            autoHideDelay: 3000,
                        })
                        this.getAuth();
                    } else {
                        this.$refs.otpInput.clearInput();
                        if(response.status != 403){
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                        }
                    }
                }).catch(res => {
                    this.loading = false
                });  
            },
        }
    }
</script>