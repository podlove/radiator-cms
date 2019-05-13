<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_new-network__header">
          <div class="r_new-network__header__image has-background-white"></div>
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      title: null
    }
  },
  created() {
    this.$store
      .dispatch('networks/getNetwork', {
        id: this.$route.params.id
      })
      .then(result => {
        this.id = result.id
        this.title = result.title
      })
      .catch(error => {
        console.warn(error)
        this.$router.push('/404')
      })
  }
}
</script>
