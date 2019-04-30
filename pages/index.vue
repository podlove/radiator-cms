<template>
  <section>
    <h1 class="title is-1">Radiator</h1>
    <h2 class="subtitle is-3">Podcast Hosting & Publishing</h2>
    <login />
  </section>
</template>

<script>
import Login from '~/components/Login'

export default {
  name: 'HomePage',
  components: { Login }
}
</script>
