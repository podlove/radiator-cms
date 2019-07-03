<template>
  <div>
    <navigation :is-logged-in="this.$store.state.auth.isLoggedIn" />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation'

const NETWORKS_REGEX = /\/networks\/(?<network_id>\d+)/
const PODCASTS_REGEX = /\/networks\/(?<network_id>\d+)\/podcasts\/(?<podcast_id>\d+)/
const EPISODES_REGEX = /\/networks\/(?<network_id>\d+)\/podcasts\/(?<podcast_id>\d+)\/episodes\/(?<episode_id>\d+)/

export default {
  components: { Navigation },
  // Check if user is logged in
  middleware: ['isAuth'],
  mounted() {
    this.$store.watch(newValue => {
      // Redirect to homepage if user is not logged in
      if (newValue.auth.isLoggedIn === false) {
        this.$router.push('/')
        // Get networks for working navigation if user is logged in
      } else if (
        !newValue.networks.networks ||
        newValue.networks.networks.length === 0
      ) {
        this.$store.dispatch('networks/getNetworks')
      }
    })
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
        'navigation/setActivePodcast',
        activePodcast.podcast_id
      )
    }
    // Set active Network
    if (activeNetwork) {
      this.$store.dispatch(
        'navigation/setActiveNetwork',
        activeNetwork.network_id
      )
    }
  }
}
</script>
