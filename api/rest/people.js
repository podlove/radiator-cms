import axios from 'axios'

export default {
  create: data => {
    const query = new FormData()
    query.append('person[network_id]', data.networkId)
    query.append('person[name]', data.name)
    // query.append('person[display_name]', data.display_name)
    // query.append('person[nick]', data.nick)
    query.append('person[image]', data.image)
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/people`,
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
