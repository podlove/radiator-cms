import axios from 'axios'

export default {
  create: data => {
    const query = new FormData()
    query.append('episode[title]', data.title)
    query.append('episode[podcast_id]', data.podcastId)
    if (data.image) {
      query.append('episode[image]', data.image)
    }
    if (data.number) {
      query.append('episode[number]', data.number)
    }
    if (data.shortId) {
      query.append('episode[short_id]', data.shortId)
    }
    if (data.subtitle) {
      query.append('episode[subtitle]', data.subtitle)
    }
    if (data.summary) {
      query.append('episode[summary]', data.summary)
    }
    if (data.publishState) {
      query.append('episode[publish_state]', data.publishState)
    }
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/episodes`,
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
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/episodes/${data.episodeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  depublishEpisode: data => {
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/episodes/${data.episodeId}/depublish`,
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  publishEpisode: data => {
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/episodes/${data.episodeId}/publish`,
      null,
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
    query.append('episode[title]', data.title)
    query.append('episode[episode_id]', data.episodeId)
    if (data.image) {
      query.append('episode[image]', data.image)
    }
    if (data.number) {
      query.append('episode[number]', data.number)
    }
    if (data.shortId) {
      query.append('episode[short_id]', data.shortId)
    }
    if (data.subtitle) {
      query.append('episode[subtitle]', data.subtitle)
    }
    if (data.summary) {
      query.append('episode[summary]', data.summary)
    }
    if (data.publishState) {
      query.append('episode[publish_state]', data.publishState)
    }
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/episodes/${data.episodeId}`,
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
