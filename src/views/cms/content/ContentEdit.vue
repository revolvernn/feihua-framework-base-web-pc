<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="formRules" label-width="100px" v-loading="formDataLoading">
      <el-form-item label="标题" prop="title" required>
        <el-input  v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author" required>
        <el-input  v-model="form.author" placeholder="作者、来源"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <SelfDictSelect  v-model="form.status" type="cms_content_status"></SelfDictSelect>
      </el-form-item>
      <el-form-item label="站点" prop="siteId">
        <SiteSelect ref="siteinput"  v-model="form.siteId">
        </SiteSelect>
      </el-form-item>
      <el-form-item label="栏目" prop="channelId">
        <ChannelInputSelect ref="channelinput"  v-model="form.channelId">
        </ChannelInputSelect>
      </el-form-item>
      <el-form-item label="内容" prop="content" >
        <TinymceEditor ref="tinymceeditor"  v-model="form.content"></TinymceEditor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateBtnClick" :loading="addLoading">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import SelfDictSelect from '@/components/SelfDictSelect.vue'
  import SiteSelect from '@/views/cms/site/SiteSelect.vue'
  import ChannelInputSelect from '@/views/cms/channel/ChannelInputSelect.vue'
  import TinymceEditor from '@/components/tinymceEditor/TinymceEditor.vue'

  export default {
    name: 'ContentEdit',
    components: {
      SelfDictSelect,
      SiteSelect,
      ChannelInputSelect,
      TinymceEditor
    },
    data () {
      return {
        // 编辑的id
        id: null,
        form: {
          title: null,
          author: null,
          status: null,
          siteId: null,
          channelId: null,
          content: null,
          updateTime: null
        },
        formDataLoading: false,
        addLoading: false,
        formRules: {
          title: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          siteId: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          channelId: [
            {required: true, message: '必填', trigger: 'blur'}
          ],
          content: [
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
        self.$http.get('/cms/content/' + self.id)
          .then(function (response) {
            let content = response.data.data.content
            self.form.title = content.title
            self.form.author = content.author
            self.form.status = content.status
            self.form.siteId = content.siteId
            self.form.channelId = content.channelId
            self.form.content = content.content
            self.form.updateTime = content.updateAt
            self.formDataLoading = false
            return Promise.resolve(content.channelId)
          }).then(channelId => {
          // 回显父级
            self.$refs.channelinput.initLabelName(channelId)
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
              self.$http.put('/cms/content/' + self.id, self.form)
                .then(function (response) {
                  self.$message.info('内容修改成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  if (response.response.status === 404) {
                    self.$message.error('内容修改失败，数据不存在或已被他人修改，请刷新列表后再试')
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
        this.$refs.tinymceeditor.setContent('')
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
    overflow: auto;
    height: 100%;
  }
</style>
