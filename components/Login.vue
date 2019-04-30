<template>
  <section class="login">
    <b-notification
      v-if="alert"
      :type="alert.type"
      has-icon
      aria-close-label="Close notification"
    >
      {{ alert.message }}
    </b-notification>
    <form v-if="!isLoggedIn">
      <b-field label="User name or email address">
        <b-input
          v-model="username"
          placeholder="Your user name or email address"
        ></b-input>
      </b-field>
      <b-field label="Password">
        <b-input
          v-model="password"
          password-reveal
          placeholder="Your secure password"
          type="password"
        ></b-input>
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

<style>
.login {
  margin: 40px 0;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      alert: null,
      loading: false
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn
  }),
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
          setTimeout(() => {
            this.$router.push('/networks')
          }, 1000)
        })
        .catch(error => {
          this.loading = false
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    }
  }
}
</script>
