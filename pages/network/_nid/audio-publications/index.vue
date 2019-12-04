<template>
  <!-- AUDIO PUBLICATIONS PAGE -->
  <!-- path: `/networks/[network_id]/audio-publications` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_audio-pubs-hero">
        <div
          class="r_audio-pubs-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              activeNetwork && activeNetwork.image ? activeNetwork.image : ''
            })`
          }"
        ></div>
        <div class="r_audio-pubs-hero__container">
          <h1
            v-if="activeNetwork"
            class="title is-size-3 r_audio-pubs-hero__title"
          >
            {{ activeNetwork.title }}'s Audio Publications
          </h1>
        </div>
      </div>
    </section>
    <section class="container r_audio-pubs-main">
      <section
        v-if="
          activeNetwork &&
            activeNetwork.audioPublications &&
            activeNetwork.audioPublications.length > 0
        "
        class="r_audio-pubs-main__container"
      >
        <AudioPublicationsTable
          :network="activeNetwork"
        ></AudioPublicationsTable>
      </section>
    </section>
  </section>
</template>

<style>
.r_audio-pubs-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
  width: 100%;
}
.r_audio-pubs-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_audio-pubs-hero__cover {
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_audio-pubs-hero__title {
  font-weight: 400;
}
.r_audio-pubs-main {
  padding: 1rem 0 3rem 0;
}
.r_audio-pubs-main__container {
  padding: 2rem 0 0 0;
}
</style>

<script>
import { mapState } from 'vuex'
import AudioPublicationsTable from '~/components/AudioPublicationsTable'

export default {
  components: {
    AudioPublicationsTable
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork
  })
}
</script>
