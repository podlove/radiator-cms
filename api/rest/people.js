export default axios => ({
  create: data => {
    const query = new FormData()
    query.append('person[network_id]', data.networkId)
    if (data.name) {
      query.append('person[name]', data.name)
    }
    if (data.image) {
      query.append('person[image]', data.image)
    }
    if (data.displayName) {
      query.append('person[display_name]', data.displayName)
    }
    if (data.nick) {
      query.append('person[nick]', data.nick)
    }
    if (data.link) {
      query.append('person[link]', data.link)
    }
    if (data.email) {
      query.append('person[email]', data.email)
    }
    return axios.post(`people`, query, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + data.token
      }
    })
  },
  update: data => {
    const query = new FormData()
    query.append('person[network_id]', data.networkId)
    if (data.name) {
      query.append('person[name]', data.name)
    }
    if (data.image) {
      query.append('person[image]', data.image)
    }
    if (data.displayName) {
      query.append('person[display_name]', data.displayName)
    }
    if (data.nick) {
      query.append('person[nick]', data.nick)
    }
    if (data.link) {
      query.append('person[link]', data.link)
    }
    if (data.email) {
      query.append('person[email]', data.email)
    }
    return axios.patch(`people/${data.personId}`, query, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + data.token
      }
    })
  }
})
