<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="formRules" style="width: 460px;" label-width="100px" v-loading="formDataLoading">
      <el-form-item label="标题" prop="title" required>
        <el-input  v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="profile" required>
        <el-input  v-model="form.profile"></el-input>
      </el-form-item>
      <el-form-item label="消息内容" prop="content" required>
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="消息分类" prop="msgType">
        <self-dict-select v-model="form.msgType" type="message_type"></self-dict-select>
      </el-form-item>
      <el-form-item label="消息紧急性" prop="msgLevel">
        <self-dict-select v-model="form.msgLevel" type="message_level"></self-dict-select>
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
    name: 'MessageEdit',
    components: {
      SelfDictSelect
    },
    data () {
      return {
        // 编辑的id
        id: null,
        form: {
          title: null,
          profile: null,
          content: null,
          msgType: null,
          msgLevel: null
        },
        formDataLoading: false,
        addLoading: false,
        formRules: {
          title: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          msgType: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          msgLevel: [
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
        self.$http.get('/base/message/' + self.id)
          .then(function (response) {
            let content = response.data.data.content
            self.form.title = content.title
            self.form.profile = content.profile
            self.form.content = content.content
            self.form.msgType = content.msgType
            self.form.msgLevel = content.msgLevel
            self.form.updateTime = content.updateAt
            self.formDataLoading = false
          })
          .catch(function (response) {
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
              self.$http.put('/base/message/' + self.id, self.form)
                .then(function (response) {
                  self.$message.info('消息修改成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  if (response.response.status === 404) {
                    self.$message.error('消息修改失败，数据不存在或已被他人修改，请刷新列表后再试')
                  } else if (response.response.status === 403) {
                    if (response.response.data.code === 'E403_100004') {
                      self.$message.error('消息修改失败，消息已发送不能修改')
                    }
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
