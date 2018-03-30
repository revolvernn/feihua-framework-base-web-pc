<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="formRules" style="width: 460px;" label-width="100px">
      <el-form-item label="名称" prop="name" required>
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="seqNo" required>
        <el-input  v-model="form.seqNo"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" required>
        <el-input  v-model="form.sex"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName" required>
        <el-input  v-model="form.nickName"></el-input>
      </el-form-item>
      <el-form-item label="身高" prop="height" required>
        <el-input  v-model="form.height"></el-input>
      </el-form-item>
      <el-form-item label="体重" prop="weight" required>
        <el-input  v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="company" required>
        <el-input  v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="职业" prop="profession" required>
        <el-input  v-model="form.profession"></el-input>
      </el-form-item>
      <el-form-item label="其它" prop="other" required>
        <el-input type="textarea" :rows="5"  v-model="form.other"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addBtnClick" :loading="addLoading">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import loadDataControl from '@/utils/storeLoadDataControlUtils.js'
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  export default {
    components: {
      SelfDictSelect},
    name: 'EricUserAdd',
    data () {
      return {
        form: {
          name: null,
          seqNo: null,
          sex: null,
          nickName: null,
          height: null,
          weight: null,
          company: null,
          profession: null,
          other: null
        },
        addLoading: false,
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
              self.$http.post('/base/eric/user', self.form)
                .then(function (response) {
                  self.$message.info('eric用户添加成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  self.$message.error('eric用户添加失败，请稍后再试')
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
      },
      parentTreeNodeClick (data) {
        this.form.parentId = data.id
      },
      dataScopeTreeNodeClick (data) {
        this.form.dataScopeId = data.id
      }
    },
    watch: {
    },
    beforeRouteEnter  (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        let dataControl = 'EricUserAddLoadData=true'
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
