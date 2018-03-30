<template>
  <div class="wrapper">

    <el-form ref="form" :model="form" :rules="formRules" style="width: 460px;" label-width="100px" v-loading="formDataLoading">
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
        <el-input type="textarea" :rows="5" v-model="form.other"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateBtnClick" :loading="addLoading">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  export default {
    name: 'EricUserEdit',
    components: {
      SelfDictSelect},
    data () {
      return {
        // 编辑的id
        id: null,
        form: {
          name: null,
          seqNo: null,
          sex: null,
          nickName: null,
          height: null,
          weight: null,
          company: null,
          profession: null,
          other: null,
          updateTime: null
        },
        formDataLoading: false,
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
      this.id = this.$route.params.id
      this.loadEditData(this.id)
    },
    methods: {
      loadEditData (id) {
        this.resetForm()
        let self = this
        self.formDataLoading = true
        self.$http.get('/base/eric/user/' + self.id)
          .then(function (response) {
            let content = response.data.data.content
            self.form.name = content.name
            self.form.name = content.name
            self.form.seqNo = content.seqNo
            self.form.sex = content.sex
            self.form.nickName = content.nickName
            self.form.height = content.height
            self.form.weight = content.weight
            self.form.company = content.company
            self.form.profession = content.profession
            self.form.other = content.other
            self.form.updateTime = content.updateAt
            self.formDataLoading = false
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
              self.$http.put('/base/eric/user/' + self.id, self.form)
                .then(function (response) {
                  self.$message.info('eric用户修改成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  if (response.response.status === 404) {
                    self.$message.error('eric用户修改失败，数据不存在或已被他人修改，请刷新列表后再试')
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
      resetForm () {
        this.$refs['form'].resetFields()
      }
    },
    watch: {
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
