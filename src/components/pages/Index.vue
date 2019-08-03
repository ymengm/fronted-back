<template>
  <div id="index">
    <el-header class="my-header"
               style="height: 70px;">
      <NavTop></NavTop>
    </el-header>
    <el-container class="my-container">
      <div>
        <el-aside class="my-menu"
                  style="width: 200px;">
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409eff"
            :router="true">
            <el-menu-item index="/operation/categary" :class="$route.name === 'categary' ? 'is-active': ''">
              <i class="el-icon-menu"></i>
              <span slot="title">分类</span>
            </el-menu-item>
            <el-menu-item index="/operation/game" :class="$route.path.indexOf('/game') !== -1 ? 'is-active': ''">
              <i class="el-icon-medal"></i>
              <span slot="title">比赛</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="my-main">
          <router-view />
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import NavTop from '@/components/common/NavTop'

export default {
  name: 'index',
  components: {
    NavTop
  }
}
</script>

<style lang="less" scoped>
.my-header {
  width: 100%;
  padding: 0;
}
.my-container {
  width: 100%;
  > div {
    width: 100%;
  }
  .my-menu {
    position: fixed;
    left: 0;
    margin-top: 20px;
    .is-active {
      color: #409eff !important;
    }
  }
  .my-main {
    padding: 20px 20px 0 220px;
    width: 100%;
    height: 100%;
  }
}
</style>
