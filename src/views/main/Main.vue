<template>
  <div class="login-bg">
    <div class="login-form-wrapper">
      <form class="form-horizontal login-form">
        <div class="form-group">
          <span class="login-label">登录：</span><span class="login-tip">{{msg}}</span>
        </div>
        <div class="form-group">
          <label class="control-label hidden" for="username">帐号：</label>
          <div class="input-group">
            <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
            <input type="text" id="username" name="principal" class="form-control form-inline" placeholder="帐号">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
            <input type="password" id="password" name="password" class="form-control form-inline" placeholder="密码">
          </div>
        </div>
        <div class="form-group">
          <div class="checkbox">
            <label>
              <input type="checkbox" id="rememberMe" name="rememberMe" placeholder="记住我">记住我
            </label>
          </div>
        </div>
        <div class="form-group">
          <button @click="doLogin" class="btn btn-primary btn-block">登录</button>
        </div>
        <div class="form-group">
          <a href="/admin/module/login/forgetPassword.html">忘记密码了？</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        msg: 'login page'
      }
    },
    methods: {
      doLogin () {
        this.msg = 'qajss了'
        alert(22)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-bg {
    background: url("../../assets/login/bg.jpg") no-repeat;
    background-size: cover;
    height:100%;
    position: relative;
  }
  .login-form-wrapper {
    width: 20rem;
    padding: 2rem 2rem 0 2rem;
    background: rgba(255, 255, 255, 0.2) none repeat scroll 0 0;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .login-label {
    color: rgba(255, 255, 255, 0.95);
  }
  .login-tip{
    color: #a94442;
  }
</style>
