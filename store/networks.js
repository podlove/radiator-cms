import restNetwork from '~/api/rest/networks'
import restNetworkCollaborators from '~/api/rest/networks-collaborators'
import network from '~/api/queries/network.gql'
import networks from '~/api/queries/networks.gql'

export const state = () => ({
  activeNetwork: null,
  networks: [],
  networksCollaborators: []
})

export const mutations = {
  set_active_network(store, data) {
    store.activeNetwork = data
  },
  set_networks(store, data) {
    store.networks = data
  },
  set_networks_collaborators(store, data) {
    store.networksCollaborators = data
  },
  resetState(store) {
    Object.assign(store, {
      activeNetwork: null,
      networks: [],
      networksCollaborators: []
    })
  }
}

export const getters = {
  activeNetwork: state => state.activeNetwork,
  networks: state => state.networks,
  networksCollaborators: state => state.networksCollaborators
}

export const actions = {
  /**
   * Creates a new network.
   * After successful creation:
   * saves the response as network in store,
   * dispatches action to get all networks.
   */
  create: async function create({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restNetwork.create(data).then(data => {
        return data && data.data
      })
      await commit('set_active_network', res)
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
    } catch (e) {
      throw Error(e)
    }
  },
  createNetworkCollaborator: async function createNetworkCollaborator(
    { dispatch },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await restNetworkCollaborators.create(data).then(data => {
        return data && data.data
      })
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
    } catch (e) {
      throw Error(e)
    }
  },
  deleteNetwork: async function deleteNetwork({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await restNetwork.delete(data).then(data => {
        return data && data.data
      })
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
    } catch (e) {
      throw Error(e)
    }
  },
  /**
   * Gets a network by id.
   * After successful request saves the network in store.
   */
  getNetwork: async function getNetwork({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: network,
          variables: {
            id: data.id
          },
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => data && data.network)
      await commit('set_active_network', res)
    } catch (e) {
      throw Error(e)
    }
  },
  /**
   * Gets all networks and saves them in store.
   */
  getNetworks: async function getNetworks({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: networks,
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => data && data.networks)
      await commit('set_networks', res)
    } catch (e) {
      throw Error(e)
    }
  },
  setActiveNetworkId: async function setActiveNetworkId(
    { dispatch, commit, state },
    data
  ) {
    let networks = null
    // Check if there are networks and get them if there are none
    if (state.networks && state.networks.length) {
      networks = state.networks
    } else {
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
      networks = state.networks
    }
    // Set active network
    if (networks) {
      for (const network of networks) {
        if (network.id === data) {
          commit('set_active_network', network)
        }
      }
    }
  },
  update: async function update({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restNetwork.update(data).then(data => {
        return data && data.data
      })
      await commit('set_active_network', res)
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
    } catch (e) {
      throw Error(e)
    }
  },
  updateCollaborator: async function updateCollaborator(
    { dispatch, commit },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restNetwork.update(data).then(data => {
        return data && data.data
      })
      await commit('set_active_network', res)
      await dispatch('getNetworks', {
        token: this.$apolloHelpers.getToken()
      })
    } catch (e) {
      throw Error(e)
    }
  },
  resetNetworkState: function resetNetworkState({ commit }) {
    commit('resetState')
  }
}
