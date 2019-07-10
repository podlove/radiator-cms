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
        <reset-password />
        <signup />
      </no-ssr>
    </section>
  </section>
</template>

<script>
import Login from '~/components/Login'
import ResetPassword from '~/components/ResetPassword'
import Signup from '~/components/Signup'

export default {
  name: 'HomePage',
  components: { Login, ResetPassword, Signup }
}
</script>
