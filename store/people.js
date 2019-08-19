import restPeople from '~/api/rest/people'

export const actions = {
  create: async function create({ dispatch }, data) {
    console.log('Create Person', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restPeople.create(data).then(data => {
        return data && data.data
      })
      console.log('res', res)
      await dispatch(
        'contributions/create',
        {
          token: this.$apolloHelpers.getToken(),
          personId: res.id,
          podcastId: data.podcastId,
          contributionRoleId: data.contributionRoleId
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  },
  update: async function update({ dispatch }, data) {
    console.log('Update Person', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restPeople.update(data).then(data => {
        return data && data.data
      })
      console.log('res', res)
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
      await dispatch(
        'podcasts/getPodcast',
        {
          token: this.$apolloHelpers.getToken(),
          id: data.podcastId
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  }
}
