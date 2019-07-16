<template>
  <section class="r_reset-password">
    <b-notification
      v-if="alert"
      :type="alert.type"
      has-icon
      aria-close-label="Close notification"
    >
      {{ alert.message }}
    </b-notification>
    <form>
      <b-field label="Forgot your password?">
        <b-input
          v-model="email"
          placeholder="Your email address"
          @keyup.native.enter.prevent="resetPW()"
        ></b-input>
      </b-field>
      <b-button
        type="is-primary"
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="resetPW()"
      >
        Reset Password
      </b-button>
    </form>
  </section>
</template>

<style>
.r_reset-password {
  margin: 40px 0;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      alert: null,
      loading: false
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn
  }),
  methods: {
    resetPW() {
      console.log('reset pw')
    }
  }
}
</script>

<style></style>
