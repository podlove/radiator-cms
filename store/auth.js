import Vue from 'vue'

export const state = () => ({
  isLoggedIn: null
})

export const mutations = {
  reset_session(store) {
    Vue.set(store, 'isLoggedIn', false)
  },
  set_session(store, data) {
    Vue.set(store, 'isLoggedIn', true)
  }
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn
}

export const actions = {
  /**
   * User login
   * ----------
   * After successful login use Apollo to set token
   * and dispatch actions to get networks
   * and podcasts from backend.
   */
  login: async function login({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await this.$api.auth.login(data).then(data => {
        return data && data.data
      })
      await this.$apolloHelpers.onLogin(res.token, undefined, 7)
      await dispatch('setSession')
      await dispatch(
        'networks/getNetworks',
        {
          token: res.token
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  },
  /**
   * User logout with Apollo
   * and mutate session information in store.
   */
  logout({ commit }) {
    this.$apolloHelpers.onLogout()
    commit('reset_session')
  },
  renewToken: async function renewToken({ dispatch }) {
    const token = this.$apolloHelpers.getToken()
    try {
      const res = await this.$api.auth
        .prolongSession({ token: token })
        .then(data => {
          return data && data.data
        })
      await this.$apolloHelpers.onLogin(res.token, undefined, 7)
      await dispatch('setSession')
    } catch (e) {
      throw Error(e)
    }
  },
  resendEmail: async function resendEmail({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.auth.resendVerificationEmail(data).then(data => {
        return data && data.data
      })
    } catch (e) {
      throw Error(e)
    }
  },
  resetPassword: async function resetPassword({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.auth.resetPassword(data).then(data => {
        return data && data.data
      })
    } catch (e) {
      throw Error(e)
    }
  },
  /**
   * Can be used to make the store be aware
   * that a user is logged in.
   * Is used by middleware, that checks the token with Apollo
   * and then sets the session.
   */
  setSession({ commit }) {
    commit('set_session')
  },
  signup: async function signup({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.auth.signUp(data).then(data => {
        return data && data.data
      })
    } catch (e) {
      throw Error(e)
    }
  }
}
