<template>
  <section class="section">
    <b-button @click.stop.prevent="createNetwork()">
      Create A Network
    </b-button>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn
  }),
  methods: {
    createNetwork() {
      console.log('0')
    }
  }
}
</script>
