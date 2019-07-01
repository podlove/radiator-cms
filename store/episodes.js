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
  create: async function create({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restEpisode.create(data).then(data => data && data.data)
      await commit('set_episode', res)
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
  }
  // uploadEpisodeAudio({ dispatch }, data) {
  //   return api.episodes.uploadEpisodeAudio(data).then(response => {
  //     if (response) {
  //       console.log('TODO: Get upload episode audio response.')
  //     } else if (response.data.errors) {
  //       throw Error(response.data.errors[0].message)
  //     } else {
  //       throw Error('No data for upload episodes or errors.')
  //     }
  //   })
  // }
}
