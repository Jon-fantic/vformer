<!--
descript: 单选组件
author: jankergg
param: props
methods:
seledcheck: 用于选择默认值 传入一个索引数即可
-->
<template>
  <div class="za-singlecheck">
    <div class="root-select-mask" v-if="isReadOnly"></div>
    <div class="za-singlecheck-box" :class="{dis: isReadOnly}">
      <div class="btn"  :class="{active: innerValue != 0}" @click="onClick()">{{rules.btntxt}}</div>
    </div>
  </div>
</template>
<script>
  import rootSelectMx from '../mixin/check-mixin'

  export default {
    name: 'za-singlecheck',
    mixins: [rootSelectMx],
    props: ["formModel", "name", "index"],
    watch: {
      innerValue: {
        deep: true,
        handler (v) {
          this.onChange(v)
        }
      }
    },
    data(){
      return {
        rule:[],
        enable:false
      }
    },
    created(){
      this.rules = this.formModel.rules
      this.innerValue = parseInt(this.formModel.value)
    },
    methods: {
      onClick (v) {
        this.enable=!this.enable;
        this.onCheck(this.enable)
        if(this.innerValue!=0){
          this.innerValue = 0;
        }
        else{
          this.innerValue = parseInt(this.rules.list[0].code)
        }

      }
    }
  }
</script>
<style lang='less'>
  @import '~@/assets/styles/form.less';
  .za-singlecheck{
    .btn {
      display: inline-block;
      margin:0 0 0 8px;
      padding: 2px 8px;
      border-radius: 5px;
      color:@weuiTextColorLightGray;
      background-color:@weuiBgColorActive;
      &.active{
        color: @weuiBgColorPlain;
        background-color:@weuiColorPrimary;
      }
    }
  }
</style>
