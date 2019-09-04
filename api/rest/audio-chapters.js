import axios from 'axios'

export default {
  convertChapters: data => {
    const query = JSON.stringify({
      data: data.file
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${
        process.env.backendVersion
      }/convert/chapters`,
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  createChapters: data => {
    const query = JSON.stringify({
      chapter: {
        audio_id: data.chapter.audio_id,
        start: data.chapter.start,
        title: data.chapter.title,
        link: data.chapter.link,
        image: data.chapter.image
      }
    })
    return axios.post(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/audios/${
        data.chapter.audio_id
      }/chapters`,
      query,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  deleteChapter: data => {
    return axios.delete(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/audios/${
        data.audio_id
      }/chapters/${data.chapter.start}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  getChapters: data => {
    return axios.get(
      `${process.env.baseUrl}/api/rest/${process.env.backendVersion}/audios/${
        data.audio_id
      }/chapters?format=json`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  }
}
