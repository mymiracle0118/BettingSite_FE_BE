<template>
    <div>
        <div class="main-rules-container">
            <div class="dropdown rules-language-container">
                <div class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    <img :src="imgPath + 'front/img/' + getFlag(selectedLangId) + '.png'">
                    {{ strCapitalize(selectedLangName) }}
                    <i class="fas fa-angle-down ml-1"></i>
                </div>
                <div class="dropdown-menu rules-language">
                    <template v-for="(lang, key) in rules">
                        <div :key="key" @click="changeLang(lang.lid, lang.lname)">
                            <img :src="imgPath + 'front/img/' + getFlag(lang.lid) + '.png'">
                            <span>{{ strCapitalize(lang.lname) }}</span>
                        </div>
                    </template>
                </div>
            </div>
            <div class="menu-box">

                <!-- <div class="rules-language-container text-right">
                    <a href="javascript:void(0)">
                        <span data-toggle="collapse" data-target="#rules-language" class="collapsed" aria-expanded="false">
                            <img :src="imgPath + 'front/img/' + getFlag(selectedLangId) + '.png'">
                            {{ strCapitalize(selectedLangName) }}
                            <i class="fas fa-angle-down ml-1"></i>
                        </span>
                    </a>
                    <div id="rules-language" class="rules-language collapse">
                        <template v-for="(lang, key) in rules">
                            <div :key="key" @click="changeLang(lang.lid, lang.lname)">
                                <img :src="imgPath + 'front/img/' + getFlag(lang.lid) + '.png'">
                                <span>{{ strCapitalize(lang.lname) }}</span>
                            </div>
                        </template>
                    </div>
                </div> -->
                <div id="accordion">
                    <template v-for="(lang) in rulesData">
                        <template v-for="(rule, key1) in lang.slist">
                            <div class="card" :key="`event${key1}`">
                                <div class="card-header" :id="`eventhead${key1}`">
                                    <a href="javascript:void(0)" data-toggle="collapse" class="collapsed"
                                        :data-target="`#event${key1}`" :aria-controls="`event${key1}`">
                                        {{ rule.etname }}
                                    </a>
                                </div>
                                <div :id="`event${key1}`" class="collapse" :aria-labelledby="`eventhead${key1}`"
                                    data-parent="#accordion">
                                    <div class="card-body" :id="`eventaccordion${key1}`">
                                        <template v-for="(game, key2) in rule.gametypelist">
                                            <div class="card" :key="`event${key1}game${key2}`">
                                                <div class="card-header">
                                                    <a href="javascript:void(0)" data-toggle="collapse"
                                                        class="collapsed"
                                                        :data-target="`#event${key1}game${key2}`">{{ game.gtype }}</a>
                                                </div>
                                                <div class="card-body collapse" :data-parent="`#eventaccordion${key1}`"
                                                    :id="`event${key1}game${key2}`">
                                                    <template v-for="(rule, key3) in orderBy(game.rulelist, 'rorder')">
                                                        <div class="rule-text" :key="`rule${key3}`"
                                                            :class="[{'text-danger' : rule.rcolor == '2'}, {'text-success' : rule.rcolor == '3'}]">
                                                            {{ rule.rule }}
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div class="modal-footer" v-if="$store.state.rdisplay">
            <span>I agree all rules</span>
            <div>
                <button type="button" class="btn btn-danger" @click="$parent.$parent.$parent.resetFlags()">Cancel</button>
                <button type="button" class="btn btn-success" @click="confirmRules()">Accept</button>
            </div>
        </div>
        <div class="modal-footer" v-else>
            <div>
                <button type="button" class="btn btn-danger" @click="$parent.$parent.$parent.hideRules()">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ServiceApi from "@/services/ServiceApi";
    export default {
        props: ['rules'],
        mounted() {
            this.selectedLangId = _.get(_.head(this.rules), 'lid')
            this.selectedLangName = _.get(_.head(this.rules), 'lname')
        },
        data() {
            return {
                imgPath: IMG_PATH,
                langs: [],
                selectedLangId: '',
                selectedLangName: ''
            }
        },
        computed: {
            rulesData() {
                return _.filter(this.rules, {
                    'lid': this.selectedLangId
                });
            }
        },
        methods: {
            confirmRules() {
                ServiceApi.callApi("api/front/acceptrules")
                    .then(response => {
                        if (response.status == 200) {
                            this.$store.state.rdisplay = false
                            this.$parent.$parent.$parent.user.rdisplay = false
                            // console.log(this.$parent.$parent.$parent.user)
                            localStorage.setItem('user', JSON.stringify(this.$parent.$parent.$parent.user))
                            this.$parent.$parent.$parent.hideRules()
                        } else {
                            
                        }
                    })
                    .catch(e => {
                        
                    });
            },
            strCapitalize(string) {
                return _.capitalize(string)
            },
            getFlag(id) {
                switch (id) {
                    case 1:
                        return 'flag_english'
                        break;
                    case 2:
                        return 'flag_hindi'
                        break;

                    default:
                        break;
                }
            },
            changeLang(lid, lname) {
                this.selectedLangId = lid
                this.selectedLangName = lname
            }
        },
    }
</script>
