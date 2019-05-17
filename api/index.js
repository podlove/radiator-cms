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
              image,
              podcasts {
                episodes(itemsPerPage: 5, page: 1, published: ANY) {
                  duration,
                  guid,
                  id,
                  image,
                  isPublished,
                  number,
                  publishedAt,
                  slug,
                  subtitle,
                  title,
                },
                id,
                image,
                isPublished,
                publishedAt,
                slug,
                subtitle,
                title,
              },
              slug,
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
              image,
              podcasts {
                episodes(itemsPerPage: 5, page: 1, published: ANY) {
                  duration,
                  guid,
                  id,
                  image,
                  isPublished,
                  number,
                  publishedAt,
                  slug,
                  subtitle,
                  title,
                },
                id,
                image,
                isPublished,
                publishedAt,
                slug,
                subtitle,
                title,
              },
              slug,
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
              author,
              description,
              episodes(itemsPerPage: 20, page: 1, published: ANY) {
                content,
                description,
                duration,
                enclosureLength,
                enclosureType,
                enclosureUrl,
                guid,
                id,
                image,
                isPublished,
                number,
                publishedAt,
                slug,
                subtitle,
                title,
              },
              id,
              image,
              isPublished,
              language,
              lastBuiltAt,
              ownerEmail,
              ownerName,
              publishedAt,
              slug,
              subtitle,
              title,
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
              author,
              description,
              episodes(itemsPerPage: 20, page: 1, published: ANY) {
                content,
                description,
                duration,
                enclosureLength,
                enclosureType,
                enclosureUrl,
                guid,
                id,
                image,
                isPublished,
                number,
                publishedAt,
                slug,
                subtitle,
                title,
              },
              id,
              isPublished,
              language,
              lastBuiltAt,
              ownerEmail,
              ownerName,
              publishedAt,
              slug,
              subtitle,
              title,
            }
          }
        `
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query)
    }
  }
}
