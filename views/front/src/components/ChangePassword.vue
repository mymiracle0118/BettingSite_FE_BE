<template>
    <ValidationObserver tag="div" class="login-form" :class="{ 'loader-section-parent' : loading}" v-slot="{ invalid }">
        <Loader :isVisible="loading"></Loader>

        <ValidationProvider name="Old Password" tag="div" class="form-group" v-slot="{ errors }"
            :rules="{required: true}">
            <label class="user-email-text">Old Password</label>
            <input type="password" v-model="user.password" class="form-control" autocomplete="off">
            <span v-if="errors[0]" class="error">
                {{ errors[0] }}
            </span>
        </ValidationProvider>

        <ValidationProvider name="New Password" tag="div" class="form-group" v-slot="{ errors }"
            rules="required|verify_password|min:8|max:20" vid="NewPassword">
            <label class="user-email-text">New Password</label>
            <input type="password" v-model="user.newPassword" class="form-control" autocomplete="off">
            <span v-if="errors[0]" class="error">
                {{ errors[0] }}
            </span>
        </ValidationProvider>

        <ValidationProvider name="Confirm Password" tag="div" class="form-group" v-slot="{ errors }"
            rules="required|confirmed:NewPassword|verify_password|min:8|max:20">
            <label class="user-email-text">Confirm Password</label>
            <input type="password" v-model="user.newPasswordConfirm" class="form-control" autocomplete="off">
            <span v-if="errors[0]" class="error">
                {{ errors[0] }}
            </span>
        </ValidationProvider>

        <div class="form-group">
            <button class="btn btn-primary btn-block" @click="updatePassword('form-changepassword')"
                :disabled="invalid">Change
                Password</button>
        </div>
    </ValidationObserver>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    import Loader from '@/components/loader'
    export default {
        components: {
            Loader
        },
        data() {
            return {
                user: {
                    password: '',
                    newPassword: '',
                    newPasswordConfirm: '',
                    uname: this.$store.getters.user.uname
                },
                loading: false
            }
        },
        methods: {
            updatePassword() {
                if (this.loading)
                    return
                this.loading = true
                ServiceApi.callApi("api/front/passwordupdate", this.user)
                    .then(response => {
                        if (response.success == true) {
                            this.$bvToast.toast(response.msg, {
                                variant: 'success',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            setTimeout(() => {
                                this.$parent.$parent.$parent.hideChangePassword()
                            }, 3000);
                            this.loading = false
                        } else {
                            this.$bvToast.toast(response.msg, {
                                variant: 'danger',
                                toaster: 'b-toaster-top-full',
                                autoHideDelay: 3000,
                            })
                            setTimeout(() => {
                                this.$parent.$parent.$parent.hideChangePassword()
                            }, 3000);
                            this.loading = false
                        }
                    })
                    .catch(e => {
                        if (e.response) {
                            if (e.response.status == 405) {
                                this.$bvToast.toast(e.response.data.msg, {
                                    variant: 'danger',
                                    toaster: 'b-toaster-top-full',
                                    autoHideDelay: 3000,
                                })
                            }
                        }
                        this.loading = false
                    });
            }

        }
    }
</script>