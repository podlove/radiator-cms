<template>
  <section class="homepage">
    <h1 class="title is-1">Radiator</h1>
    <h2 class="subtitle is-3">Podcast Hosting & Publishing</h2>
    <login-logout />
  </section>
</template>

<style>
.homepage {
  margin: 80px 0;
}
</style>

<script>
import LoginLogout from '~/components/LoginLogout'

export default {
  name: 'HomePage',
  components: { LoginLogout }
}
</script>
