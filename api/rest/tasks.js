export default axios => ({
  create: data => {
    const importPodcastFeed = {
      network_id: data.network_id,
      feed_url: data.feed_url,
      enclosure_types: data.enclosure_types,
      short_id: data.short_id
    }
    if (data.limit) {
      importPodcastFeed.limit = parseInt(data.limit)
    }

    const query = JSON.stringify({ import_podcast_feed: importPodcastFeed })
    return axios.post(`tasks`, query, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  read: data => {
    return axios.get(`tasks/${data.taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  delete: data => {
    return axios.delete(`tasks/${data.taskId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + data.token
      }
    })
  }
})
