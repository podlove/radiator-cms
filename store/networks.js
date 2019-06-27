import api from '~/api'
import network from '~/api/queries/network.gql'
import networks from '~/api/queries/networks.gql'

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

export const getters = {
  network: state => state.network,
  networks: state => state.networks
}

export const actions = {
  create({ dispatch }, data) {
    return api.networks.create(data).then(response => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.createNetwork
      ) {
        dispatch('getNetworks', {
          token: data.token
        })
        return response.data.data.createNetwork
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for networks or errors.')
      }
    })
  },
  getNetwork: async function getNetwork({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: network,
          variables: {
            id: data.id
          }
        })
        .then(({ data }) => data && data.network)
      await commit('set_network', res)
    } catch (e) {
      throw Error(e)
    }
  },
  getNetworks: async function getNetworks({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: networks
        })
        .then(({ data }) => data && data.networks)
      await commit('set_networks', res)
    } catch (e) {
      throw Error(e)
    }
  }
}
