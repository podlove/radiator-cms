// import restContributions from '~/api/rest/contributions'
import contributionRoles from '~/api/queries/contributionRoles.gql'

export const state = () => ({
  contributionRoles: []
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
      await dispatch('getContributionRoles')
      // const res = await restContributions.create(data).then(data => {
      //   return data && data.data
      // })
      // console.log('res', res)
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
  }
}
