import { feedInfo, getFeeds } from '~/api/queries/feedinfo.gql'

export const state = () => ({
  feedInfo: {},
  feeds: {}
})

export const mutations = {
  set_feedInfo(store, data) {
    store.feedInfo = data
  },
  set_feeds(store, data) {
    store.feeds = data
  }
}

export const getters = {
  feedInfo: state => state.feedInfo,
  feeds: state => state.feeds
}

export const actions = {
  catchFeedInfo: async function catchFeedInfo({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient

    try {
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
  },
  fetchFeeds: async function fetchFeeds({ commit }, data) {
    const client = this.app.apolloProvider.defaultClient

    try {
      const res = await client
        .query({
          query: getFeeds,
          variables: {
            url: data.url
          }
        })
        .then(({ data }) => data.feedInfo.feeds)
      await commit('set_feeds', res)
    } catch (e) {
      throw Error(e)
    }
  }
}
