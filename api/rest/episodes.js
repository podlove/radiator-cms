import axios from 'axios'

export default {
  create: data => {
    const query = JSON.stringify({
      episode: {
        title: data.title || null,
        podcast_id: data.podcastId || null,
        subtitle: data.subtitle || null,
        summary: data.description || null,
        short_id: data.shortId || null
      }
    })
    console.log('apiBaseUrl', process.env.apiBaseUrl)
    console.log('backendVersion', process.env.backendVersion)
    console.log(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/episodes`
    )
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/episodes`,
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
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/episodes/${data.episodeId}`,
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
        episode_id: data.episodeId
      }
    })
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/episodes/${data.episodeId}`,
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
