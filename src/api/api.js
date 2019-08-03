import axios from 'axios'

const BASE_URL = `${process.env.API_ROOT}/iam`

let pendingarr = [
  BASE_URL + '/admins/user/new_list/&get',
  BASE_URL + '/admins/user/&get',
  BASE_URL + '/admins/role/&get',
  BASE_URL + '/admins/identify/&get',
  BASE_URL + '/store/maintain/&get'
]
let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken
let removePending = config => {
  for (let p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      // 当当前请求在数组中存在时执行函数体
      pending[p].f() // 执行取消操作
      pending.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}

axios.interceptors.request.use(
  config => {
    config.withCredentials = true
    config.headers = {
      Accept: 'application/json',
      'unique-maker': 'bi-' + localStorage.getItem('time')
    }
    removePending(config) // 在一个ajax发送前执行一下取消操作
    config.cancelToken = new CancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      if (pendingarr.indexOf(config.url + '&' + config.method) !== -1) {
        pending.push({ u: config.url + '&' + config.method, f: c })
      }
    })
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  function (data) {
    removePending(data.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return data
  },
  function (err) {
    if (
      (err.response.status === 401 && window.location.pathname !== '/login') ||
      err.response.data.code === '2010'
    ) {
      window.location.href = `${window.location.origin}/login`
    } else {
      return Promise.reject(err)
    }
  }
)

let api = {
  baseUrl: BASE_URL
}
// 登录
api.login = (params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/login/', params)
    .then(cb)
    .catch(ecb)
}
// 获取当前帐号详情
api.accountInfo = (cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/info/')
    .then(cb)
    .catch(ecb)
}
// 获取企业下拉列表
api.enterpriseList = (cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/enterprise/items/')
    .then(cb)
    .catch(ecb)
}
// 获取角色下拉列表
api.roleList = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/role/items/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 获取用户列表
api.newUserList = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/new_list/', { params: params })
    .then(cb)
    .catch(ecb)
}
api.userList = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 删除用户
api.deleteUser = (params, cb, ecb) => {
  axios
    .delete(BASE_URL + '/admins/user/batch_delete/', { data: params })
    .then(cb)
    .catch(ecb)
}
// 获取用户详情
api.userDetail = (id, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/' + id + '/')
    .then(cb)
    .catch(ecb)
}
// 验证用户名
api.checkUsername = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/check_username/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 验证手机号
api.checkPhone = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/check_phone/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 编辑用户
api.editorUser = (id, params, cb, ecb) => {
  axios
    .put(BASE_URL + '/admins/user/' + id + '/', params)
    .then(cb)
    .catch(ecb)
}
// 新建用户
api.createUser = (params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/', params)
    .then(cb)
    .catch(ecb)
}
// 重置密码
api.resetPwd = (id, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/' + id + '/reset_cm_password/')
    .then(cb)
    .catch(ecb)
}
// 获取角色table列表
api.roleTableLIst = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/role/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 删除角色
api.deleteRole = (params, cb, ecb) => {
  axios
    .delete(BASE_URL + '/admins/role/batch_delete/', { data: params })
    .then(cb)
    .catch(ecb)
}
// 获取产品下拉列表
api.productionList = (cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/product/items/')
    .then(cb)
    .catch(ecb)
}
// 获取功能权限列表
api.permissionList = (id, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/product/' + id + '/')
    .then(cb)
    .catch(ecb)
}
// 获取角色详情
api.roleDetail = (id, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/role/' + id + '/')
    .then(cb)
    .catch(ecb)
}
// 验证角色名是否重复
api.checkRole = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/role/check/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 编辑角色
api.editorRole = (id, params, cb, ecb) => {
  axios
    .put(BASE_URL + '/admins/role/' + id + '/', params)
    .then(cb)
    .catch(ecb)
}
// 创建角色
api.createRole = (params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/role/', params)
    .then(cb)
    .catch(ecb)
}
// 修改密码
api.changePwd = (params, cb, ecb) => {
  axios
    .put(BASE_URL + '/admins/user/change_password/', params)
    .then(cb)
    .catch(ecb)
}
// 上传文件
api.uploadFile = (formData, config, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/upload/', formData, config)
    .then(cb)
    .catch(ecb)
}
// 批量创建用户
api.batchCreateUser = (params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/confirm/', params)
    .then(cb)
    .catch(ecb)
}
// 获取职位下拉列表
api.identityList = (cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/identify/items/')
    .then(cb)
    .catch(ecb)
}
// 获取职位table列表
api.identityTableList = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/identify/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 删除当前职位下的用户
api.deleteIdentityUser = (id, params, cb, ecb) => {
  axios
    .delete(BASE_URL + '/admins/identify/' + id + '/cancel/', { data: params })
    .then(cb)
    .catch(ecb)
}
// 首次登陆修改密码
api.fristChangePwd = (params, cb, ecb) => {
  axios
    .put(BASE_URL + '/admins/user/reset_password/', params)
    .then(cb)
    .catch(ecb)
}
// 添加授权用户
api.accreditUser = (id, params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/identify/' + id + '/user/', params)
    .then(cb)
    .catch(ecb)
}
// 授权选中用户
api.accrediSelectedtUser = (id, params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/role/' + id + '/user/', params)
    .then(cb)
    .catch(ecb)
}
// 取消选中项授权
api.cancelAccrediSelectedtUser = (id, params, cb, ecb) => {
  axios
    .delete(BASE_URL + '/admins/role/' + id + '/cancel/', { data: params })
    .then(cb)
    .catch(ecb)
}
// 获取店铺和品类的信息
api.storeInfo = (id, cb, ecb) => {
  axios
    .get(BASE_URL + '/admins/user/' + id + '/user_data/')
    .then(cb)
    .catch(ecb)
}
// 未选店铺和品类的搜索
api.storeFilter = (id, params, cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/' + id + '/search_data/', params)
    .then(cb)
    .catch(ecb)
}
// 提交店铺和品类信息的修改
api.changeStoreInfo = (id, params, cb, ecb) => {
  axios
    .put(BASE_URL + '/admins/user/' + id + '/update_data/', params)
    .then(cb)
    .catch(ecb)
}
// 门店信息维护（获取门店列表）
api.storeList = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/store/maintain/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 门店信息维护（获取门店状态列表）
api.statusList = (cb, ecb) => {
  axios
    .get(BASE_URL + '/store/maintain/items/')
    .then(cb)
    .catch(ecb)
}
// 门店信息维护（更改门店状态）
api.changeStoreStatus = (id, params, cb, ecb) => {
  axios
    .put(BASE_URL + '/store/maintain/' + id + '/', params)
    .then(cb)
    .catch(ecb)
}
// 登出
api.logout = (cb, ecb) => {
  axios
    .post(BASE_URL + '/admins/user/logout/')
    .then(cb)
    .catch(ecb)
}
// 架构列表
api.structureTableList = (params, cb, ecb) => {
  axios
    .get(BASE_URL + '/enterprise_identity/', { params: params })
    .then(cb)
    .catch(ecb)
}
// 架构职位列表
api.structureIdentityTableList = (id, cb, ecb) => {
  axios
    .get(BASE_URL + '/enterprise_identity/' + id + '/')
    .then(cb)
    .catch(ecb)
}
// 删除架构职位
api.deleteStructureIdentity = (id, cb, ecb) => {
  axios
    .delete(BASE_URL + '/enterprise_identity/identity/' + id + '/')
    .then(cb)
    .catch(ecb)
}
// 架构所属职位下拉列表
api.structureSelectList = (id, params, cb, ecb) => {
  axios
    .get(BASE_URL + '/enterprise_identity/' + id + '/items/', {
      params: params
    })
    .then(cb)
    .catch(ecb)
}
// 用户所属职位下拉列表
api.userIdentitySelectList = (id, params, cb, ecb) => {
  axios
    .get(BASE_URL + '/enterprise_identity/' + id + '/identity_items/', {
      params: params
    })
    .then(cb)
    .catch(ecb)
}
// 职位名称校验
api.checkIdentityName = (id, params, cb, ecb) => {
  axios
    .get(BASE_URL + '/enterprise_identity/' + id + '/check/', {
      params: params
    })
    .then(cb)
    .catch(ecb)
}
// 增加职位
api.addIdentity = (id, params, cb, ecb) => {
  axios
    .post(BASE_URL + '/enterprise_identity/' + id + '/identity/', params)
    .then(cb)
    .catch(ecb)
}
// 职位详情
api.getIdentityDetail = (id, cb, ecb) => {
  axios
    .get(BASE_URL + '/enterprise_identity/identity/' + id + '/')
    .then(cb)
    .catch(ecb)
}
// 修改底层职位
api.editMinIdentityDetail = (id, params, cb, ecb) => {
  axios
    .put(BASE_URL + '/enterprise_identity/identity/' + id + '/', params)
    .then(cb)
    .catch(ecb)
}
// 修改非底层职位
api.editIdentityDetail = (id, params, cb, ecb) => {
  axios
    .put(BASE_URL + '/enterprise_identity/identity/' + id + '/nonsub/', params)
    .then(cb)
    .catch(ecb)
}
// 数据搜索
api.searchIdentityDetailData = (id, params, cb, ecb) => {
  axios
    .post(
      BASE_URL + '/enterprise_identity/identity/' + id + '/search_data/',
      params
    )
    .then(cb)
    .catch(ecb)
}
export default api
