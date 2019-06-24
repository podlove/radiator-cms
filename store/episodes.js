import api from '~/api'

export const state = () => ({
  episode: {}
})

export const mutations = {
  set_episode(store, data) {
    store.episode = data
  }
}

export const actions = {
  create({ dispatch }, data) {
    return api.episodes.create(data).then(response => {
      if (
        response.data &&
        response.data.data &&
        response.data.data.createEpisode &&
        response.data.data.createEpisode.id
      ) {
        // TODO: Upload episode audio file(s).
        //
        // dispatch('uploadEpisodeAudio', {
        //   file: data.file,
        //   token: data.token
        // })
        dispatch('getEpisode', {
          id: response.data.data.createEpisode.id
        })
        return response.data.data.createEpisode
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for episodes or errors.')
      }
    })
  },
  getEpisode({ commit }, data) {
    return api.episodes.getEpisode(data).then(response => {
      if (response.data && response.data.data && response.data.data.episode) {
        commit('set_episode', response.data.data.episode)
        return response.data.data.episode
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for episode or errors.')
      }
    })
  },
  uploadEpisodeAudio({ dispatch }, data) {
    return api.episodes.uploadEpisodeAudio(data).then(response => {
      if (response) {
        console.log('TODO: Get upload episode audio response.')
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for upload episodes or errors.')
      }
    })
  }
}
