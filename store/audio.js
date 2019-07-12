import restAudio from '~/api/rest/audio'
import audio from '~/api/queries/audio'

export const state = () => ({
  audio: {}
})

export const mutations = {
  set_audio(store, data) {
    store.audio = data
  }
}

export const getters = {
  audio: state => state.audio
}

export const actions = {
  createAudio: async function createAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    console.log('data', data)
    try {
      const res = await restAudio.createAudio(data).then(data => {
        return data && data.data
      })
      await console.log('res', res)
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
    try {
      const res = await restAudio.createAudioFile(data).then(data => {
        return data && data.data
      })
      console.log('RES createAudioFile', res)
      return await res
      // await dispatch('audio/getAudio', data.id)
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
          }
        })
        .then(({ data }) => data && data.audio)
      await commit('set_audio', res)
    } catch (e) {
      throw Error(e)
    }
  }
}
