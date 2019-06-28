import axios from 'axios'

export default {
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
      return axios.post(`${process.env.baseUrl}/api/graphql`, query, {
        headers: {
          Authorization: 'Bearer ' + data.token
        }
      })
    }
  }
}
