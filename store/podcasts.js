import podcast from '~/api/queries/podcast.gql'

export const state = () => ({
  activePodcast: {},
  podcastsCollaborators: []
})

export const mutations = {
  set_active_podcast(store, data) {
    store.activePodcast = data
  },
  set_podcasts_collaborators(store, data) {
    store.podcastsCollaborators = data
  }
}

export const getters = {
  activePodcast: state => state.activePodcast,
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
      const res = await this.$api.podcasts
        .create(data)
        .then(data => data && data.data)
      await dispatch('getPodcast', {
        id: res.id
      })
      await dispatch(
        'networks/getNetworks',
        {
          token: this.$apolloHelpers.getToken()
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  },
  createPodcastCollaborator: async function createPodcastCollaborator(
    { dispatch },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.podcastsCollaborators.create(data).then(data => {
        return data && data.data
      })
      await dispatch(
        'networks/getNetworks',
        {
          token: this.$apolloHelpers.getToken()
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  },
  deletePodcast: async function deletePodcast({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.podcasts.delete(data).then(data => {
        return data && data.data
      })
      await dispatch(
        'networks/getNetworks',
        {
          token: this.$apolloHelpers.getToken()
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  },
  depublishPodcast: async function depublishPodcast(app, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.depublishPodcast(data).then(data => {
        return data && data.data
      })
      await app.dispatch('getPodcast', {
        id: data.podcastId
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
          fetchPolicy: 'network-only',
          variables: {
            id: data.id
          }
        })
        .then(({ data }) => data && data.podcast)
      await commit('set_active_podcast', res)
    } catch (e) {
      throw Error(e)
    }
  },
  publishPodcast: async function publishPodcast({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.publishPodcast(data).then(data => {
        return data && data.data
      })
      await dispatch('getPodcast', {
        id: data.podcastId
      })
    } catch (e) {
      throw Error(e)
    }
  },
  setActivePodcastId({ dispatch }, data) {
    dispatch('getPodcast', {
      id: data
    })
  },
  update: async function update({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.podcasts.update(data).then(data => {
        return data && data.data
      })
      await dispatch('getPodcast', {
        id: data.podcastId
      })
      await dispatch(
        'networks/getNetworks',
        {
          token: this.$apolloHelpers.getToken()
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  }
}
