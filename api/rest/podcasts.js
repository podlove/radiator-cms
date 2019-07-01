import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      podcast: {
        title: data.title,
        network_id: data.networkId
      }
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/podcasts`,
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
