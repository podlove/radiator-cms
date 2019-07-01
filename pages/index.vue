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
        <login />
      </no-ssr>
    </section>
  </section>
</template>

<script>
import Login from '~/components/Login'

export default {
  name: 'HomePage',
  components: { Login }
}
</script>
