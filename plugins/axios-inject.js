import apiPodcasts from '~/api/rest/podcasts.js'
import apiEpisodes from '~/api/rest/episodes.js'
import apiAudio from '~/api/rest/audio.js'
import apiAuth from '~/api/rest/auth.js'
import apiContributions from '~/api/rest/contributions.js'
import apiNetworksCollaborators from '~/api/rest/networks-collaborators.js'
import apiNetworks from '~/api/rest/networks.js'
import apiPeople from '~/api/rest/people.js'
import apiPodcastCollaborators from '~/api/rest/podcasts-collaborators.js'
import apiTasks from '~/api/rest/tasks.js'

export default ({ $axios }, inject) => {
  // Inject `api` key
  // -> app.$api
  // -> this.$api in vue components
  // -> this.$api in store actions/mutations
  const api = {
    podcasts: apiPodcasts($axios),
    episodes: apiEpisodes($axios),
    audio: apiAudio($axios),
    auth: apiAuth($axios),
    contributions: apiContributions($axios),
    networksCollaborators: apiNetworksCollaborators($axios),
    networks: apiNetworks($axios),
    people: apiPeople($axios),
    podcastColaborator: apiPodcastCollaborators($axios),
    tasks: apiTasks($axios)
  }

  inject('api', api)
}
