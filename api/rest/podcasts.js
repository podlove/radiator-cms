export default axios => ({
  create: data => {
    const query = new FormData()
    query.append('podcast[network_id]', data.networkId)
    query.append('podcast[title]', data.title)
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
    return axios.post(`podcasts`, query, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  delete: data => {
    return axios.delete(`podcasts/${data.podcastId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  depublishPodcast: data => {
    return axios.put(`podcasts/${data.podcastId}/depublish`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  publishPodcast: data => {
    return axios.put(`podcasts/${data.podcastId}/publish`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  read: data => {
    return axios.get(`podcasts/${data.podcastId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
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
    return axios.put(`podcasts/${data.podcastId}`, query, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + data.token
      }
    })
  }
})
