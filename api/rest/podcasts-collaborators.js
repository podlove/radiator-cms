import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      podcast: {
        username: data.username,
        // one of "own", "manage", "edit", "readonly"
        permission: data.permission
      }
    })
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/podcasts/${data.id}/collaborators`,
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  delete: data => {
    return axios.delete(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/podcasts/${data.id}/collaborators`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  update: data => {
    const query = JSON.stringify({
      network: {
        username: data.username,
        permission: data.permission
      }
    })
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/podcasts/${data.id}/collaborators/${data.username}`,
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  }
}
