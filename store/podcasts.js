import restPodcast from '~/api/rest/podcasts'
import podcast from '~/api/queries/podcast.gql'
import podcasts from '~/api/queries/podcasts.gql'

export const state = () => ({
  podcast: {},
  podcasts: [],
  podcastsCollaborators: []
})

export const mutations = {
  set_podcast(store, data) {
    store.podcast = data
  },
  set_podcasts(store, data) {
    store.podcasts = data
  },
  set_podcasts_collaborators(store, data) {
    store.podcastsCollaborators = data
  }
}

export const getters = {
  podcast: state => state.podcast,
  podcasts: state => state.podcasts,
  podcastsCollaborators: state => state.podcastsCollaborators
}

export const actions = {
  /**
   * Creates a new podcast.
   * After successful creation:
   * saves the response as podcast in store,
   * dispatches action to get all podcasts.
   */
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
  /**
   * Gets a podcast by id.
   * After successful request saves the podcast in store.
   */
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
  /**
   * Gets all podcasts and saves them in store.
   */
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
