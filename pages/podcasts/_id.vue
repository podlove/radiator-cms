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
  // Todo: validate podcast id
  validate({ params, query, store }) {
    return true
  },
  data() {
    return {
      id: null,
      title: null
    }
  },
  created() {
    this.$store
      .dispatch('podcasts/getPodcast', {
        id: 1
      })
      .then(result => {
        this.id = result.id
        this.title = result.title
      })
  }
}
</script>
