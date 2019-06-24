import api from '~/api'

export const state = () => ({
  podcast: {},
  podcasts: []
})

export const mutations = {
  set_podcast(store, data) {
    store.podcast = data
  },
  set_podcasts(store, data) {
    store.podcasts = data
  }
}

export const actions = {
  create({ dispatch }, data) {
    return api.podcasts.create(data).then(response => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.createPodcast
      ) {
        dispatch('getPodcasts')
        return response.data.data.createPodcast
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for podcasts or errors.')
      }
    })
  },
  getPodcast({ commit }, data) {
    return api.podcasts.getPodcast(data).then(response => {
      if (response.data && response.data.data && response.data.data.podcast) {
        commit('set_podcast', response.data.data.podcast)
        return response.data.data.podcast
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for podcast or errors.')
      }
    })
  },
  getPodcasts({ commit }, data) {
    return api.podcasts.getPodcasts(data).then(response => {
      if (response.data && response.data.data && response.data.data.podcasts) {
        commit('set_podcasts', response.data.data.podcasts)
        return response.data.data.podcasts
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for podcasts or errors.')
      }
    })
  }
}
