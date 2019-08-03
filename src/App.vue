<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.clearfix::after {
  clear: both;
  content: "";
  display: block;
}
.el-table th {
  background-color: #fafafa !important;
}
.el-table thead {
  color: #333333 !important;
}
/* .el-breadcrumb__inner.is-link {
  color: #666666 !important;
  font-weight: normal !important;
} */
.el-input__inner::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.25) !important;
  font-weight: normal !important;
  font-size: 12px !important;
}
.cell-underline {
  color: #409eff;
  cursor: pointer;
}
.cell-underline:hover {
  text-decoration: underline;
}
</style>
