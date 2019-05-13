<template>
  <div>
    <navigation />
    <nuxt />
  </div>
</template>

<script>
import Navigation from '~/components/Navigation'

export default {
  components: { Navigation },
  mounted() {
    if (!this.$store.state.auth.isLoggedIn) {
      this.$router.push('/')
    }
  }
}
</script>
