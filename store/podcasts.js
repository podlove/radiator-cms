import api from '~/api'
import podcast from '~/api/queries/podcast.gql'
import podcasts from '~/api/queries/podcasts.gql'

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

export const getters = {
  podcast: state => state.podcast,
  podcasts: state => state.podcasts
}

export const actions = {
  create({ dispatch }, data) {
    return api.podcasts.create(data).then(response => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.createPodcast
      ) {
        dispatch('getPodcasts', data)
        return response.data.data.createPodcast
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for podcasts or errors.')
      }
    })
  },
  getPodcast: async function getPodcast({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: podcast,
          variables: {
            id: data.id
          }
        })
        .then(({ data }) => data && data.podcast)
      await commit('set_podcast', res)
    } catch (e) {
      throw Error(e)
    }
  },
  getPodcasts: async function getPodcasts({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: podcasts
        })
        .then(({ data }) => data && data.podcasts)
      await commit('set_podcasts', res)
    } catch (e) {
      throw Error(e)
    }
  }
}
