import restPeople from '~/api/rest/people'

export const actions = {
  create: async function create({ dispatch }, data) {
    console.log('Create Person', data)
    data.token = this.$apolloHelpers.getToken()
    try {
      const res = await restPeople.create(data).then(data => {
        return data && data.data
      })
      await dispatch('getAudio', {
        id: res.id
      })
    } catch (e) {
      throw Error(e)
    }
  }
}
