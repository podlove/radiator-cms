<template>
  <!-- PODCAST PAGE -->
  <!-- path: `/networks/[network_id]/podcasts/[podcast_id]/episodes` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_podcast-hero">
        <div
          class="r_podcast-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              podcast && podcast.image ? podcast.image : ''
            })`
          }"
        ></div>
        <div class="r_podcast-hero__container">
          <h1 v-if="podcast" class="title is-size-3 r_podcast-hero__title">
            {{ podcast.title }}
          </h1>
          <h2 v-if="podcast" class="subtitle is-size-6">
            {{ podcast.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="container">
      <b-tabs v-model="activeTab" class="r_podcast-tabs">
        <b-tab-item label="Episodes">
          <episodes :podcast="podcast"></episodes>
        </b-tab-item>
        <b-tab-item label="Analytics">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for podcast analytics</p>
            </article>
          </div>
        </b-tab-item>
        <b-tab-item label="Settings">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for podcast settings</p>
            </article>
          </div>
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
</template>

<style>
.r_podcast-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
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
}
.r_podcast-tabs {
  margin: 3.75rem 0;
}
</style>

<script>
import { mapState } from 'vuex'
import Episodes from '~/components/Episodes'

export default {
  components: {
    Episodes
  },
  data() {
    return {
      activeTab: 0
    }
  },
  computed: mapState({
    podcast: state => state.podcasts.podcast
  }),
  created() {
    this.$store
      .dispatch('podcasts/getPodcast', {
        id: this.$route.params.pid
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/404')
      })
  }
}
</script>
