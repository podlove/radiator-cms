import axios from 'axios'

export default {
  createAudioFile: data => {
    const query = new FormData()
    query.append('audio_file[audio_id]', data.audioId)
    query.append('audio_file[file]', data.file)
    query.append('audio_file[title]', data.title)
    query.append('audio_file[mime_type]', data.mimeType)
    query.append('audio_file[byte_size]', data.byteSize)
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/audios/${
        data.audioId
      }/audio_files`,
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
    if (data.image) {
      query.append('audio[image]', data.image)
    }
    query.append('audio[episode_id]', data.episodeId)
    query.append('audio[network_id]', data.networkId)
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/networks/${
        data.networkId
      }/audios`,
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
    const query = JSON.stringify({
      audio: {
        episode_id: data.episodeId,
        title: data.file.name,
        network_id: data.networkId
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
  updateAudio: data => {
    const query = new FormData()
    if (data.image) {
      query.append('audio[image]', data.image)
    }
    return axios.patch(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/audios/${
        data.id
      }`,
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
    console.log('updateAudioPublication', data)
    const query = JSON.stringify({
      audio_publication: {
        title: data.title
      }
    })
    return axios.patch(
      `${process.env.baseUrl}/api/rest/${
        process.env.backendVersion
      }/audio_publications/${data.id}`,
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
