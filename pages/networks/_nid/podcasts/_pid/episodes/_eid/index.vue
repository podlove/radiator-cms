<template>
  <!-- EPISODE PAGE -->
  <!-- path: `/networks/[network_id]/podcasts/[podcast_id]/episodes/[episode_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_episode-hero">
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
    <section class="r_episode-highlights">
      <EpisodeTags :episode="episode"></EpisodeTags>
      <EpisodeInfo :episode="episode"></EpisodeInfo>
    </section>
    <section class="container r_episode-main">
      <section v-if="episode" class="r_episode-main">
        <b-tabs v-model="activeTab" class="r_network-tabs">
          <b-tab-item label="Content">
            <div id="podlove-webplayer" class="r_episode_player"></div>
            <EpisodeAudioFiles :episode="episode"></EpisodeAudioFiles>
            <EpisodeContent :episode="episode"></EpisodeContent>
            <EpisodeChapters></EpisodeChapters>
            <EpisodeTranscripts></EpisodeTranscripts>
            <EpisodeContributors :episode="episode"></EpisodeContributors>
          </b-tab-item>
          <b-tab-item label="Analytics">
            <div class="tile">
              <article class="tile is-child notification is-warning">
                <p class="title">Placeholder...</p>
                <p class="subtitle">for episode analytics</p>
              </article>
            </div>
          </b-tab-item>
        </b-tabs>
      </section>
    </section>
  </section>
</template>

<style>
.r_episode-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
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
.r_episode-highlights {
  background-color: #e8e8e8;
  padding: 3.5rem 0 2rem 0;
}
.r_episode-main {
  margin: 6rem auto;
}
.r_episode_player {
  text-align: center;
  margin-top: 3rem;
}
</style>

<script>
import { mapState } from 'vuex'
import EpisodeAudioFiles from '~/components/EpisodeAudioFiles'
import EpisodeChapters from '~/components/EpisodeChapters'
import EpisodeContent from '~/components/EpisodeContent'
import EpisodeContributors from '~/components/EpisodeContributors'
import EpisodeInfo from '~/components/EpisodeInfo'
import EpisodeTags from '~/components/EpisodeTags'
import EpisodeTranscripts from '~/components/EpisodeTranscripts'

export default {
  components: {
    EpisodeAudioFiles,
    EpisodeChapters,
    EpisodeContent,
    EpisodeContributors,
    EpisodeInfo,
    EpisodeTags,
    EpisodeTranscripts
  },
  data() {
    return {
      activeTab: 0,
      cover: null
    }
  },
  computed: mapState({
    episode: state => state.episodes.episode,
    podcast: state => state.podcasts.podcast
  }),
  created() {
    this.$store
      .dispatch('episodes/getEpisode', {
        id: this.$route.params.eid
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/404')
      })
    this.$store.dispatch('podcasts/getPodcast', {
      id: this.$route.params.pid
    })
  },
  updated() {
    if (typeof this.episode === 'object' && typeof this.podcast === 'object') {
      const playerConfig = {
        title: this.episode.title,
        subtitle: this.episode.subtitle,
        description: this.episode.description,
        publicationDate: this.episode.publishedAt,
        poster: this.episode.image,
        summary: this.episode.summary,
        show: {
          title: this.podcast.title,
          subtitle: this.podcast.subtitle,
          summary: this.podcast.summary,
          poster: this.podcast.image
        },
        duration: '04:15:32',
        chapters: this.episode.audio ? this.episode.audio.chapters : null,
        audio: [
          {
            url:
              'http://freakshow.fm/podlove/file/4468/s/download/c/select-show/fs171-invasion.m4a',
            mimeType: 'audio/mp4',
            size: 93260000,
            title: 'Audio MP4'
          },
          {
            url:
              'http://freakshow.fm/podlove/file/4467/s/download/c/select-show/fs171-invasion.mp3',
            mimeType: 'audio/mpeg',
            size: 14665000,
            title: 'Audio MP3'
          },
          {
            url:
              'http://freakshow.fm/podlove/file/4467/s/download/c/select-show/fs171-invasion.oga',
            mimeType: 'audio/ogg',
            size: 94400000,
            title: 'Audio Ogg'
          },
          {
            url:
              'http://freakshow.fm/podlove/file/4467/s/download/c/select-show/fs171-invasion.opus',
            mimeType: 'audio/opus',
            size: 94400000,
            title: 'Audio Opus'
          }
        ],
        reference: {
          config: '//podlove-player.surge.sh/fixtures/example.json',
          share: '//podlove-player.surge.sh/share'
        },
        contributors: [
          {
            name: 'Tim Pritlove',
            avatar:
              'https://freakshow.fm/wp-content/cache/podlove/47/08928e3c26dcb1141d67ad75869619/tim-pritlove_150x150.jpg',
            role: { id: '9', slug: 'team', title: 'Team' },
            group: { id: '1', slug: 'onair', title: 'On Air' },
            comment: null
          },
          {
            name: 'Clemens Schrimpe',
            avatar:
              'https://freakshow.fm/wp-content/cache/podlove/0f/9c18f5e825496b9060337f92814142/clemens-schrimpe_150x150.jpg',
            role: { id: '9', slug: 'team', title: 'Team' },
            group: { id: '1', slug: 'onair', title: 'On Air' },
            comment: null
          },
          {
            name: 'hukl',
            avatar:
              'https://freakshow.fm/wp-content/cache/podlove/8e/f30cbe274c3f5e43dc4a7219676f50/hukl_150x150.jpg',
            role: { id: '9', slug: 'team', title: 'Team' },
            group: { id: '1', slug: 'onair', title: 'On Air' },
            comment: null
          },
          {
            name: 'Denis Ahrens',
            avatar:
              'https://freakshow.fm/wp-content/cache/podlove/b2/425e5c8f180ddf548c95be1c2d7bcf/denis-ahrens_150x150.jpg',
            role: { id: '9', slug: 'team', title: 'Team' },
            group: { id: '1', slug: 'onair', title: 'On Air' },
            comment: null
          },
          {
            name: 'David Scribane',
            avatar:
              'https://freakshow.fm/wp-content/cache/podlove/b3/c8cc8a1989aa0fc4488d473517b1ee/david-scribane_150x150.jpg',
            role: { id: '7', slug: 'composition', title: 'Komposition' },
            group: { id: '3', slug: 'support', title: 'Support' },
            comment: null
          },
          {
            name: 'Xenim Streaming Network',
            avatar:
              'https://freakshow.fm/podlove/image/687474703a2f2f6d6574612e6d6574616562656e652e6d652f6d656469612f6d6574616562656e652f636f6e7472696275746f72732f78656e696d2d73747265616d696e672d6e6574776f726b2e706e67/150/150/0/xenim-streaming-network',
            role: { id: '10', slug: 'streaming', title: 'Streaming' },
            group: { id: '3', slug: 'support', title: 'Support' },
            comment: null
          }
        ]
      }
      window.podlovePlayer('#podlove-webplayer', playerConfig)
    }
  }
}
</script>
