import axios from 'axios'

export default {
  create: data => {
    const query = new FormData()
    // You can either send a podcast contribution or an audio contribution
    // If the data has an audioID parameter, than its an episode/audio publication contribution
    if (data.audioId) {
      query.append('contribution[audio_id]', data.audioId)
    } else {
      query.append('contribution[podcast_id]', data.podcastId)
    }
    query.append('contribution[contribution_role_id]', data.contributionRoleId)
    query.append('contribution[person_id]', data.personId)
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${
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
  deleteContribution: data => {
    return axios.delete(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/contributions/${data.contributionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  update: data => {
    const query = new FormData()
    query.append('contribution[podcast_id]', data.podcastId)
    query.append('contribution[contribution_role_id]', data.contributionRoleId)
    query.append('contribution[person_id]', data.personId)
    return axios.patch(
      `${process.env.apiBaseUrl}/api/rest/${
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
