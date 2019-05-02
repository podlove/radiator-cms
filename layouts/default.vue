<template>
  <div>
    <navigation />
    <section class="r_main-content">
      <nuxt />
    </section>
  </div>
</template>

<style>
.r_main-content {
  margin: 90px auto;
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
