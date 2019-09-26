import axios from 'axios'

export default {
  create: data => {
    const query = new FormData()
    if (data.title) {
      query.append('network[title]', data.title)
    }
    if (data.image) {
      query.append('network[image]', data.image)
    }
    if (data.slug) {
      query.append('network[slug]', data.slug)
    }
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/networks`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  delete: data => {
    return axios.delete(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/networks/${data.networkId}`,
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
    if (data.slug) {
      query.append('network[slug]', data.slug)
    }
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/networks/${data.networkId}`,
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
