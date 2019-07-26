import axios from 'axios'

export default {
  create: data => {
    console.log('data create:', data)
    const query = JSON.stringify({
      import_podcast_feed: {
        network_id: data.networkId,
        feed_url: data.feed_url,
        enclosure_types: data.enclosure_types,
        short_id: data.short_id,
        limit: data.limit
      }
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/tasks`,
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  read: data => {
    console.log('data read:', data)
    return axios.get(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/tasks/${
        data.taskId
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  delete: data => {
    console.log('data delete:', data)
    return axios.delete(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/tasks/${
        data.taskId
      }`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  }
}
