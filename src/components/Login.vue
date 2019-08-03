<template>
  <div id="login">
    <div class="bg">
      <img src="@/assets/images/login_bg.jpg">
    </div>
    <div class="con">
      <div class="logo">
        <img src="@/assets/images/login_logo.png">
      </div>
      <div class="form">
        <p class="title">管理员登录</p>
        <div class="input-con">
          <input type="password"
                 style="display: none;" />
          <el-input placeholder="用户名／手机号"
                    prefix-icon="el-icon-mobile-phone"
                    v-model="username"
                    auto-complete="off"></el-input>
          <el-input type="password"
                    placeholder="密码"
                    prefix-icon="el-icon-goods"
                    v-model="password"
                    style="margin-top: 30px;"
                    auto-complete="new-password"></el-input>
          <p class="error-hint">{{errorHintMsg}}</p>
        </div>
        <div class="login-btn disabled"
             v-if="isEmpty">登录</div>
        <div class="login-btn active"
             v-else
             @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Api from '@/api/api.js'

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      errorHintMsg: ''
    }
  },
  computed: {
    isEmpty () {
      return (this.username === '' || this.password === '')
    }
  },
  methods: {
    login () {
      console.log('登陆')
      this.$router.push('/operation/categary')
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  background: rgba(232, 232, 232, 0.18);
  > .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  > .con {
    width: 250px;
    position: absolute;
    top: 140px;
    left: 50%;
    margin-left: -125px;
    z-index: 100;
    > .logo {
      width: 100%;
      text-align: center;
      > img {
        width: 109px;
        height: 38px;
      }
    }
    > .form {
      > .title {
        font-size: 14px;
        font-family: PingFangSC-Medium;
        color: rgba(51, 51, 51, 1);
        margin-top: 40px;
      }
      > .input-con {
        margin-top: 20px;
        > .error-hint {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          color: rgba(247, 98, 96, 1);
          margin-top: 8px;
        }
      }
      > .login-btn {
        width: 294px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        border-radius: 2px;
        margin-top: 30px;
        cursor: pointer;
        &.active {
          background-color: #409eff;
          color: #ffffff;
        }
        &.active:hover {
          opacity: 0.8;
        }
        &.disabled {
          background-color: #f5f5f5;
          color: #666666;
          border: 1px solid #d9d9d9;
        }
      }
    }
  }
}
</style>
<style type="text/css">
#login .el-input {
  width: 294px;
}
#login .el-input__inner {
  height: 32px !important;
  line-height: 12px !important;
  font-size: 12px !important;
  padding-top: 8px !important;
  padding-bottom: 9px !important;
}
</style>
