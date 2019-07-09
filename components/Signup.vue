<template>
  <section class="signup">
    <h1>Signup</h1>
    <b-notification
      v-if="alert"
      :type="alert.type"
      has-icon
      aria-close-label="Close notification"
    >
      {{ alert.message }}
    </b-notification>
    <form v-if="!isLoggedIn">
      <b-field label="User name">
        <b-input v-model="username" placeholder="Your user name"></b-input>
      </b-field>
      <b-field label="Email address">
        <b-input v-model="email" placeholder="Your email address"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input
          v-model="password"
          password-reveal
          placeholder="Your secure password"
          type="password"
          @keyup.native.enter.prevent="signup()"
        ></b-input>
      </b-field>
      <b-field label="Repeat Password">
        <b-input
          v-model="repeatPassword"
          password-reveal
          placeholder="Repeat your secure password"
          type="password"
          @keyup.native.enter.prevent="signup()"
        ></b-input>
      </b-field>
      <b-button
        type="is-primary"
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="signup()"
      >
        Signup
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
      email: '',
      password: '',
      repeatPassword: '',
      alert: null,
      loading: false
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn
  }),
  methods: {
    signup() {
      console.log('signup')
    }
  }
}
</script>

<style></style>
