import axios from 'axios'

export default {
  createAudio: data => {
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
  createAudioFile: data => {
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
