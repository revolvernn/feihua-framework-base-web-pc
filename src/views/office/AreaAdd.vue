<template>
  <div class="wrapper">
    <el-popover
      ref="areaParentSelect"
      placement="right"
      trigger="click">
      <area-tree v-on:nodeClick="parentTreeNodeClick"></area-tree>
    </el-popover>

    <el-form ref="form" :model="form" :rules="formRules" style="width: 460px;" label-width="100px">
      <el-form-item label="名称" prop="name" required>
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" required>
        <self-dict-select v-model="form.type" type=""></self-dict-select>
      </el-form-item>
      <el-form-item label="父级" prop="parentId">
        <el-input  v-model="formLabel.parentIdName" :readonly="true" clearable>
          <el-button slot="append" icon="el-icon-search" v-popover:areaParentSelect></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="sequence">
        <el-input-number v-model="form.sequence" :min="0" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBtnClick"><i class="el-icon-loading" v-if="addLoading"></i><span v-else>添加</span></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import AreaTree from './AreaTree.vue'
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  export default {
    components: {AreaTree, SelfDictSelect},
    name: 'AreaAdd',
    data () {
      return {
        form: {
          name: null,
          type: null,
          sequence: null,
          parentId: '0'
        },
        addLoading: false,
        formLabel: {
          parentIdName: null
        },
        formRules: {
          name: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '必填', trigger: 'blur'}
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      addBtnClick () {
        let self = this
        if (self.addLoading === false) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              // 请求添加
              self.addLoading = true
              self.$http.post('/base/area', self.form)
                .then(function (response) {
                  self.$message.info('字典添加成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  self.$message.error('字典添加失败，请稍后再试')
                  self.addLoading = false
                })
            } else {
              return false
            }
          })
        } else {
          self.$message.info('正在请求中，请耐心等待')
        }
      },
      resetForm () {
        this.$refs['form'].resetFields()
        this.formLabel.parentIdName = null
      },
      parentTreeNodeClick (data) {
        this.form.parentId = data.id
        this.formLabel.parentIdName = data.name
      }
    },
    watch: {
      formLabel (value) {
        if (value.parentIdName === '') {
          this.form.parentId = ''
        }
      }
    },
    beforeRouteEnter  (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        let dataControl = 'AreaAddLoadData=true'
        if (loadDataControl.has(vm.$store, dataControl)) {
          // 重置表单
          vm.resetForm()
          loadDataControl.remove(vm.$store, dataControl)
        }
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  padding:1.5rem;
}
</style>
