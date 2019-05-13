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
          Authorization: 'Bearer ' + this.$store.auth.token
        }
      })
    },
    getNetwork: data => {
      const query = {
        query: `
          query {
            network(id: ${data}) {
              id,
              title
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
          Authorization: 'Bearer ' + this.$store.auth.token
        }
      })
    },
    getPodcast: data => {
      const query = {
        query: `
          query {
            podcast(id: ${data}) {
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
