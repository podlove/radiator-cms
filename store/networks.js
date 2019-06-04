import api from '~/api'

export const state = () => ({
  network: [],
  networks: []
})

export const mutations = {
  set_network(store, data) {
    store.network = data
  },
  set_networks(store, data) {
    store.networks = data
  }
}

export const actions = {
  create({ dispatch }, data) {
    return api.networks.create(data).then(response => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.createNetwork
      ) {
        dispatch('getNetworks')
        return response.data.data.createNetwork
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for networks or errors.')
      }
    })
  },
  getNetwork({ commit }, data) {
    return api.networks.getNetwork(data.id).then(response => {
      if (response.data && response.data.data && response.data.data.network) {
        commit('set_network', response.data.data.network)
        return response.data.data.network
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for network or errors.')
      }
    })
  },
  getNetworks({ commit }) {
    return api.networks.getNetworks().then(response => {
      if (response.data && response.data.data && response.data.data.networks) {
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
