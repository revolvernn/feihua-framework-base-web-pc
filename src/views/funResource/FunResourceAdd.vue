<template>
  <div class="wrapper">
    <el-popover
      ref="funResourceParentSelect"
      placement="right"
      trigger="click">
      <el-scrollbar wrapStyle="max-height:500px;">
      <funResource-tree v-on:nodeClick="parentTreeNodeClick"></funResource-tree>
      </el-scrollbar>
    </el-popover>

    <el-form ref="form" :model="form" :rules="formRules" style="width: 460px;" label-width="100px">
      <el-form-item label="名称" prop="name" required>
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input  v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <self-dict-select v-model="form.type" type="funResource_type"></self-dict-select>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow" required>
        <self-dict-select v-model="form.isShow" type="yes_no"></self-dict-select>
      </el-form-item>
      <el-form-item label="url">
        <el-input  v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="权限标识">
        <el-input  v-model="form.permissions"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="sequence">
        <el-input-number v-model="form.sequence" :min="0" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item label="父级" prop="parentId">
        <el-input  v-model="formLabel.parentIdName" :readonly="true" clearable>
          <el-button slot="append" icon="el-icon-search" v-popover:funResourceParentSelect></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBtnClick" :loading="addLoading">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import FunResourceTree from './FunResourceTree.vue'
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  import OfficeTree from '@/views/office/OfficeTree.vue'
  export default {
    components: {
      OfficeTree,
      FunResourceTree,
      SelfDictSelect},
    name: 'FunResourceAdd',
    data () {
      return {
        form: {
          icon: null,
          isShow: '',
          name: null,
          url: null,
          type: '',
          permissions: null,
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
          isShow: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          sequence: [
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
              self.$http.post('/base/functionResource', self.form)
                .then(function (response) {
                  self.$message.info('功能资源添加成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  self.$message.error('功能资源添加失败，请稍后再试')
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
      },
      officeTreeNodeClick (data) {
        this.form.dataOfficeId = data.id
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
        let dataControl = 'FunResourceAddLoadData=true'
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
