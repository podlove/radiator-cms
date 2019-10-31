import axios from 'axios'

export default {
  create: data => {
    const query = new FormData()
    query.append('podcast[network_id]', data.networkId)
    if (data.title) {
      query.append('podcast[title]', data.title)
    }
    if (data.image) {
      query.append('podcast[image]', data.image)
    }
    if (data.subtitle) {
      query.append('podcast[subtitle]', data.subtitle)
    }
    if (data.summary) {
      query.append('podcast[summary]', data.summary)
    }
    if (data.shortId) {
      query.append('podcast[short_id]', data.shortId)
    }
    if (data.language) {
      query.append('podcast[language]', data.language)
    }
    if (data.author) {
      query.append('podcast[author]', data.author)
    }
    if (data.ownerName) {
      query.append('podcast[owner_name]', data.ownerName)
    }
    if (data.owner_email) {
      query.append('podcast[owner_email]', data.ownerEmail)
    }
    if (data.publishState) {
      query.append('podcast[publish_state]', data.publishState)
    }
    if (data.publishedAt) {
      query.append('podcast[published_at]', data.publishedAt)
    }
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/podcasts`,
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
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/podcasts/${data.podcastId}`,
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
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/podcasts/${data.podcastId}`,
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
    query.append('podcast[podcast_id]', data.podcastId)
    if (data.title) {
      query.append('podcast[title]', data.title)
    }
    if (data.image) {
      query.append('podcast[image]', data.image)
    }
    if (data.subtitle) {
      query.append('podcast[subtitle]', data.subtitle)
    }
    if (data.summary) {
      query.append('podcast[summary]', data.summary)
    }
    if (data.shortId) {
      query.append('podcast[short_id]', data.shortId)
    }
    if (data.language) {
      query.append('podcast[language]', data.language)
    }
    if (data.author) {
      query.append('podcast[author]', data.author)
    }
    if (data.ownerName) {
      query.append('podcast[owner_name]', data.ownerName)
    }
    if (data.ownerEmail) {
      query.append('podcast[owner_email]', data.ownerEmail)
    }
    if (data.publishState) {
      query.append('podcast[publish_state]', data.publishState)
    }
    if (data.publishedAt) {
      query.append('podcast[published_at]', data.publishedAt)
    }
    return axios.put(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/podcasts/${data.podcastId}`,
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
