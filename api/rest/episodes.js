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
  createAudio: data => {
    const query = JSON.stringify({
      audio: {
        episode_id: data.episodeId,
        title: data.file.name
      }
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/audios`,
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
  },
  uploadAudio: data => {
    const query = new FormData()
    query.append('audio_file[audio_id]', data.id)
    query.append('audio_file[file]', data.file)
    query.append('audio_file[title]', data.title)
    return axios.post(
      `${process.env.baseUrl}/api/rest/${
        process.env.backendVersion
      }/audio_file`,
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
