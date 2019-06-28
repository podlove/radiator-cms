import restNetwork from '~/api/rest/networks'
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
  create: async function create({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restNetwork.create(data).then(data => {
        return data && data.data
      })
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
      await commit('set_network', res)
    } catch (e) {
      throw Error(e)
    }
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
