import api from '~/api'

export const state = () => ({
  isLoggedIn: null,
  username: null,
  token: null
})

export const mutations = {
  reset_session(store) {
    store.isLoggedIn = false
    store.username = null
    store.token = null
    this.$router.push('/')
  },
  set_session(store, data) {
    store.isLoggedIn = true
    store.username = data.username
    store.token = data.token
  }
}

export const actions = {
  login({ commit, dispatch }, data) {
    return api.auth.login(data).then(response => {
      if (
        response.data.data.authenticatedSession &&
        response.data.data.authenticatedSession.token
      ) {
        commit('set_session', response.data.data.authenticatedSession)
        dispatch('networks/getNetworks', null, { root: true })
        dispatch('podcasts/getPodcasts', null, { root: true })
        return response.data.data.authenticatedSession
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for authenticatedSession or errors.')
      }
    })
  },
  logout({ commit }) {
    commit('reset_session')
    return Promise.resolve()
  }
}
