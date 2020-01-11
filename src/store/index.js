import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // null、 { token, refresh_token}
    user: JSON.parse(window.localStorage.getItem('user')) // 当前登录用户状态(token)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了避免页面数据丢失，我们这里使用本地存储进行--持久化
      window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
