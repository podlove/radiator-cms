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
  episodes: {
    create: data => {
      const query = {
        query: `
          mutation($episodeinput: EpisodeInput!) {
            createEpisode(podcastId: ${
              data.podcastId
            }, episode: $episodeinput) {
              content,
              description,
              duration,
              guid,
              id,
              image,
              number,
              publishedAt,
              slug,
              subtitle,
              title,
            }
          }
        `,
        variables: {
          episodeinput: {
            title: data.title
          }
        }
      }
      return axios.post(`${process.env.baseUrl}/api/graphql`, query, {
        headers: {
          Authorization: 'Bearer ' + data.token
        }
      })
    },
    getEpisode: data => {
      const query = {
        query: `
          query {
            episode(id: ${data}) {
              content,
              description,
              duration,
              guid,
              id,
              image,
              number,
              podcast {
                title,
                image
              },
              chapters {
                image,
                link,
                start,
                title
              },
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
    uploadEpisodeAudio: data => {
      console.log('TODO: Upload episode audio file(s) with data: ', data)
      return true
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
          Authorization: 'Bearer ' + data.token
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
                episodes(itemsPerPage: 5, page: 1) {
                  duration,
                  guid,
                  id,
                  image,
                  number,
                  publishedAt,
                  slug,
                  subtitle,
                  title,
                },
                id,
                image,
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
                episodes(itemsPerPage: 5, page: 1) {
                  duration,
                  guid,
                  id,
                  image,
                  number,
                  slug,
                  subtitle,
                  title,
                },
                id,
                image,
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
            createPodcast(networkId: ${
              data.networkId
            }, podcast: $podcastinput) {
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
      return axios.post(`${process.env.baseUrl}/api/graphql`, query)
    },
    getPodcast: data => {
      const query = {
        query: `
          query {
            podcast(id: ${data}) {
              author,
              description,
              episodes(itemsPerPage: 20, page: 1) {
                content,
                description,
                duration,
                guid,
                id,
                image,
                number,
                publishedAt,
                slug,
                subtitle,
                title,
              },
              id,
              image,
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
              episodes(itemsPerPage: 20, page: 1) {
                content,
                description,
                duration,
                guid,
                id,
                image,
                number,
                publishedAt,
                slug,
                subtitle,
                title,
              },
              id,
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
