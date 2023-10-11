<script>
    import ServiceApi from "@/services/ServiceApi";
    import setButtonValue from "@/components/SetButtonValue"
    import changePassword from "@/components/ChangePassword"
    /**
     * Nav-bar Component
     */
    export default {
        data() {
            return {
                imgPath: IMG_PATH,
                username: ""
            };
        },
        mounted() {
            this.username = JSON.parse(this.$ls.get("user"));
        },
        components: {
            setButtonValue,
            changePassword
        },
        methods: {
            logoutUser() {
                this.$ls.remove("token");
                this.$ls.remove("user");
                this.$auth.logout();
                this.$router.push({
                    name: "login"
                });
            },
            showSetButton() {
                this.$refs['setButtonModal'].show()
            },
            hideSetButton() {
                this.$refs['setButtonModal'].hide()
            },
            showChangePassword() {
                this.$refs['changePassword'].show()
            },
            hideChangePassword() {
                this.$refs['changePassword'].hide()
            },
        }
    };
</script>

<template>
    <header class="header header-casino">
        <!-- <div class="menu-button-mobile">
            <span class="menu-button-bar"></span>
            <span class="menu-button-bar"></span>
            <span class="menu-button-bar"></span>
        </div> -->
        <div class="logo-box d-none-desktop">
            <div class="logo">
                <router-link :to="{name: 'home'}">
                    <img :src="imgPath + 'front/img/logo.png'" class="img-fluid">
                </router-link>
            </div>
        </div>
        <div class="logo-box d-none-mobile logo-casino">
            <div class="logo">
                <router-link :to="{name: 'home'}">
                    <img :src="imgPath + 'front/img/logo.png'" class="img-fluid">
                </router-link>
            </div>
        </div>
        <ul class="d-none-mobile">
            <li>
                <router-link :to="{name: 'home'}">Exchange</router-link>
            </li>
            <li>
                <router-link :to="{name: 'owncasinolist'}">Live Casino</router-link>
            </li>
            <li>
                <router-link :to="{name: 'slotcasinolist'}">Casino + Slot</router-link>
            </li>
            <li>
                <router-link :to="{name: 'otherlist'}">Other</router-link>
            </li>
        </ul>
        <div class="float-right header-right">
            <!-- <div class="d-inline-block odds-format-block d-none-mobile" data-toggle="collapse"
                data-target="#odds-format-box">
                <span class="odds-format">Odds format:</span>
                <span class="format-name">Decimal</span>
                <img src="img/arrow-down.svg">
                <div class="collapse odds-format-box" id="odds-format-box">
                    <a href="#">Decimal</a>
                    <a href="#" class="">Fraction</a>
                    <a href="#" class="">American</a>
                </div>
            </div> -->
            <!-- <div class="d-inline-block language-block d-none-mobile">
                <span class="language" data-toggle="collapse" data-target="#language-box">EN</span>
                <img src="img/arrow-down.svg">
                <div class="collapse language-box" id="language-box">
                    <div class="row">
                        <div class="col-3">
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name active">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_english.png">
                                <span class="flag-name">English</span>
                            </div>
                            <div class="flag">
                                <img src="img/flag_russian.png">
                                <span class="flag-name">Rusia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <span class="balance d-none-mobile">Balance:
                <span class="balance-value" v-if="$store.state.user.bal">{{ parseFloat($store.state.user.bal) }} |
                    {{ parseFloat($store.state.user.exp) }}</span>
            </span>
            <div class="username-info d-none-mobile" data-toggle="collapse" data-target="#user-dropdown">
                <span class="user-icon">
                    <img :src="imgPath + 'front/img/user.svg'">
                </span>
                <span class="username" v-if="$store.state.user.uname">{{ $store.state.user.uname }}</span>
                <img :src="imgPath + 'front/img/arrow-down.svg'">
                <div class="collapse user-dropdown" id="user-dropdown">
                    <router-link :to="{ name:'accountstatementReport' }">Account Statement</router-link>
                    <router-link :to="{ name:'currentbetsReport' }">Current Bets</router-link>
                    <a href="javascript:void(0)" @click="showSetButton()">Set Button Value</a>
                    <a href="javascript:void(0)" @click="showChangePassword()">Change Password</a>
                    <div class="login-seperator"></div>
                    <a href="javascript:void(0)" @click="logoutUser()">Logout</a>
                </div>
            </div>
            <div class="username-info d-none-desktop" data-toggle="collapse" data-target="#user-dropdown">
                <span class="user-icon">
                    <img :src="imgPath + 'front/img/user.svg'">
                </span>
                <span class="username" v-if="$store.state.user.uname">{{ $store.state.user.uname }}</span>
                <img :src="imgPath + 'front/img/arrow-down.svg'">
                <div class="collapse user-dropdown" id="user-dropdown">
                    <router-link :to="{ name:'accountstatementReport' }">Account Statement</router-link>
                    <router-link :to="{ name:'currentbetsReport' }">Current Bets</router-link>
                    <a href="javascript:void(0)" @click="showSetButton()">Set Button Value</a>
                    <a href="javascript:void(0)" @click="showChangePassword()">Change Password</a>
                    <div class="login-seperator"></div>
                    <a href="javascript:void(0)" @click="logoutUser()">Logout</a>
                </div>
            </div>
            <span class="balance d-none-desktop">Bal:
                <span class="balance-value" v-if="$store.state.user.bal">{{ parseFloat($store.state.user.bal) }} |
                    {{ parseFloat($store.state.user.exp) }}</span>
            </span>
        </div>

        <b-modal ref="setButtonModal" title="Set Button Value" hide-footer centered>
            <setButtonValue />
        </b-modal>

        <b-modal ref="changePassword" title="Change Password" hide-footer centered>
            <changePassword />
        </b-modal>
    </header>
</template>