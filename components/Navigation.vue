<template>
  <nav
    class="navbar has-shadow is-white is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="/">Radiator</a>
    </div>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">Networks</a>
      <div class="navbar-dropdown">
        <a class="navbar-item">
          Network 1
        </a>
        <a class="navbar-item">
          Network 2
        </a>
        <hr class="navbar-divider" />
        <a class="navbar-item">
          Add Network
        </a>
      </div>
    </div>
    <div v-if="isLoggedIn" class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable">
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
            <span class="r_usermenu__item">Account Settings</span>
          </a>
          <hr class="navbar-divider" />
          <a class="navbar-item">
            <b-icon icon="library-books"></b-icon>
            <span class="r_usermenu__item">Documentation</span>
          </a>
          <a class="navbar-item">
            <b-icon icon="help"></b-icon>
            <span class="r_usermenu__item">Help & FAQ</span>
          </a>
          <a class="navbar-item">
            <b-icon icon="lifebuoy"></b-icon>
            <span class="r_usermenu__item">Contact Support</span>
          </a>
          <a class="navbar-item">
            <b-icon icon="bug"></b-icon>
            <span class="r_usermenu__item">Submit an Issue</span>
          </a>
          <hr class="navbar-divider" />
          <a class="r_usermenu__simple-item navbar-item">Terms & Conditions</a>
          <a class="r_usermenu__simple-item navbar-item">Privacy Policy</a>
        </div>
      </div>
      <div class="navbar-item">
        <div class="buttons">
          <a class="button" @click.stop.prevent="logout()">
            Logout
          </a>
        </div>
      </div>
    </div>
  </nav>
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
.r_usermenu__item {
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
    username: state => state.auth.username
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
