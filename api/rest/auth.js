export default axios => ({
  login: data => {
    const query = JSON.stringify({
      name: data.username,
      password: data.password
    })

    return axios.post(`auth`, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  prolongSession: data => {
    return axios.post(
      `auth/prolong`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + data.token
        }
      }
    )
  },
  resendVerificationEmail: data => {
    const query = JSON.stringify({
      name_or_email: data.name_or_email
    })

    return axios.post(`auth/resend_verification_email`, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  resetPassword: data => {
    const query = JSON.stringify({
      name_or_email: data.username
    })

    return axios.post(`auth/reset_password`, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  signUp: data => {
    const query = JSON.stringify({
      name: data.username,
      email: data.email,
      password: data.password
    })

    return axios.post(`auth/signup`, query, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
})
