<template>
  <div class="wrapper">
    <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
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
        <TinymceEditor ref="tinymceeditor" v-model="form.content"></TinymceEditor>
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
  import SiteSelect from '@/views/cms/site/SiteSelect.vue'
  import ChannelInputSelect from '@/views/cms/channel/ChannelInputSelect.vue'
  import TinymceEditor from '@/components/tinymceEditor/TinymceEditor.vue'

  export default {
    components: {
      SelfDictSelect,
      SiteSelect,
      ChannelInputSelect,
      TinymceEditor
    },
    name: 'ContentAdd',
    data () {
      return {
        form: {
          title: null,
          author: null,
          status: null,
          siteId: null,
          channelId: null,
          content: null
        },
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
    },
    methods: {
      addBtnClick () {
        let self = this
        if (self.addLoading === false) {
          this.$refs['form'].validate((valid) => {
            if (valid) {
              // 请求添加
              self.addLoading = true
              self.$http.post('/cms/content', self.form)
                .then(function (response) {
                  self.$message.info('内容添加成功')
                  self.addLoading = false
                })
                .catch(function (response) {
                  self.$message.error('内容添加失败，请稍后再试')
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
    computed: {
    },
    watch: {
    },
    beforeRouteEnter  (to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        let dataControl = 'ContentAddLoadData=true'
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
  height: 100%;
  overflow-y: auto;
}
</style>
