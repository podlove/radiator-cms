import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      episode: {
        title: data.title,
        podcast_id: data.podcastId
      }
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/episodes`,
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
