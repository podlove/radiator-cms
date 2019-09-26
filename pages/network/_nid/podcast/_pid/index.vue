<template>
  <!-- PODCAST PAGE -->
  <!-- path: `/network/[network_id]/podcast/[podcast_id]` -->
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
            <b-tooltip
              v-if="podcast && podcast.publicPage"
              label="Open public podcast page in new tab"
              type="is-dark"
            >
              <a :href="podcast.publicPage" target="_blank">
                <b-button
                  type="is-text is-light"
                  class="r_podcast-hero__button"
                >
                  <b-icon icon="open-in-new"></b-icon>
                </b-button>
              </a>
            </b-tooltip>
          </h1>
          <h2 v-if="podcast" class="subtitle is-size-6">
            {{ podcast.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="r_podcast-highlights">
      <div
        v-if="podcast && podcast.publishedState"
        class="container r_podcast-highlights__info columns"
      >
        <div class="column">
          <p class="is-size-7 has-text-weight-bold">
            Publishing:
          </p>
          <b-taglist attached>
            <b-tag type="is-dark">Public website:</b-tag>
            <b-tag v-if="podcast.publicPage" type="is-light">
              <a
                class="r_podcast-highlights__link"
                :href="podcast.publicPage"
                target="_blank"
              >
                {{ podcast.publicPage }}
              </a>
            </b-tag>
            <b-tag v-if="!podcast.publicPage" type="is-warning">
              no public website yet
            </b-tag>
          </b-taglist>
          <b-taglist class="r_podcast-highlights__state" attached>
            <b-tag type="is-dark">Publishing state:</b-tag>
            <b-tag v-if="podcast.publishState === 'drafted'" type="is-info">
              Drafted
            </b-tag>
            <b-tag
              v-if="podcast.publishState === 'scheduled'"
              type="is-warning"
            >
              Scheduled
            </b-tag>
            <b-tag
              v-if="podcast.publishState === 'published'"
              type="is-success"
            >
              Published
            </b-tag>
            <b-tag
              v-if="podcast.publishState === 'depublished'"
              type="is-danger"
            >
              Depublished
            </b-tag>
          </b-taglist>
          <b-taglist attached>
            <b-tag type="is-dark">Publishing date:</b-tag>
            <b-tag v-if="podcast.publishedAt" type="is-light">{{
              $moment(podcast.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
            }}</b-tag>
            <b-tag v-if="!podcast.publishedAt" type="is-warning">
              not published yet
            </b-tag>
          </b-taglist>
          <b-button
            v-if="
              podcast.publishState === 'drafted' ||
                podcast.publishState === 'depublished'
            "
            @click.prevent="handlePublishPodcast()"
            class="r_podcast-highlights__button"
            type="is-primary"
          >
            <b-icon size="is-small" icon="cloud-upload"></b-icon>
            <span> Publish Podcast</span>
          </b-button>
          <b-button
            v-if="
              podcast.publishState === 'published' ||
                podcast.publishState === 'scheduled'
            "
            @click.prevent="handleDepublishPodcast()"
            class="r_podcast-highlights__button"
            type="is-danger"
            outlined
          >
            <b-icon size="is-small" icon="cloud-upload"></b-icon>
            <span> Depublish Podcast</span>
          </b-button>
        </div>
        <div class="column">
          <p class="is-size-7 has-text-weight-bold">
            Feeds:
          </p>
          <p
            v-if="!podcast.publishedFeeds || podcast.publishedFeeds.length <= 0"
          >
            No active feeds yet.
          </p>
          <ul
            v-if="podcast.publishedFeeds && podcast.publishedFeeds.length > 0"
          >
            <li v-for="feed in podcast.publishedFeeds" :key="feed.feedUrl">
              <b-taglist attached>
                <b-tag type="is-dark">
                  {{ feed.enclosureMimeType }}
                </b-tag>
                <b-tag type="is-light">
                  <a
                    class="r_podcast-highlights__link"
                    :href="feed.feedUrl"
                    target="_blank"
                  >
                    {{ feed.feedUrl }}
                  </a>
                </b-tag>
              </b-taglist>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="container">
      <b-tabs v-model="activeTab" class="r_podcast-tabs">
        <b-tab-item label="Episodes">
          <section class="r_episodes__header">
            <nuxt-link
              v-if="network && podcast"
              :to="`/network/${network.id}/podcast/${podcast.id}/new-episode`"
            >
              <b-button type="is-primary" outlined>
                <b-icon size="is-small" icon="plus-circle"></b-icon>
                <span> New Episode</span>
              </b-button>
            </nuxt-link>
          </section>
          <episodes-table
            v-if="
              network && podcast && podcast.episodes && podcast.episodes.length
            "
            :episodes="podcast.episodes"
            :network="network"
            :podcast="podcast"
          ></episodes-table>
        </b-tab-item>
        <b-tab-item label="Analytics">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for podcast analytics</p>
            </article>
          </div>
        </b-tab-item>
        <b-tab-item label="Info">
          <podcast-settings
            :is-disabled="isDisabled"
            :is-loading="isLoading"
            :podcast="podcast"
            @cancel="cancel()"
            @delete="deletePodcast()"
            @edit="edit()"
            @save="newPodcastSettings => save(newPodcastSettings)"
          ></podcast-settings>
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
</template>

<style>
/* Overwrite Bulma */
.tags,
.tag {
  margin-bottom: 0 !important;
  margin-top: 0.25rem;
}
.r_episodes__header {
  text-align: right;
  padding: 0 0 1rem 0;
}
.r_podcast-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
  width: 100%;
}
.r_podcast-hero__button {
  opacity: 0.25;
  transform: scale(0.85);
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
.r_podcast-highlights {
  background-color: #e8e8e8;
  padding: 2rem 0 4rem 0;
}
.r_podcast-highlights__button {
  margin-top: 2rem;
}
.r_podcast-highlights__info {
  margin: 1rem auto;
}
.r_podcast-highlights__link,
.r_podcast-highlights__link:hover,
.r_podcast-highlights__link:focus,
.r_podcast-highlights__link:active {
  color: #4a4a4a;
}
.r_podcast-highlights__state {
  margin-right: 1rem;
}
.r_podcast-tabs {
  margin: 3.75rem 0;
}
.r_settings__interaction {
  margin-top: 1rem;
  text-align: right;
}
</style>

<script>
import { mapState } from 'vuex'
import EpisodesTable from '~/components/EpisodesTable'
import PodcastSettings from '~/components/PodcastSettings'

export default {
  components: {
    EpisodesTable,
    PodcastSettings
  },
  data() {
    return {
      activeTab: 0,
      isDisabled: true,
      isLoading: false
    }
  },
  computed: mapState({
    podcast: state => state.podcasts.activePodcast,
    network: state => state.networks.activeNetwork
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
  },
  methods: {
    cancel() {
      this.isDisabled = true
    },
    deletePodcast() {
      this.$store
        .dispatch('podcasts/deletePodcast', {
          podcastId: this.podcast.id
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    edit() {
      this.isDisabled = false
    },
    handleDepublishPodcast() {
      this.$store
        .dispatch('podcasts/update', {
          podcastId: this.podcast.id,
          publishState: 'depublished'
        })
        .then(() => {
          console.log('depublished', this.activePodcast)
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handlePublishPodcast() {
      this.$store
        .dispatch('podcasts/update', {
          podcastId: this.podcast.id,
          publishState: 'published'
        })
        .then(() => {
          console.log('published', this.activePodcast)
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    save(newPodcastSettings) {
      this.isLoading = true
      this.$store
        .dispatch('podcasts/update', {
          podcastId: this.podcast.id,
          author: newPodcastSettings.author,
          image: newPodcastSettings.cover,
          language: newPodcastSettings.language,
          ownerName: newPodcastSettings.ownerName,
          ownerEmail: newPodcastSettings.ownerEmail,
          summary: newPodcastSettings.summary,
          shortId: newPodcastSettings.shortId,
          subtitle: newPodcastSettings.subtitle,
          title: newPodcastSettings.title
        })
        .then(() => {
          this.isDisabled = true
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    }
  }
}
</script>
