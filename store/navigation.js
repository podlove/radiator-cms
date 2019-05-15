export const state = () => ({
  activeNetworkId: null,
  activePodcastId: null,
  activeEpisodeId: null
})

export const mutations = {
  set_active_network(store, data) {
    store.activeNetworkId = data
  },
  set_active_podcast(store, data) {
    store.activePodcastId = data
  },
  set_active_episode(store, data) {
    store.activeEpisodeId = data
  }
}

export const actions = {
  setActiveNetwork({ commit }, data) {
    commit('set_active_network', data)
  },
  setActivePodcast({ commit }, data) {
    commit('set_active_podcast', data)
  },
  setActiveEpisode({ commit }, data) {
    commit('set_active_episode', data)
  }
}
