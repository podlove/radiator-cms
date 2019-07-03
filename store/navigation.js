export const state = () => ({
  activeNetwork: null,
  activePodcastId: null,
  activeEpisodeId: null
})

export const mutations = {
  set_active_network(store, id, networks) {
    if (networks) {
      store.activeNetwork = networks.find(element => {
        return element.id === id
      })
    }
  },
  set_active_podcast(store, data) {
    store.activePodcastId = data
  },
  set_active_episode(store, data) {
    store.activeEpisodeId = data
  }
}

export const getters = {
  getActiveEpisodeId: state => state.activeEpisodeId,
  getActiveNetworkId: state => state.activeNetworkId,
  getActivePodcastId: state => state.activePodcastId
}

export const actions = {
  setActiveNetwork({ commit, rootState }, payload) {
    commit('set_active_network', payload, rootState.networks.networks)
  },
  setActivePodcast({ commit }, data) {
    commit('set_active_podcast', data)
  },
  setActiveEpisode({ commit }, data) {
    commit('set_active_episode', data)
  }
}
