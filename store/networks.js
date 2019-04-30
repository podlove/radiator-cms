import api from '~/api'

export const state = () => ({
  networks: []
})

export const mutations = {
  reset_session(store) {
    store.isLoggedIn = false
    store.username = null
    store.token = null
  },
  set_session(store, data) {
    store.isLoggedIn = true
    store.username = data.username
    store.token = data.token
  }
}

export const actions = {
  getNetworks() {
    return api.networks.getNetworks().then(response => {
      console.log(response)
    })
  }
}
