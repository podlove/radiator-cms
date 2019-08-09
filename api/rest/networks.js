import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      network: {
        title: data.title
      }
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/networks`,
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
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/networks/${
        data.networkId
      }`,
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
    if (data.title) {
      query.append('network[title]', data.title)
    }
    if (data.image) {
      query.append('network[image]', data.image)
    }
    return axios.put(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/networks/${
        data.networkId
      }`,
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
