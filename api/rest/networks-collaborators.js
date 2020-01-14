import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      username: data.username,
      // one of "own", "manage", "edit", "readonly",
      permisssion: data.permisssion
    })
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/networks/${data.id}/collaborators`,
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
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/networks/${data.id}/collaborators/${data.username}`,
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
        permisssion: data.permisssion
      }
    })
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/networks/${data.id}/collaborators/${data.username}`,
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
