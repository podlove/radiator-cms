<template>
  <div>
    <navigation />
    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<style>
.main-content {
  margin: 160px auto;
  width: 100%;
  max-width: 980px;
}
</style>

<script>
import Navigation from '~/components/Navigation'

export default {
  components: { Navigation }
}
</script>
