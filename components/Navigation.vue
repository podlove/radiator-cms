<template>
  <!-- Main navigation. -->
  <no-ssr>
    <nav
      class="navbar is-primary is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <!-- Network Switch -->
        <div
          v-if="isLoggedIn && networks && networks.length"
          class="navbar-item has-dropdown is-hoverable"
        >
          <a class="navbar-link is-arrowless">
            <b-icon icon="account-switch"></b-icon>
          </a>
          <div class="navbar-dropdown is-boxed">
            <p
              class="has-text-grey-light has-text-weight-bold is-size-7 r_network-label"
            >
              Switch your podcast network
            </p>
            <span v-for="network in networks" :key="network.id">
              <a
                v-if="
                  (activeNetwork && network.id !== activeNetwork.id) ||
                    !activeNetwork
                "
                class="navbar-item"
                :href="'/network/' + network.id"
              >
                {{ network.title }}
              </a>
            </span>
            <hr class="navbar-divider" />
            <!-- TODO: Send parameter of network when there is an active network -->
            <a class="navbar-item" href="/new-network">
              <b-icon icon="plus-circle"></b-icon>
              <span class="r_menu__item">New network</span>
            </a>
          </div>
        </div>
        <!-- Logo when user is logged-in -->
        <a
          v-if="isLoggedIn && activeNetwork"
          class="navbar-item"
          :href="'/network/' + activeNetwork.id"
        >
          {{ activeNetwork.title }} Radiator
        </a>
        <!-- Logo when user is logged-out -->
        <a
          v-if="
            !isLoggedIn || !networks || networks.length === 0 || !activeNetwork
          "
          class="navbar-item"
          href="/"
        >
          Radiator
        </a>
        <!-- Mobile menu -->
        <a
          v-if="isLoggedIn"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          :class="{ 'is-active': isOpen }"
          @click="isOpen = !isOpen"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div v-if="isLoggedIn && activeNetwork" class="navbar-start">
          <div
            v-if="activeNetwork.podcasts && activeNetwork.podcasts.length"
            class="navbar-item has-dropdown is-hoverable"
          >
            <div class="navbar-item navbar-link">
              Podcasts
            </div>
            <div class="navbar-dropdown is-boxed">
              <a
                v-for="podcast in activeNetwork.podcasts"
                :key="podcast.id"
                class="navbar-item"
                :href="
                  '/network/' + activeNetwork.id + '/podcast/' + podcast.id
                "
              >
                {{ podcast.title }}
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-end">
          <div v-if="isLoggedIn" class="navbar-item">
            <div class="r_navbar-end">
              <b-button type="is-light" outlined @click.stop.prevent="logout()">
                Logout
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </no-ssr>
</template>

<style lang="scss" scoped>
// Overwrite Buefy menu
// Make it scrollable with max-height
@media screen and (min-width: 1088px) {
  .navbar-item.is-hoverable .navbar-dropdown.is-boxed {
    overflow-y: scroll;
    max-height: 40vh;
  }
}
.r_navbar-end {
  margin-right: 1rem;
}
.r_network-label {
  padding: 1rem 3rem 0.5rem 1rem;
}
.r__usermenu {
  align-items: initial;
  display: flex;
  flex-direction: column;
}
.r__usermenu__avatar {
  background-color: #000000;
  border-radius: 50%;
  margin: 5px 10px 5px 0;
  width: 40px;
  height: 40px;
}
.r__usermenu__container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  line-height: 1.3;
}
.r_menu__item {
  margin-left: 18px;
}
.r_usermenu__simple-item {
  padding-left: 60px;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      episodes: [],
      isOpen: false
    }
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork,
    networks: state => state.networks.networks,
    episode: state => state.episodes.episode,
    username: state => state.auth.username,
    activePodcast: state => state.podcasts.activePodcast,
    activeEpisode: state => state.episodes.activeEpisode
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
