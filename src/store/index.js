import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    clearUser(state) {
      state.user = null
      window.localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
