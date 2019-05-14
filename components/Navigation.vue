<template>
  <no-ssr>
    <nav
      class="navbar is-primary is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">Radiator</a>
      </div>
      <div class="navbar-start">
        <div v-if="isLoggedIn" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/networks">Networks</a>
          <div class="navbar-dropdown is-boxed">
            <span v-if="networks.length">
              <a
                v-for="network in networks"
                :key="network.id"
                class="navbar-item"
                :href="'/networks/' + network.id"
              >
                {{ network.title }}
              </a>
              <hr class="navbar-divider" />
            </span>
            <a class="navbar-item" href="/networks/new">
              <b-icon icon="plus-circle"></b-icon>
              <span class="r_menu__item">Add new Network</span>
            </a>
          </div>
        </div>
        <div v-if="isLoggedIn" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/networks/podcasts">Podcasts</a>
          <div class="navbar-dropdown is-boxed">
            <span v-if="podcasts.length">
              <a
                v-for="podcast in podcasts"
                :key="podcast.id"
                class="navbar-item"
                :href="'/networks/podcasts/' + podcast.id"
              >
                {{ podcast.title }}
              </a>
              <hr class="navbar-divider" />
            </span>
            <a class="navbar-item" href="/networks/podcasts/new">
              <b-icon icon="plus-circle"></b-icon>
              <span class="r_menu__item">Add new Podcast</span>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <div v-if="isLoggedIn" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless">
            <b-icon icon="account-circle"></b-icon>
          </a>
          <div class="navbar-dropdown is-right">
            <div class="navbar-item">
              <b-icon
                class="r__usermenu__avatar"
                type="is-white"
                icon="account-circle"
              ></b-icon>
              <span class="r__usermenu__container">
                <span class="has-text-weight-bold">{{ username }}</span>
                <span class="r__usermenu__email">email@address.com</span>
              </span>
            </div>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              <b-icon icon="settings"></b-icon>
              <span class="r_menu__item">Account Settings</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              <b-icon icon="library-books"></b-icon>
              <span class="r_menu__item">Documentation</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="help"></b-icon>
              <span class="r_menu__item">Help & FAQ</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="lifebuoy"></b-icon>
              <span class="r_menu__item">Contact Support</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="bug"></b-icon>
              <span class="r_menu__item">Submit an Issue</span>
            </a>
            <hr class="navbar-divider" />
            <a class="r_usermenu__simple-item navbar-item">
              Terms & Conditions
            </a>
            <a class="r_usermenu__simple-item navbar-item">Privacy Policy</a>
          </div>
        </div>
        <div v-if="isLoggedIn" class="navbar-item">
          <div class="buttons">
            <a class="button" @click.stop.prevent="logout()">
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  </no-ssr>
</template>

<style lang="scss" scoped>
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
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    networks: state => state.networks.networks,
    podcasts: state => state.podcasts.podcasts,
    username: state => state.auth.username
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
