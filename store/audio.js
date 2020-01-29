import audio from '~/api/queries/audio.gql'

// An Audio Publication (createAudioPublication)
// or a Podcast Audio (createPodcastAudio) will always be created
// after the file upload (createAudioFile).
// So in the user interface the file upload triggerst
// 1. createAudioPublication or createPodcastAudio and
// 2. createAudioFile.
// 3. createAudioFile will then trigger getAudio to set activeAudio

export const state = () => ({
  activeAudio: null
})

export const mutations = {
  set_active_audio(store, data) {
    store.activeAudio = data
  }
}

export const getters = {
  activeAudio: state => state.activeAudio
}

export const actions = {
  createAudio: async function createAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await this.$api.audio.createAudio(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: res.id
      })
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            id: data.episodeId,
            token: this.$apolloHelpers.getToken()
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  },
  createPodcastAudio: async function createPodcastAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await this.$api.audio.createPodcastAudio(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: res.id
      })
    } catch (e) {
      throw Error(e)
    }
  },
  createAudioFile: async function createAudioFile({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.createAudioFile(data).then(data => {
        return data && data.data
      })
      // use audio publication/podcast audio id for audio request
      const params = await {
        id: data.audioId,
        token: this.$apolloHelpers.getToken()
      }
      await dispatch('getAudio', params)
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            id: data.episodeId,
            token: this.$apolloHelpers.getToken()
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  },
  deleteAudioFile: async function deleteAudioFile({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.deleteAudioFile(data).then(data => {
        return data && data.data
      })
      await dispatch(
        'networks/getNetworks',
        {
          token: this.$apolloHelpers.getToken()
        },
        { root: true }
      )
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            id: data.episodeId,
            token: this.$apolloHelpers.getToken()
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  },
  deleteAudioPublication: async function deleteAudioPublication(
    { dispatch },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.deleteAudioPublication(data).then(data => {
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
  depublishAudioPublication: async function depublishAudioPublication(
    { dispatch },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.depublishAudioPublication(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: data.audioId
      })
    } catch (e) {
      throw Error(e)
    }
  },
  getAudio: async function getAudio({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: audio,
          variables: {
            id: data.id
          },
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => data && data.audio)
      await commit('set_active_audio', res)
    } catch (e) {
      throw Error(e)
    }
  },
  publishAudioPublication: async function publishAudioPublication(
    { dispatch },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.publishAudioPublication(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: data.audioId
      })
    } catch (e) {
      throw Error(e)
    }
  },
  setActiveAudioId({ dispatch }, data) {
    dispatch('getAudio', {
      id: data
    })
  },
  updateAudio: async function updateAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.updateAudio(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: data.audioId
      })
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            id: data.episodeId,
            token: this.$apolloHelpers.getToken()
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  },
  updateAudioPublication: async function updateAudioPublication(
    { dispatch },
    data
  ) {
    data.token = this.$apolloHelpers.getToken()
    try {
      await this.$api.audio.updateAudioPublication(data).then(data => {
        return data && data.data
      })
      return await dispatch('getAudio', {
        id: data.audioId
      })
    } catch (e) {
      throw Error(e)
    }
  }
}
