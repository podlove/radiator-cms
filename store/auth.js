import Vue from 'vue'
import authenticatedSession from '~/api/mutations/authenticatedSession.gql'
import prolongSession from '~/api/mutations/prolongSession.gql'
import userSignup from '~/api/mutations/userSignup.gql'

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
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .mutate({
          mutation: authenticatedSession,
          variables: {
            usernameOrEmail: data.username,
            password: data.password
          }
        })
        .then(({ data }) => data && data.authenticatedSession)
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
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .mutate({
          mutation: prolongSession
        })
        .then(({ data }) => data && data.prolongSession)
      await this.$apolloHelpers.onLogin(res.token, undefined, 7)
      await dispatch('setSession')
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
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .mutate({
          mutation: userSignup,
          variables: {
            email: data.email,
            password: data.password,
            username: data.username
          }
        })
        .then(({ data }) => data)
      console.log(res)
    } catch (e) {
      throw Error(e)
    }
  }
}
