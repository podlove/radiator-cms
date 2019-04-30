import axios from 'axios'

export default {
  auth: {
    login: data => {
      const query = {
        query: `
          mutation {
            authenticatedSession(usernameOrEmail: "${
              data.username
            }", password: "${data.password}") {
              username,
              token
            }
          }
        `
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query)
    }
  },
  network: {
    create: data => {
      const query = {
        query: `
          mutation {
            authenticatedSession(usernameOrEmail: "${
              data.username
            }", password: "${data.password}") {
              username,
              token
            }
          }
        `
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query)
    },
    getNetworks: () => {
      const query = {
        query: `
          query {
            networks {
              id,
              title
            }
          }
        `
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query)
    }
  }
}
