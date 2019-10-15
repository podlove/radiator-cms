import axios from 'axios'

export default {
  createAudioFile: data => {
    const query = new FormData()
    query.append('audio_file[audio_id]', data.audioId)
    query.append('audio_file[file]', data.file)
    query.append('audio_file[title]', data.title)
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/audios/${data.audioId}/audio_files`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  createAudio: data => {
    const query = new FormData()
    query.append('audio[network_id]', data.networkId)
    query.append('audio_publication[title]', data.title)
    if (data.image) {
      query.append('audio[image]', data.image)
    }
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/networks/${data.networkId}/audios`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  createPodcastAudio: data => {
    const query = new FormData()
    query.append('audio[episode_id]', data.episodeId)
    query.append('audio_publication[title]', data.title)
    if (data.image) {
      query.append('audio[image]', data.image)
    }
    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/episodes/${data.episodeId}/audios`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  deleteAudioFile: data => {
    return axios.delete(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/audio_files/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  deleteAudioPublication: data => {
    return axios.delete(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/audio_publications/${data.id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  updateAudio: data => {
    const query = new FormData()
    if (data.image) {
      query.append('audio[image]', data.image)
    }
    if (data.title) {
      query.append('audio[title]', data.title)
    }
    return axios.patch(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/audios/${data.audioId}`,
      query,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  updateAudioPublication: data => {
    const query = new FormData()
    if (data.title) {
      query.append('audio_publication[title]', data.title)
    }
    if (data.publishState) {
      query.append('audio_publication[publish_state]', data.publishState)
    }
    return axios.patch(
      `${process.env.apiBaseUrl}/api/rest/${process.env.backendVersion}/audio_publications/${data.id}`,
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
