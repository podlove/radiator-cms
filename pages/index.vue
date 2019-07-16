<template>
  <!-- HOMEPAGE -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Radiator
          </h1>
          <h2 class="subtitle">
            Podcast Hosting & Publishing
          </h2>
        </div>
      </div>
    </section>
    <section class="container">
      <no-ssr>
        <b-tabs v-model="activeTab" class="r_tabs">
          <b-tab-item label="Login">
            <login />
          </b-tab-item>
          <b-tab-item label="Sign-up">
            <signup />
          </b-tab-item>
          <b-tab-item label="Reset your password">
            <reset-password />
          </b-tab-item>
        </b-tabs>
      </no-ssr>
    </section>
  </section>
</template>

<style>
.r_tabs {
  margin: 2rem 0;
}
</style>

<script>
import Login from '~/components/Login'
import ResetPassword from '~/components/ResetPassword'
import Signup from '~/components/Signup'

export default {
  name: 'HomePage',
  components: { Login, ResetPassword, Signup },
  data() {
    return {
      activeTab: 0
    }
  }
}
</script>
