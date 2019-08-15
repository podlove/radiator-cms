import axios from 'axios'

export default {
  create: data => {
    console.log('data create:', data)
    const query = JSON.stringify({
      import_podcast_feed: {
        network_id: data.network_id,
        feed_url: data.feed_url,
        enclosure_types: data.enclosure_types,
        short_id: data.short_id
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
