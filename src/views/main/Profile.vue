<template>
  <el-row>
    <el-col :span="8">
      <img class="head-pic" @click="showFileUpload" :src="headPic"/>
    </el-col>
    <el-col :span="16">
      <el-row>
        <el-col :span="18" style="font-size: 0.75rem;color:azure;overflow: hidden;">
          <i class="glyphicon glyphicon-user"></i>&nbsp;<template v-if="loginUser"> {{loginUser.nickname}}</template>
          <br>
          <i class="glyphicon glyphicon-lock"></i>&nbsp;<template v-if="loginUser">{{loginUser.additionalAttr.role.name}}</template>
        </el-col>
        <el-col :span="6">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-setting" style="color: rgb(255, 255, 255);"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <br/>
          <el-badge :value="0" :max="99" class="item message">
            <i class="el-icon-bell"></i>
          </el-badge>
        </el-col>
      </el-row>
    </el-col>
    <file-upload ref="fileupload" :on-success="uploadSuccess" :data="{path: 'userHeader'}" accept="image/gif, image/jpeg, image/png" :limit="1" title="头像上传"></file-upload>
    <UserUpdatePasswordCurrent ref="updatepasswordDialog"></UserUpdatePasswordCurrent>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import FileUpload from '@/components/FileUpload.vue'
  import UserUpdatePasswordCurrent from '@/views/user/UserUpdatePasswordCurrent.vue'
  export default {
    components: {FileUpload, UserUpdatePasswordCurrent},
    name: 'Profile',
    data () {
      return {
      }
    },
    methods: {
      handleCommand (cmmand) {
        let self = this
        self[cmmand].call(this)
      },
      logout () {
        let self = this
        this.$http.post('/logout').then(response => {
          self.$router.push('/Login')
        }).catch(() => {
          self.$router.push('/Login')
        })
      },
      updatePassword () {
        this.$refs.updatepasswordDialog.show()
      },
      showFileUpload () {
        this.$refs.fileupload.show()
      },
      uploadSuccess (res, file, fileList) {
        let content = res.data.content
        let self = this
        self.$http.put('/base/user/photo/current', {photoUrl: content.path})
          .then(response => {
            self.$store.commit('setLoginUserPhoto', content.path)
            self.$message.success('头像上传成功')
            this.$refs.fileupload.hide()
          }).catch(() => {
            self.$message.error('头像上传失败，请重新尝试')
          })
        // 修改头像信息
      }
    },
    computed: {
      ...mapGetters([
        'loginUser'
      ]),
      headPic () {
        if (this.loginUser && this.loginUser.photo) {
          return this.$config.file.downloadUrl + this.loginUser.photo
        } else {
          return require('@/assets/index/headPic.jpg')
        }
      }
    },
    watch: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head-pic{
    width: 85%;
    height: 85%;
    border: none;
    border-radius: 50%;
  }
  .head-pic:hover{
    cursor: pointer;
  }
  .message:hover{
    cursor: pointer;
  }
</style>
