import episode from '~/api/queries/episode.gql'
import restEpisode from '~/api/rest/episodes'

export const state = () => ({
  episode: {}
})

export const mutations = {
  set_episode(store, data) {
    store.episode = data
  }
}

export const getters = {
  episode: state => state.episode
}

export const actions = {
  /**
   * Creates a new episode.
   * After successful creating,
   * tries to upload the episode audio
   * and saves the episode response in store.
   */
  create: async function create({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restEpisode.create(data).then(data => data && data.data)
      await commit('set_episode', res)
      // Set episode data for uploading audio into episode
      // data.episodeId = res.id
      // await dispatch('createEpisodeAudio', data)
    } catch (e) {
      throw Error(e)
    }
  },

  /**
   * Gets an episode by id and saves the episode data in store.
   */
  getEpisode: async function getEpisode({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: episode,
          variables: {
            id: data.id
          }
        })
        .then(({ data }) => data && data.episode)
      await commit('set_episode', res)
    } catch (e) {
      throw Error(e)
    }
  },
  createEpisodeAudio: async function createEpisodeAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restEpisode.createAudio(data).then(data => {
        return data && data.data
      })
      const params = await {
        title: data.title,
        file: data.file,
        id: res.id,
        token: this.$apolloHelpers.getToken()
      }
      await dispatch('uploadEpisodeAudio', params)
    } catch (e) {
      throw Error(e)
    }
  },
  uploadEpisodeAudio: async function uploadEpisodeAudio({ dispatch }, data) {
    try {
      const res = await restEpisode.uploadAudio(data).then(data => {
        return data && data.data
      })
      console.log('RES uploadEpisodeAudio', res)
      await dispatch(
        'podcasts/getPodcasts',
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
