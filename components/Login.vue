<template>
  <!-- Login and notifications. -->
  <section>
    <section class="r_login">
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
            @keyup.native.enter.prevent="login()"
          ></b-input>
        </b-field>
        <b-button
          type="is-primary"
          :loading="loading"
          :disabled="loading"
          @click.stop.prevent="login()"
        >
          Login
        </b-button>
      </form>
    </section>
  </section>
</template>

<style>
.r_login {
  margin: 40px 0;
}
</style>

<script>
import { mapState } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'

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
    activeNetwork: state => state.networks.activeNetwork,
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
          Toast.open({
            message:
              'You are logged in and will be redirected to your dashboard.',
            type: 'is-success'
          })
          this.username = ''
          this.password = ''
          this.loading = false
          setTimeout(() => {
            if (this.activeNetwork && this.activeNetwork.id) {
              this.$router.push('/network/' + this.activeNetwork.id)
            }
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
