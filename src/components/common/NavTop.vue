<template>
    <div id="navtop">
        <div class="logo">
            <img src="@/assets/images/logo.svg">
        </div>
        <div class="user-logout">
            <a>
                <i class="el-icon-s-custom"></i>
                <span>{{username}}</span>
            </a>
            <a @click="logout" class="logout">
                <i class="el-icon-switch-button"></i>
                <span>退出</span>
            </a>
        </div>
    </div>
</template>

<script type="text/javascript">
// import Api from '@/api/api.js'
export default {
  name: 'navtop',
  data () {
    return {
      username: 'meng'
    }
  },
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
     #navtop {
        width: 100%;
        height: 70px;
        line-height: 70px;
        position: fixed;
        top: 0;
        background: #ffffff;
        border-bottom: 1px solid #eeeeee;
        z-index: 100;
    }
    #navtop>div {
        display: inline-block;
    }
    .logo {
        position: absolute;
        left: 0;
        height: 70px;
        width: 190px;
        border-right: 10px solid #409eff;
        background-color: #409eff;
        text-align: center;
    }
    .logo>img {
        height: 70px;
        width: 120px;
    }
    .user-logout {
        position: absolute;
        right: 20px;
    }
    .user-logout>a {
        display: inline-block;
        /* width: 100px; */
        height: 70px;
        /* text-align: center; */
        cursor: pointer;
        padding-right: 30px;
    }
    .user-logout>a>i {
        text-align: center;
        vertical-align: middle;
        padding-right: 3px;
        font-size: 22px;
        color: #409eff;
    }
    .user-logout>a>span {
        color: #666666;
        font-size: 14px;
    }
    .pwdPopover>span {
        display: inline-block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
</style>
<style type="text/css">
    .el-popover.el-popper.pwdPopover {
        top: 57px !important;
    }
</style>
