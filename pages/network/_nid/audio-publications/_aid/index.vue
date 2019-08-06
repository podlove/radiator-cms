<template>
  <!-- AUDIO PUBLICATION PAGE -->
  <!-- path: `/networks/[network_id]/audio-publications/[audio_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_audio-pub-hero">
        <div
          class="r_audio-pub-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              activeAudio && activeAudio.image ? activeAudio.image : ''
            })`
          }"
        ></div>
        <div class="r_audio-pub-hero__container">
          <h1
            v-if="activeAudio"
            class="title is-size-3 r_audio-pub-hero__title"
          >
            {{ activeAudio.title }}
          </h1>
        </div>
      </div>
    </section>
    <section>
      <!-- editable: title, image, files, contributions, chapters -->
      <!-- show: duration, audioPub state, audioPub publishedAt -->
      <!-- ?? audioPub title -->
    </section>
  </section>
</template>

<style>
.r_audio-pub-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
}
.r_audio-pub-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_audio-pub-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_audio-pub-hero__title {
  font-weight: 400;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    activeAudio: state => state.audio.activeAudio
  })
}
</script>
