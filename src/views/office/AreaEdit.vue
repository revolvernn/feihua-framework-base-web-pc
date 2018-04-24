<template>
  <div class="wrapper">
    <el-popover
      ref="areaParentSelect"
      placement="right"
      trigger="click">
      <area-tree v-on:nodeClick="parentTreeNodeClick"></area-tree>
    </el-popover>
    <el-form ref="form" :model="form" :rules="formRules" style="width: 460px;" label-width="100px" v-loading="formDataLoading">
      <el-form-item label="名称" prop="name" required>
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" required>
        <self-dict-select v-model="form.type" type="area_type"></self-dict-select>
      </el-form-item>
      <el-form-item label="父级">
        <el-input  v-model="formLabel.parentIdName" :readonly="true" clearable>
          <el-button slot="append" icon="el-icon-search" v-popover:areaParentSelect></el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="显示顺序">
        <el-input-number v-model="form.sequence" :min="0" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateBtnClick"><i class="el-icon-loading" v-if="addLoading"></i><span v-else>修改</span></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import AreaTree from './AreaTree.vue'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  export default {
    name: 'AreaEdit',
    components: {AreaTree, SelfDictSelect},
    data () {
      return {
        // 编辑的id
        id: null,
        form: {
          name: '',
          type: '',
          sequence: '',
          parentId: '0',
          updateTime: null
        },
        formDataLoading: false,
        addLoading: false,
        formLabel: {
          parentIdName: ''
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
      this.id = this.$route.params.id
      this.loadEditData(this.id)
    },
    methods: {
      loadEditData (id) {
        let self = this
        self.formDataLoading = true
        self.$http.get('/base/area/' + self.id)
          .then(function (response) {
            let content = response.data.data.content
            self.form.name = content.name
            self.form.type = content.type
            self.form.sequence = content.sequence
            self.form.parentId = content.parentId
            self.form.updateTime = content.updateAt
            self.formDataLoading = false
            return Promise.resolve(content.parentId)
          }).then(parentId => {
            if (parentId && parentId !== '0') {
              self.$http.get('/base/area/' + parentId).then(response => {
                let content = response.data.data.content
                self.formLabel.parentIdName = content.name
              })
            } else {
              self.formLabel.parentIdName = null
            }
          }).catch(function (response) {
            self.formDataLoading = false
          })
      },
      updateBtnClick () {
        let self = this
        if (self.addLoading === false) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              // 请求添加
              self.addLoading = true
              self.$http.put('/base/area/' + self.id, self.form)
                .then(function (response) {
                  self.$message.info('字典修改成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  if (response.response.status === 404) {
                    self.$message.error('字典修改失败，数据不存在或已被他人修改，请刷新列表后再试')
                  }
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
      parentTreeNodeClick (data) {
        this.form.parentId = data.id
        this.formLabel.parentIdName = data.name
      }
    },
    // tab切换如果参数不一样，重新加载数据
    beforeRouteEnter  (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        if (vm.id !== vm.$route.params.id) {
          vm.id = vm.$route.params.id
          vm.loadEditData(vm.id)
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
