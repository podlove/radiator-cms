<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body r_episode-hero">
        <div
          class="r_episode-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${cover ? cover : ''})`
          }"
        ></div>
        <div class="r_episode-hero__container">
          <h1 v-if="episode" class="title is-size-3 r_podcast-hero__title">
            {{ episode.title }}
          </h1>
          <h2 v-if="episode" class="subtitle is-size-6">
            {{ episode.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="container r_episode-main">
      <section v-if="episode" class="r_episode-main">
        <EpisodeTags :episode="episode"></EpisodeTags>
        <EpisodeInfo :episode="episode"></EpisodeInfo>
        <EpisodeAudioFiles :episode="episode"></EpisodeAudioFiles>
        <EpisodeContent :episode="episode"></EpisodeContent>
        <EpisodeChapters :episode="episode"></EpisodeChapters>
        <EpisodeContributors :episode="episode"></EpisodeContributors>
        <!-- <EpisodeTranscript :episode="episode"></EpisodeTranscript> -->
      </section>
    </section>
  </section>
</template>

<style>
.r_episode-hero {
  padding-bottom: 2.5rem !important;
  padding-top: 11.25rem !important;
  position: relative;
}
.r_episode-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_episode-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_episode-hero__title {
  font-weight: 400;
}
.r_episode-main {
  margin: 6rem auto;
}
</style>

<script>
import EpisodeAudioFiles from '~/components/EpisodeAudioFiles'
import EpisodeChapters from '~/components/EpisodeChapters'
import EpisodeContent from '~/components/EpisodeContent'
import EpisodeContributors from '~/components/EpisodeContributors'
import EpisodeInfo from '~/components/EpisodeInfo'
import EpisodeTags from '~/components/EpisodeTags'

export default {
  components: {
    EpisodeAudioFiles,
    EpisodeChapters,
    EpisodeContent,
    EpisodeContributors,
    EpisodeInfo,
    EpisodeTags
  },
  data() {
    return {
      cover: null,
      episode: null
    }
  },
  created() {
    this.$store
      .dispatch('episodes/getEpisode', {
        id: this.$route.params.eid
      })
      .then(result => {
        this.episode = result
        if (result && result.image) {
          this.cover = result.image
        } else if (result.podcast && result.podcast.image) {
          this.cover = result.podcast.image
        }
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/404')
      })
  }
}
</script>
