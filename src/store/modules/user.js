import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {} || {
    'roles': {
      'menus': [
        'department',
        'role',
        'employee',
        'permission',
        'approval',
        'attendance',
        'salary',
        'social'
      ],
      'points': [
        'add-employee'
      ]
    },
    'companyId': '1',
    'company': '传智播客',
    'userId': 1,
    'mobile': '13800000002',
    'username': '管理员',
    'staffPhoto': 'https://heimahr.itheima.net/defaultHead.png',
    'departmentName': '总裁办',
    'departmentId': 1,
    'base64Img': ''
  }
}
const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}
const actions = {
  async login(context, data) {
    console.log(data)
    // 调用登录接口
    const token = await login(data)
    // 返回token
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    console.log('接口返回数据:', result)
    context.commit('setUserInfo', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
