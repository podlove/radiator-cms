import axios from 'axios'

export default {
  signUp: data => {
    const query = JSON.stringify({
      name: data.username,
      email: data.email,
      password: data.password
    })

    return axios.post(
      `${process.env.apiBaseUrl}/api/rest/${
        process.env.backendVersion
      }/auth/signup`,
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
