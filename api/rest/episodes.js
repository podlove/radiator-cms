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
  },
  delete: data => {
    return axios.delete(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/episodes/${
        data.episodeId
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
    const query = JSON.stringify({
      episode: {
        title: data.title,
        podcast_id: data.podcastId
      }
    })
    return axios.put(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/episodes/${
        data.episodeId
      }`,
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
