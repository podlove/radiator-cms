import restAudio from '~/api/rest/audio'

export const actions = {
  createAudio: async function createAudio({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restAudio.createAudio(data).then(data => {
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
    try {
      const res = await restAudio.createAudioFile(data).then(data => {
        return data && data.data
      })
      return await res
    } catch (e) {
      throw Error(e)
    }
  }
}
