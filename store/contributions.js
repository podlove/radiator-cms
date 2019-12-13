import restContributions from '~/api/rest/contributions'
import contributionRoles from '~/api/queries/contributionRoles.gql'

export const state = () => ({
  contributionRoles: [
    {
      id: '1',
      isPublic: true,
      title: 'On Air'
    },
    {
      id: '2',
      isPublic: true,
      title: 'Support'
    },
    {
      id: '3',
      isPublic: false,
      title: 'Internal Support'
    }
  ]
})

export const mutations = {
  set_contribution_roles(store, data) {
    store.contributionRoles = data
  }
}

export const getters = {
  contributionRoles: state => state.contributionRoles
}

export const actions = {
  create: async function create({ dispatch }, data) {
    console.log('Create Contribution', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      await restContributions.create(data).then(data => {
        return data && data.data
      })
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.episodeId
          },
          { root: true }
        )
      }
      if (data.audioId) {
        await dispatch(
          'audio/getAudio',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.audioId
          },
          { root: true }
        )
      }
      if (data.podcastId) {
        await dispatch(
          'podcasts/getPodcast',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.podcastId
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  },
  deleteContribution: async function deleteContribution({ dispatch }, data) {
    console.log('Delete Contribution', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      await restContributions.deleteContribution(data).then(data => {
        return data && data.data
      })
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.episodeId
          },
          { root: true }
        )
      }
      if (data.audioId) {
        await dispatch(
          'audio/getAudio',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.audioId
          },
          { root: true }
        )
      }
      if (data.podcastId) {
        await dispatch(
          'podcasts/getPodcast',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.podcastId
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  },
  getContributionRoles: async function getContributionRoles(
    { dispatch, commit },
    data
  ) {
    console.log('GetContributionRoles', data)
    const client = this.app.apolloProvider.defaultClient
    try {
      const res = await client
        .query({
          query: contributionRoles,
          fetchPolicy: 'network-only'
        })
        .then(({ data }) => data && data.podcast)
      console.log('data', data)
      await commit('set_contribution_roles', res)
    } catch (e) {
      throw Error(e)
    }
  },
  update: async function update({ dispatch }, data) {
    console.log('Update Contribution', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restContributions.update(data).then(data => {
        return data && data.data
      })
      console.log('res', res)
      if (data.episodeId) {
        await dispatch(
          'episodes/getEpisode',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.episodeId
          },
          { root: true }
        )
      }
      if (data.audioId) {
        await dispatch(
          'audio/getAudio',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.audioId
          },
          { root: true }
        )
      }
      if (data.podcastId) {
        await dispatch(
          'podcasts/getPodcast',
          {
            token: this.$apolloHelpers.getToken(),
            id: data.podcastId
          },
          { root: true }
        )
      }
    } catch (e) {
      throw Error(e)
    }
  }
}
