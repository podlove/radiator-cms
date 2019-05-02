<template>
  <section class="r_networks">
    <section class="r_networks__header">
      <h1 class="is-size-4">Hello, {{ username }}</h1>
      <dropdown />
    </section>
    <podcast />
  </section>
</template>

<style>
.r_networks__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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
  }),
  methods: {
    createNetwork() {
      console.log('0')
    }
  }
}
</script>
