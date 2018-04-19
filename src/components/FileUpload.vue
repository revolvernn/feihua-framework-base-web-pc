<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%">

    <el-upload
      ref="upload"
      class="avatar-uploader"
      :action="$config.file.uploadUrl"
      :data="dataParam"
      :accept="accept"
      :limit="limit"
      name="file"
      :show-file-list="true"
      list-type="picture-card"
      :auto-upload="false"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :on-error="handleError"
      :on-exceed="onExceed"
      :before-upload="beforeUpload">
      <i slot="trigger" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'FileUpload',
    props: {
      // 上传时附带的额外参数,可以传path和fileType两个参数，其中fileType可选值为file_type_export或file_type_upload
      data: null,
      // 接受上传的文件类型
      accept: null,
      // 最大允许上传个数
      limit: {
        default: 1
      },
      // 上传成功回调
      onSuccess: null,
      // 弹窗标题
      title: {
        default: '文件上传'
      }
    },
    data () {
      return {
        dialogVisible: false,
        disabled: false
      }
    },
    mounted () {
    },
    computed: {
      dataParam () {
        if (!this.data) {
          return {path: 'upload', fileType: 'file_type_upload'}
        }
      }
    },
    methods: {
      show () {
        this.dialogVisible = true
      },
      hide () {
        this.dialogVisible = false
      },
      submit () {
        this.$refs.upload.submit()
      },
      handleSuccess (res, file, fileList) {
        if (this.onSuccess && typeof this.onSuccess === 'function') {
          this.onSuccess(res, file, fileList)
        }
        this.clearFiles()
      },
      handleError (error, file, fileList) {
        if (error) {
          this.$message.error('文件上传失败，请稍候再试')
          this.clearFiles()
        }
      },
      beforeUpload (file) {
      },
      handleChange (file, fileList) {
      },
      onExceed () {
        this.$message.error('文件超出限制个数')
      },
      clearFiles () {
        this.$refs.upload.clearFiles()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    text-align: center;
  }

</style>
<style>
  .avatar-uploader .el-upload__input{
    display: none;
  }
</style>
