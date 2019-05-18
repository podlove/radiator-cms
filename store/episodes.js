import api from '~/api'

export const state = () => ({
  episode: {}
})

export const mutations = {
  set_episode(store, data) {
    store.episode = data
  }
}

export const actions = {
  create({ dispatch }, data) {
    return api.episodes.create(data).then(response => {
      if (
        response.data.data.createEpisode &&
        response.data.data.createEpisode.id
      ) {
        dispatch('getEpisode', {
          id: response.data.data.createEpisode.id
        })
        return response.data.data.createEpisode
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for episodes or errors.')
      }
    })
  },
  getEpisode({ commit }, data) {
    return api.episodes.getEpisode(data.id).then(response => {
      if (response.data && response.data.data && response.data.data.episode) {
        commit('set_episode', response.data.data.episode)
        return response.data.data.episode
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for episode or errors.')
      }
    })
  }
}
