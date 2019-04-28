<template>
  <section class="section">
    <login-logout />
    <b-button @click.stop.prevent="createNetwork()">
      Create A Network
    </b-button>
  </section>
</template>

<script>
import LoginLogout from '~/components/LoginLogout'

export default {
  name: 'HomePage',
  components: { LoginLogout },
  methods: {
    createNetwork() {
      console.log('0')
    }
  }
}
</script>
