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
          podcastId: data.podcastId
        },
        { root: true }
      )
    } catch (e) {
      throw Error(e)
    }
  }
}
