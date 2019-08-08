import { feedInfo, getFeeds } from '~/api/queries/feedinfo.gql'
import restTasks from '~/api/rest/tasks'

export const state = () => ({
  feedInfo: {},
  feeds: {},
  currentTask: {}
})

export const mutations = {
  set_feedInfo(store, data) {
    store.feedInfo = data
  },
  set_feeds(store, data) {
    store.feeds = data
  },
  set_current_task(store, data) {
    store.currentTask = data.id
  },
  reset_current_task(store) {
    store.currentTask = {}
  }
}

export const getters = {
  feedInfo: state => state.feedInfo,
  feeds: state => state.feeds,
  currentTask: state => state.currentTask
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
  },
  createTask: async function createTask({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restTasks.create(data).then(data => data && data.data)
      await commit('set_current_task', res)
    } catch (e) {
      throw Error(e)
    }
  },
  deleteTask: async function deleteTask({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restTasks.delete(data).then(data => data && data.data)
      console.log(res)
      await commit('reset_current_task')
    } catch (e) {
      throw Error(e)
    }
  },
  readTask: async function readTask({ dispatch, commit }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restTasks.read(data).then(data => data && data.data)
      console.log(res)
      // await commit('reset_current_task')
    } catch (e) {
      throw Error(e)
    }
  }
}
