import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      podcast: {
        title: data.title,
        network_id: data.networkId
      }
    })
    return axios.post(`${process.env.baseUrl}/api/rest/v1/podcasts`, query, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  }
}
