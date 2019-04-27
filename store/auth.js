import api from '~/api'

export const state = () => ({
  token: null
})

export const mutations = {
  reset_token(store) {
    store.token = null
  },
  set_token(store, data) {
    store.token = data
  }
}

export const actions = {
  login({ commit }, data) {
    return api.auth.login(data).then(response => {
      if (
        response.data.data.authenticatedSession &&
        response.data.data.authenticatedSession.token
      ) {
        commit('set_token', response.data.data.authenticatedSession.token)
        return response.data.data.authenticatedSession.token
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      }
    })
  },
  logout({ commit }) {
    commit('reset_token')
    return Promise.resolve()
  }
}
