<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body r_podcast-hero">
        <div
          class="r_podcast-hero__cover has-background-light"
          :style="{ backgroundImage: `url(${podcast ? podcast.image : ''})` }"
        ></div>
        <div class="container r_podcast-hero__container">
          <h1 v-if="podcast" class="title is-size-3 r_podcast-hero__title">
            {{ podcast.title }}
          </h1>
          <h1 v-if="podcast" lass="subtitle is-size-6">
            {{ podcast.subtitle }}
          </h1>
        </div>
      </div>
    </section>
    <b-tabs v-model="activeTab" class="r_podcast-tabs">
      <b-tab-item label="Episodes">
        <episodes :podcast="podcast"></episodes>
      </b-tab-item>
      <b-tab-item label="Analytics"></b-tab-item>
      <b-tab-item label="Settings"></b-tab-item>
    </b-tabs>
  </section>
</template>

<style>
.r_podcast-hero {
  padding-bottom: 2.5rem !important;
  padding-top: 11.25rem !important;
  position: relative;
}
.r_podcast-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_podcast-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_podcast-hero__title {
  font-weight: 400;
  margin-bottom: 0.5rem !important;
}
.r_podcast-tabs {
  margin: 3.75rem 0.75rem;
}
</style>

<script>
import Episodes from '~/components/Episodes'

export default {
  components: {
    Episodes
  },
  data() {
    return {
      activeTab: 0,
      podcast: null
    }
  },
  created() {
    this.$store
      .dispatch('podcasts/getPodcast', {
        id: this.$route.params.id
      })
      .then(result => {
        console.log(result)
        this.podcast = result
      })
      .catch(error => {
        console.warn(error)
        this.$router.push('/404')
      })
  }
}
</script>
