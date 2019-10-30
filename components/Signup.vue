<template>
  <section class="r_signup">
    <div v-if="!success">
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
        <b-field
          label="Repeat Password"
          :type="{ 'is-danger': password !== repeatPassword }"
          :message="{
            'Your passwords are not the same.': password !== repeatPassword
          }"
        >
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
    </div>
    <div v-else>
      <p>Verification email sent to {{ email }}.</p>
      <p>
        <a @click="resend()">Resend the email to {{ email }}.</a>
      </p>
    </div>
  </section>
</template>

<style>
.r_signup {
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
      email: '',
      password: '',
      repeatPassword: '',
      alert: null,
      loading: false,
      success: false
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn
  }),
  methods: {
    resend() {
      this.$store
        .dispatch('auth/resendEmail', {
          name_or_email: this.email
        })
        .then(result => {
          Toast.open({
            message: `We send you another verification e-mail to ${this.email}`,
            type: 'is-success'
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    signup() {
      if (this.password === this.repeatPassword) {
        this.$store
          .dispatch('auth/signup', {
            email: this.email,
            username: this.username,
            password: this.password
          })
          .then(result => {
            console.log(result)
            this.success = true
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        Toast.open({
          message: 'Your passwords are not the same.',
          type: 'is-danger'
        })
      }
    }
  }
}
</script>
