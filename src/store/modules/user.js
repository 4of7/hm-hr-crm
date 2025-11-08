import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
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
  }
}
const actions = {
  async login(context, data) {
    console.log(data)
    // 调用登录接口
    const token = await login(data)
    // 返回token
    context.commit('setToken', token)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
