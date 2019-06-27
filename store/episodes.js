import api from '~/api'
import episode from '~/api/queries/episode.gql'

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
        dispatch('getEpisode', data)
        return response.data.data.createEpisode
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for episodes or errors.')
      }
    })
  },
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
