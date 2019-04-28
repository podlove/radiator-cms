<template>
  <section>
    <b-notification
      v-if="alert"
      :type="alert.type"
      has-icon
      aria-close-label="Close notification"
    >
      {{ alert.message }}
    </b-notification>
    <form v-if="isLoggedIn">
      <b-button
        type="submit"
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="logout()"
      >
        Logout
      </b-button>
    </form>
    <form v-else>
      <b-field label="Email">
        <b-input v-model="username"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input v-model="password" type="password"></b-input>
      </b-field>
      <b-button
        type="submit"
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="login()"
      >
        Login
      </b-button>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      alert: null,
      loading: false,
      isLoggedIn: false
    }
  },
  computed: mapState(['token']),
  methods: {
    login() {
      this.alert = null
      this.loading = true
      this.$store
        .dispatch('auth/login', {
          username: this.username,
          password: this.password
        })
        .then(result => {
          this.alert = {
            type: 'is-success',
            message: 'You are logged in.'
          }
          this.username = ''
          this.password = ''
          this.loading = false
          this.isLoggedIn = true
          // this.$router.push('/admin')
        })
        .catch(error => {
          this.loading = false
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    logout() {
      this.alert = {
        type: 'is-success',
        message: 'You are logged out.'
      }
      this.$store.dispatch('auth/logout')
      this.isLoggedIn = false
    }
  }
}
</script>
