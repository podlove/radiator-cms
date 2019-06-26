// import api from '~/api'
import authenticatedSession from '~/api/mutations/authenticatedSession.gql'

export const state = () => ({
  isLoggedIn: null
})

export const mutations = {
  reset_session(store) {
    store.isLoggedIn = false
  },
  set_session(store) {
    store.isLoggedIn = true
  }
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn
}

export const actions = {
  login: async function login({ commit, dispatch }, data) {
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
    } catch (e) {
      throw Error(e)
    }
  },
  logout({ commit }) {
    this.$apolloHelpers.onLogout()
    commit('reset_session')
  },
  setSession({ commit }) {
    commit('set_session')
  }
}
