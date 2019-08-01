<template>
  <div>
    <navigation :is-logged-in="this.$store.state.auth.isLoggedIn" />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation'

const NETWORKS_REGEX = /\/network\/(?<network_id>\d+)/
const PODCASTS_REGEX = /\/network\/(?<network_id>\d+)\/podcast\/(?<podcast_id>\d+)/
const EPISODES_REGEX = /\/network\/(?<network_id>\d+)\/podcast\/(?<podcast_id>\d+)\/episode\/(?<episode_id>\d+)/

export default {
  components: { Navigation },
  // Check if user is logged in
  middleware: ['isAuth'],
  mounted() {
    this.$store.watch((newValue, oldValue) => {
      // Redirect to homepage if user is not logged in
      if (newValue.auth.isLoggedIn === false) {
        this.$router.push('/')
        // Get networks for working navigation if user is logged in
      } else if (
        !newValue.networks.networks ||
        newValue.networks.networks.length === 0
      ) {
        this.$store.dispatch('networks/getNetworks')
        // Set and redirect to active network (first), if non is set
      } else if (
        this.$route.path === '/' &&
        newValue.networks &&
        newValue.networks.networks &&
        newValue.networks.networks.length > 0 &&
        !newValue.networks.activeNetwork
      ) {
        this.$store.dispatch(
          'networks/setActiveNetworkId',
          newValue.networks.networks[0].id
        )
        this.$router.push('/network/' + newValue.networks.networks[0].id)
      }
    })
  },
  created() {
    // Check if user is on a network, podcast or episodes page
    const path = this.$route.path
    const activeNetwork = path.match(NETWORKS_REGEX)
      ? path.match(NETWORKS_REGEX).groups
      : null
    const activePodcast = path.match(PODCASTS_REGEX)
      ? path.match(PODCASTS_REGEX).groups
      : null
    const activeEpisode = path.match(EPISODES_REGEX)
      ? path.match(EPISODES_REGEX).groups
      : null
    // Set active Episode
    if (activeEpisode) {
      this.$store.dispatch(
        'navigation/setActiveEpisode',
        activeEpisode.episode_id
      )
    }
    // Set active Podcast
    if (activePodcast) {
      this.$store.dispatch(
        'podcasts/setActivePodcastId',
        activePodcast.podcast_id
      )
    }
    // Set active Network
    if (activeNetwork) {
      this.$store.dispatch(
        'networks/setActiveNetworkId',
        activeNetwork.network_id
      )
    }
  }
}
</script>
