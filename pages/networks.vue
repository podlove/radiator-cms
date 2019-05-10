<template>
  <section class="r_networks">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_networks__header">
          <h1 class="title">Hello, {{ username }}</h1>
          <dropdown />
        </div>
      </div>
    </section>
    <section class="container r_networks__main">
      <podcast />
    </section>
  </section>
</template>

<style>
.r_networks__header {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}
.r_networks__main {
  margin: 40px auto;
}
</style>

<script>
import { mapState } from 'vuex'

import Dropdown from '~/components/Dropdown'
import Podcast from '~/components/Podcast'

export default {
  components: {
    Dropdown,
    Podcast
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    username: state => state.auth.username
  })
}
</script>
