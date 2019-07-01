import restPodcast from '~/api/rest/podcasts'
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
  create: async function create({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restPodcast.create(data).then(data => data && data.data)
      await commit('set_podcast', res)
      await dispatch('getPodcasts', {
        token: this.$apolloHelpers.getToken()
      })
    } catch (e) {
      throw Error(e)
    }
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
