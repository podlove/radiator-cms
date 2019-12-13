import restPeople from '~/api/rest/people'

export const actions = {
  create: async function create({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restPeople.create(data).then(data => {
        return data && data.data
      })
      await dispatch(
        'networks/getNetwork',
        {
          token: this.$apolloHelpers.getToken(),
          id: data.networkId
        },
        { root: true }
      )
      return res
    } catch (e) {
      throw Error(e)
    }
  },
  update: async function update({ dispatch }, data) {
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restPeople.update(data).then(data => {
        return data && data.data
      })
      if (data.contributionRoleId) {
        await dispatch(
          'contributions/update',
          {
            token: this.$apolloHelpers.getToken(),
            personId: res.id,
            podcastId: data.podcastId,
            contributionId: data.contributionId,
            contributionRoleId: data.contributionRoleId
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
    } catch (e) {
      throw Error(e)
    }
  }
}
