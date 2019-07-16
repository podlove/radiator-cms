import feedInfo from '~/api/queries/feedinfo.gql'

export const state = () => ({
  feedInfo: {}
})

export const mutations = {
  set_feedInfo(store, data) {
    console.log(data)
    store.feedInfo = data
  }
}

export const getters = {
  feedInfo: state => state.feedInfo
}

export const actions = {
  catchFeedInfo: async function catchFeedInfo({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient

    try {
      console.log(data)
      const res = await client
        .query({
          query: feedInfo,
          variables: {
            url: data.url
          }
        })
        .then(({ data }) => data.feedInfo)
      await commit('set_feedInfo', res)
    } catch (e) {
      throw Error(e)
    }
  }
}
