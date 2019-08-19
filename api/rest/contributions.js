import axios from 'axios'

export default {
  create: data => {
    console.log('rest', data)
    const query = new FormData()
    query.append('contribution[podcast_id]', data.podcastId)
    query.append('contribution[contribution_role_id]', data.contributionRoleId)
    query.append('contribution[person_id]', data.personId)
    return axios.post(
      `${process.env.baseUrl}/api/rest/${
        process.env.backendVersion
      }/contributions`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  update: data => {
    console.log('update', data)
    const query = new FormData()
    query.append('contribution[podcast_id]', data.podcastId)
    query.append('contribution[contribution_role_id]', data.contributionRoleId)
    query.append('contribution[person_id]', data.personId)
    return axios.patch(
      `${process.env.baseUrl}/api/rest/${
        process.env.backendVersion
      }/contributions/${data.contributionId}`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  }
}
