<template>
  <el-checkbox-group value="" :disabled="disabled" v-model="model" v-on:focus="handleFocus($event)" v-on:handleBlur="handleBlur($event)" v-on:change="emitChange" v-on:input="emitInput">
    <el-checkbox  v-for="item in options" :label="item.value" :disabled="item.disabled" :key="item.value" v-if="item.level > 1">{{item.name}}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
  import { getDictsByType } from '@/utils/dictUtils.js'
  export default {
    name: 'SelfDictCheckboxGroup',
    props: {
      value: '',
      showCheckAll: {
        default: true
      },
      type: {
        default: null
      },
      disabled: {
        default: false
      },
      min: {
        default: null
      },
      max: {
        default: null
      }
    },
    data () {
      return {
        model: [],
        options: []
      }
    },
    mounted () {
      this.loadDict()
    },
    methods: {
      handleFocus (event) {
        this.$emit('focus', event)
      },
      handleBlur (event) {
        this.$emit('blur', event)
      },
      emitChange (val) {
        this.$emit('change', val)
      },
      emitInput (val) {
        this.$emit('input', val)
      },
      // 加载字典
      loadDict () {
        let self = this
        if (self.type === undefined || self.type === '' || self.type === null) {
          return
        }
        getDictsByType(this, self.type).then(function (value) {
          self.options = value
        }).catch(error => {
          if (error.response.status === 404) {
            self.$message.error('字典下拉选项加载失败:' + self.type)
          }
        })
      }
    },
    watch: {
      value (val) {
        this.model = val
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
