<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body r_network-hero">
        <div
          class="r_network-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              network && network.image ? network.image : ''
            })`
          }"
        ></div>
        <div class="container r_network-hero__container">
          <h2 v-if="network" lass="subtitle is-size-6 r_network-hero__subtitle">
            Podcast Network
          </h2>
          <h1 v-if="network" class="title is-size-3 r_network-hero__title">
            {{ network.title }}
          </h1>
        </div>
      </div>
    </section>
    <section class="r_networks__main">
      <b-tabs v-model="activeTab" class="r_network-tabs">
        <b-tab-item label="Podcasts">
          <ul v-if="network">
            <li
              v-for="podcast in network.podcasts"
              :key="podcast.id"
              class="r_network__podcast"
            >
              <podcast :podcast="podcast" />
            </li>
          </ul>
        </b-tab-item>
        <b-tab-item label="Analytics">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for network analytics</p>
            </article>
          </div>
        </b-tab-item>
        <b-tab-item label="Settings">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for network settings</p>
            </article>
          </div>
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
</template>

<style>
.r_network__podcast {
  margin: 2.5rem 0;
}
.r_network-hero {
  padding-bottom: 2.5rem !important;
  padding-top: 11.25rem !important;
  position: relative;
}
.r_network-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_network-hero__cover {
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_network-hero__subtitle {
  margin-bottom: 0.5rem !important;
}
.r_network-hero__title {
  font-weight: 400;
  margin-bottom: 0.5rem !important;
}
.r_network-tabs {
  margin: 3.75rem 0.75rem;
}
</style>

<script>
import Podcast from '~/components/Podcast'

export default {
  components: {
    Podcast
  },
  data() {
    return {
      activeTab: 0,
      network: null
    }
  },
  created() {
    this.$store
      .dispatch('networks/getNetwork', {
        id: this.$route.params.nid
      })
      .then(result => {
        this.network = result
        console.log(this.network)
      })
      .catch(error => {
        console.warn(error)
        this.$router.push('/404')
      })
  }
}
</script>
