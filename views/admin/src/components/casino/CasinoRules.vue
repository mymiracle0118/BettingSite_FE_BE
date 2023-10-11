<template>
<div>
  <div id="casino-vieo-rules" class="casino-vieo-rules show d-none-small" :class="{'show-rules': showRules}" v-if="showRules" aria-modal="true" style="display: block;">
      <div class="rules-header">
          <div>Rules</div>
          <i class="fas fa-times" @click="showRules = false"></i>
      </div>
      <div class="rules-body">
          <template v-if="rulesHtml && rulesHtml.length">
              <template v-for="(rule, key) in rulesHtml">
                  <div :key="`body-${key}`" v-html="rule.rules"></div>
              </template>
          </template>
      </div>
  </div>
  <b-modal ref="rules-modal" modal-class="casino-rules teenpatti2-rule-modal" title="Rules" hide-footer id="rules-modal">
      <div class="casino-vieo-rules show-rules show">
          <div class="rules-body">
              <template v-if="rulesHtml && rulesHtml.length">
                  <template v-for="(rule, key) in rulesHtml">
                      <div :key="`body-${key}`" v-html="rule.rules"></div>
                  </template>
              </template>
          </div>
      </div>
  </b-modal>
</div>
</template>
<script>
    import ServiceApi from "@/services/ServiceApi";
    export default {
        data(){
            return {
                imgPath: IMG_PATH,
                rulesHtml: [],
                showRules: false
            }
        },
        props:['gtype'],
        components: { 
        },
        mounted() {
        
        },
        methods: {
          show() {
            ServiceApi.callApi("casino/ruleshtml", {
                'type': this.gtype,
            })
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    this.showRules = true
                    this.rulesHtml = response.data
                    if(IS_MOBILE){
                        this.$refs['rules-modal'].show()
                    }
                } else {
                    this.showRules = false
                    this.rulesHtml = []
                }
            })
            .catch(e => {
                this.showRules = false
                this.rulesHtml = []
            });
        }     
      }
    }
</script>

<style>

</style>