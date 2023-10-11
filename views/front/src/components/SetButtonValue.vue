<template>
    <ValidationObserver tag="div" :class="{ 'loader-section-parent' : loading}" v-slot="{ invalid }">
        <Loader :isVisible="loading"></Loader>
        <ul class="nav nav-tabs buttons-tabs">
            <li class="nav-item">
                <a class="active nav-link" data-toggle="tab" href="#game-btn">
                    <span>Game Buttons</span>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#casino-btn">
                    <span>Casino Buttons</span>
                </a>
            </li>
        </ul>

        <div class="tab-content">
            <div id="game-btn" class="bet-table tab-pane active">
                <div class="table-responsive">
                    <table class="table button-value">
                        <thead>
                            <tr>
                                <th>Price Label</th>
                                <th>Price Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <template v-for="(btn, key) in $store.state.buttonList"> -->
                            <template v-for="(btn, key) in buttons">
                                <tr :key="key">
                                    <ValidationProvider :name="`Button Label ${key+1}`" tag="td" v-slot="{ errors }"
                                        :rules="{required: true, max: 5, regex: /^[a-zA-Z0-9]+$/}">
                                        <input type="text" v-model="btn.btxt" class="form-control"
                                            onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)'>
                                        <span v-if="errors[0]" class="error">
                                            {{ errors[0] }}
                                        </span>
                                    </ValidationProvider>

                                    <ValidationProvider :name="`Button Value ${key+1}`" tag="td" v-slot="{ errors }"
                                        :rules="{required: true, numeric: true, regex: /^[0-9]+$/}">
                                        <input type="number" v-model.number="btn.bval" class="form-control"
                                            onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                                        <span v-if="errors[0]" class="error">
                                            {{ errors[0] }}
                                        </span>
                                    </ValidationProvider>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="text-right">
                    <button class="btn btn-primary btn-block" @click="updateButtons()" :disabled="invalid">Submit</button>
                </div>
            </div>

            <div id="casino-btn" class="bet-table tab-pane fade">
                <div class="table-responsive">
                    <table class="table button-value">
                        <thead>
                            <tr>
                                <th>Price Label</th>
                                <th>Price Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- <template v-for="(btn, key) in $store.state.buttonList"> -->
                            <template v-for="(btn, key) in casinoButtons">
                                <tr :key="key">
                                    <ValidationProvider :name="`Button Label ${key+1}`" tag="td" v-slot="{ errors }"
                                        :rules="{required: true, max: 5, regex: /^[a-zA-Z0-9]+$/}">
                                        <input type="text" v-model="btn.btxt" class="form-control"
                                            onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)'>
                                        <span v-if="errors[0]" class="error">
                                            {{ errors[0] }}
                                        </span>
                                    </ValidationProvider>

                                    <ValidationProvider :name="`Button Value ${key+1}`" tag="td" v-slot="{ errors }"
                                        :rules="{required: true, numeric: true, regex: /^[0-9]+$/}">
                                        <input type="number" v-model.number="btn.bval" class="form-control"
                                            onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
                                        <span v-if="errors[0]" class="error">
                                            {{ errors[0] }}
                                        </span>
                                    </ValidationProvider>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
                <div class="text-right">
                    <button class="btn btn-primary btn-block" @click="updateCasinoButtons()" :disabled="invalid">Submit</button>
                </div>
            </div>
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
                loading: false,
                buttons: [],
                casinoButtons: [],
            }
        },
        mounted() {
            this.getButtonList()
            this.getCasinoButtonList()
        },
        methods: {
            getButtonList() {
                // this.buttons = this.$store.state.buttonList
                ServiceApi.callApi("api/front/buttonlist")
                    .then(response => {
                        if (response.status == 200) {
                            this.buttons = response.data.t1
                            this.$store.state.autocon = response.data.autocon
                            this.$store.state.lottery.btnVal = response.data.t1[0].bval
                        }
                    })
                    .catch(e => {
                        this.buttons = []
                    });
            },
            getCasinoButtonList() {
                // this.buttons = this.$store.state.buttonList
                ServiceApi.callApi("api/front/buttonlistcs")
                    .then(response => {
                        if (response.status == 200) {
                            this.casinoButtons = response.data.t1
                            this.$store.state.autocon = response.data.autocon
                            this.$store.state.lottery.btnVal = response.data.t1[0].bval
                        }
                    })
                    .catch(e => {
                        this.casinoButtons = []
                    });
            },
            updateButtons() {
                if (this.loading)
                    return
                this.loading = true
                ServiceApi.callApi("api/front/buttonupdate", {
                        // btns: this.$store.state.buttonList
                        btns: this.buttons
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log('UP S', (this.$pages.isNot('casino', this.$route.name) && this.$pages.isNot('fullwidthcasino', this.$route.name)))
                            if(this.$pages.isNot('casino', this.$route.name) && this.$pages.isNot('fullwidthcasino', this.$route.name)){
                                ServiceApi.callApi("api/front/buttonlist")
                                    .then(response => {
                                        if (response.status == 200) {
                                            this.$store.state.buttonList = response.data.t1
                                            this.$store.state.autocon = response.data.autocon
                                            this.$store.state.lottery.btnVal = response.data.t1.bval
                                        }
                                    })
                                    .catch(e => {
                                        this.$store.state.buttonList = []
                                    });
                            }
                            this.$parent.$parent.$parent.showUpdateButtonMsg(response.msg, 'success')
                            this.$parent.$parent.$parent.hideSetButton()
                            this.loading = false
                        } else {
                            this.$parent.$parent.$parent.showUpdateButtonMsg(response.data, 'danger')
                            setTimeout(() => {
                                this.$parent.$parent.$parent.hideSetButton()
                            }, 3000);
                            this.loading = false
                        }
                    })
                    .catch(e => {
                        if (e.response) {
                            if (e.response.status == 405) {
                                this.$parent.$parent.$parent.showUpdateButtonMsg(e.response.data.msg, 'danger')
                            }
                        }
                        this.loading = false
                    });
            },
            updateCasinoButtons() {
                if (this.loading)
                    return
                this.loading = true
                ServiceApi.callApi("api/front/buttonupdatecs", {
                        // btns: this.$store.state.buttonList
                        btns: this.casinoButtons
                    })
                    .then(response => {
                        if (response.status == 200) {
                            // console.log('UP C', (this.$pages.is('casino', this.$route.name) || this.$pages.is('fullwidthcasino', this.$route.name)))
                            if(this.$pages.is('casino', this.$route.name) || this.$pages.is('fullwidthcasino', this.$route.name)){
                                ServiceApi.callApi("api/front/buttonlistcs")
                                    .then(response => {
                                        if (response.status == 200) {
                                            this.$store.state.buttonList = response.data.t1
                                            this.$store.state.autocon = response.data.autocon
                                            this.$store.state.lottery.btnVal = response.data.t1.bval
                                        }
                                    })
                                    .catch(e => {
                                        this.$store.state.buttonList = []
                                    });
                            }
                            this.$parent.$parent.$parent.showUpdateButtonMsg(response.msg, 'success')
                            this.$parent.$parent.$parent.hideSetButton()
                            this.loading = false
                        } else {
                            this.$parent.$parent.$parent.showUpdateButtonMsg(response.data, 'danger')
                            setTimeout(() => {
                                this.$parent.$parent.$parent.hideSetButton()
                            }, 3000);
                            this.loading = false
                        }
                    })
                    .catch(e => {
                        if (e.response) {
                            if (e.response.status == 405) {
                                this.$parent.$parent.$parent.showUpdateButtonMsg(e.response.data.msg, 'danger')
                            }
                        }
                        this.loading = false
                    });
            }

        }
    }
</script>
