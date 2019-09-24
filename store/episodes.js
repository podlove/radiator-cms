import episode from '~/api/queries/episode.gql'
import restEpisode from '~/api/rest/episodes'

export const state = () => ({
  activeEpisode: null,
  episodeChapters: [],
  episodeTranscripts: []
})

export const mutations = {
  set_active_episode(store, data) {
    store.activeEpisode = data
  },
  set_episode_chapters(store, data) {
    store.episodeChapters = data
  },
  set_episode_transcripts(store, data) {
    store.episodeTranscripts = data
  }
}

export const getters = {
  activeEpisode: state => state.activeEpisode,
  episodeChapters: state => state.episodeChapters,
  episodeTranscripts: state => state.episodeTranscripts
}

export const actions = {
  /**
   * Creates a new episode.
   * After successful creating,
   * tries to upload the episode audio
   * and saves the episode response in store.
   */
  create: async function create({ dispatch, commit }, data) {
    console.log('2', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restEpisode.create(data).then(data => data && data.data)
      await commit('set_active_episode', res)
    } catch (e) {
      throw Error(e)
    }
  },
  createEpisodeChapterMarks: async function createEpisodeChapterMarks(
    { commit },
    data
  ) {
    await commit('set_episode_chapters', data)
  },
  createEpisodeTranscripts: async function createEpisodeTranscripts(
    { commit },
    data
  ) {
    await commit('set_episode_transcripts', data)
  },
  /**
   * Gets an episode by id and saves the episode data in store.
   */
  getEpisode: async function getEpisode({ commit }, data) {
    console.log('get episode', data)
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
      await commit('set_active_episode', res)
    } catch (e) {
      throw Error(e)
    }
  },
  setActiveEpisodeId({ dispatch }, data) {
    dispatch('getEpisode', {
      id: data
    })
  },
  update: async function updateEpisode({ commit }, data) {
    console.log('Update Episode', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restEpisode.update(data).then(data => data && data.data)
      await commit('set_active_episode', res)
    } catch (e) {
      throw Error(e)
    }
  }
}
