import api from '~/api'

export const state = () => ({
  podcasts: []
})

export const mutations = {
  set_podcasts(store, data) {
    store.podcasts = data
  }
}

export const actions = {
  getPodcasts({ commit }) {
    return api.podcasts.getPodcasts().then(response => {
      if (response.data.data.podcasts) {
        commit('set_podcasts', response.data.data.podcasts)
        return response.data.data.podcasts
      } else if (response.data.errors) {
        throw Error(response.data.errors[0].message)
      } else {
        throw Error('No data for podcasts or errors.')
      }
    })
  }
}
