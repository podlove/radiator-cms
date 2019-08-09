import restAudio from '~/api/rest/audio'
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
    console.log('Create Audio', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restAudio.createAudio(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: res.id
      })
    } catch (e) {
      throw Error(e)
    }
  },
  createPodcastAudio: async function createPodcastAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restAudio.createPodcastAudio(data).then(data => {
        return data && data.data
      })
      const params = await {
        title: data.title,
        file: data.file,
        id: res.id,
        token: this.$apolloHelpers.getToken()
      }
      return await dispatch('createAudioFile', params)
    } catch (e) {
      throw Error(e)
    }
  },
  createAudioFile: async function createAudioFile({ dispatch }, data) {
    console.log('Create Audio File', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      await restAudio.createAudioFile(data).then(data => {
        return data && data.data
      })
      // use audio publication/podcast audio id for audio request
      const params = await {
        id: data.audioId,
        token: this.$apolloHelpers.getToken()
      }
      return await dispatch('getAudio', params)
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
      await restAudio.deleteAudioPublication(data).then(data => {
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
  getAudio: async function getAudio({ commit }, data) {
    console.log('Getting GQL Audio', data)
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: audio,
          variables: {
            id: data.id
          }
        })
        .then(({ data }) => data && data.audio)
      await commit('set_active_audio', res)
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
    console.log('Upadte Audio', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      await restAudio.updateAudio(data).then(data => {
        return data && data.data
      })
      return await dispatch('getAudio', {
        id: data.id
      })
    } catch (e) {
      throw Error(e)
    }
  },
  updateAudioPublication: async function updateAudioPublication(
    { dispatch },
    data
  ) {
    console.log('Upadte Audio Publication', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      await restAudio.updateAudioPublication(data).then(data => {
        return data && data.data
      })
      return await dispatch('getAudio', {
        id: data.id
      })
    } catch (e) {
      throw Error(e)
    }
  }
}
