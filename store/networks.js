import api from '~/api'

export const state = () => ({
  networks: []
})

export const mutations = {
  set_networks(store, data) {
    store.networks = data
  }
}

export const actions = {
  getNetworks({ commit }) {
    return api.networks.getNetworks().then(response => {
      if (response.data.data.networks) {
        commit('set_networks', response.data.data.networks)
        return response.data.data.networks
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for networks or errors.')
      }
    })
  }
}
