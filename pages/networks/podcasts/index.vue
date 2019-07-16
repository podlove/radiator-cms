<template>
  <!-- PODCASTS PAGE -->
  <!-- path: `networks/podcasts` -->
  <section class="r_podcasts">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_podcasts__header">
          <h1 class="title">All Podcasts</h1>
          <no-ssr>
            <dropdown />
          </no-ssr>
        </div>
      </div>
    </section>
    <section class="container r_podcasts__main">
      <nuxt-link to="/networks/podcasts/import">
        <b-button class="is-primary">
          Import existing Podcast
        </b-button>
      </nuxt-link>
      <div v-if="networks">
        <ul v-for="network in networks" :key="network.id">
          <span v-if="network.podcasts">
            <li
              v-for="podcast in network.podcasts"
              :key="podcast.id"
              class="r_podcasts__podcast"
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
.r_podcasts__header {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}
.r_podcasts__main {
  margin: 40px auto;
}
.r_podcasts__podcast {
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
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    username: state => state.auth.username,
    networks: state => state.networks.networks
  })
}
</script>
