<template>
  <section class="r_networks">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_networks__header">
          <h1 class="title">All Podcasts</h1>
          <no-ssr>
            <dropdown />
          </no-ssr>
        </div>
      </div>
    </section>
    <section class="container r_networks__main">
      <div v-if="networks">
        <ul v-for="network in networks" :key="network.id">
          <span v-if="network.podcasts">
            <li
              v-for="podcast in network.podcasts"
              :key="podcast.id"
              class="r_networks__podcast"
            >
              <podcast :podcast="podcast" />
            </li>
          </span>
        </ul>
      </div>
    </section>
  </section>
</template>

<style>
.r_networks__header {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}
.r_networks__main {
  margin: 40px auto;
}
.r_networks__podcast {
  margin: 2.5rem 0;
}
</style>

<script>
import { mapState } from 'vuex'

import Dropdown from '~/components/Dropdown'
import Podcast from '~/components/Podcast'

export default {
  components: {
    Dropdown,
    Podcast
  },
  data() {
    return {
      networks: null
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    username: state => state.auth.username
  }),
  created() {
    this.$store
      .dispatch('networks/getNetworks')
      .then(result => {
        this.networks = result
        console.log(this.networks)
      })
      .catch(error => {
        console.warn(error)
        this.$router.push('/404')
      })
  }
}
</script>
