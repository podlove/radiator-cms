import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      network: {
        title: data.title
      }
    })
    return axios.post(`${process.env.baseUrl}/api/rest/v1/networks`, query, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  }
}
