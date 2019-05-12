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
  networks: {
    create: data => {
      const query = {
        query: `
          mutation($networkinput: NetworkInput!) {
            createNetwork(network: $networkinput) { 
              id,
              title
            }
          }
        `,
        variables: {
          networkinput: {
            title: data.title
          }
        }
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query, {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTY4OTYwNTUsImlzcyI6InJhZGlhdG9yIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJhcGlfc2Vzc2lvbiJ9.VUHcmycbftIKwislm3uir7macfXx1OwXCOSODLGuBip9zlQCzp2EBuTS_rj3Q2Jxb9MxpMr5Q82u4t8R_jqyaA'
        }
      })
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
  },
  podcasts: {
    create: data => {
      const query = {
        query: `
          mutation($podcastinput: PodcastInput!) {
            createPodcast(networkId: 1, podcast: $podcastinput) { 
              id,
              title
            }
          }
        `,
        variables: {
          podcastinput: {
            description: data.description,
            title: data.title
          }
        }
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query, {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTY4OTYwNTUsImlzcyI6InJhZGlhdG9yIiwic3ViIjoiYWRtaW4iLCJ0eXAiOiJhcGlfc2Vzc2lvbiJ9.VUHcmycbftIKwislm3uir7macfXx1OwXCOSODLGuBip9zlQCzp2EBuTS_rj3Q2Jxb9MxpMr5Q82u4t8R_jqyaA'
        }
      })
    },
    getPodcast: () => {
      const query = {
        query: `
          query {
            podcast(id: 1) {
              id,
              title
            }
          }
        `
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query)
    },
    getPodcasts: () => {
      const query = {
        query: `
          query {
            podcasts {
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
