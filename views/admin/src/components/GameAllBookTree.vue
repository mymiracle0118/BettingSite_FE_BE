<template>
    <li class="mtree-node mtree-closed">
    <a href="javascript:void(0)"
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="changeType">
      <table class="table m-b-0">
            <tbody>
                <tr>
                    <td  :data-id="model.levelno"><span v-if="isFolder">[{{ open ? '-' : '+' }}]</span> {{ model.Username }} </td>
                    <template v-for="(val, key) in model">
                        <td class="text-right "  v-if="key!='children' && key!='levelno' && key!='userid' && key!='subid' && key!='Username' " :class="{'positive' : val >0 , 'negative': val<=0 }" >
                            {{ val }}
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
    </a>
    <ul v-show="open" v-if="isFolder">
      <item
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model"
        >
      </item>
    </ul>
  </li>
</template>

<script>

    export default {
        name: 'item',
        mounted() {
              
        },
        props: [
            'model'
        ],
        data: function () {
            return {
            open: false
            }
        },
        computed: {
            isFolder: function () {
            return this.model.children &&
                this.model.children.length
            }
        },
        methods: {
            toggle: function () {
            if (this.isFolder) {
                this.open = !this.open
            }
            },
            changeType: function () {
            if (!this.isFolder) {
                Vue.set(this.model, 'children', [])
                this.addChild()
                this.open = true
            }
            },
            addChild: function () {
            // this.model.children.push({
            //     name: 'new stuff'
            // })
            }
        }
    }
</script>


