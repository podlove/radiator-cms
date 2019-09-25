<template>
  <!-- HOMEPAGE -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div v-if="!isLoggedIn" class="container">
          <h1 class="title">
            Radiator
          </h1>
          <h2 class="subtitle">
            Podcast Hosting & Publishing
          </h2>
        </div>
        <div v-if="isLoggedIn && networks && networks.length" class="container">
          <h1 class="title">
            {{ networks[0].title }}
          </h1>
        </div>
      </div>
    </section>
    <section class="container">
      <no-ssr>
        <b-tabs v-if="!isLoggedIn" v-model="activeTab" class="r_tabs">
          <b-tab-item label="Login">
            <login />
          </b-tab-item>
          <b-tab-item label="Sign-up">
            <signup />
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
import { mapState } from 'vuex'

import Login from '~/components/Login'
import Signup from '~/components/Signup'

export default {
  name: 'HomePage',
  components: {
    Login,
    Signup
  },
  data() {
    return {
      activeTab: 0
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    networks: state => state.networks.networks
  })
}
</script>
