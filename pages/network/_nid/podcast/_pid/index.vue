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
          <section class="r_episodes__header">
            <nuxt-link :to="`/new-episode?podcastId=${podcast.id}`">
              <b-button type="is-primary" outlined>
                <b-icon size="is-small" icon="plus-circle"></b-icon>
                <span> New Episode</span>
              </b-button>
            </nuxt-link>
          </section>
          <episodes-table
            v-if="podcast && podcast.episodes && podcast.episodes.length"
            :episodes="podcast.episodes"
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
        <b-tab-item label="Settings">
          <section>
            <b-field label="Podcast Name">
              <b-input
                v-if="isDisabled"
                v-model="podcast.title"
                disabled
              ></b-input>
              <b-input
                v-if="!isDisabled"
                v-model="title"
                :placeholder="podcast.title"
                :is-loading="isLoading"
              ></b-input>
            </b-field>
            <div class="r_settings__interaction">
              <b-button
                v-if="isDisabled"
                type="is-primary"
                outlined
                @click.stop.prevent="edit()"
              >
                Edit Settings
              </b-button>
              <b-button
                v-if="!isDisabled"
                type="is-danger"
                outlined
                @click.stop.prevent="deletePodcast()"
              >
                Delete Podcast
              </b-button>
              <b-button
                v-if="!isDisabled"
                type="is-dark"
                outlined
                @click.stop.prevent="cancel()"
              >
                Cancel
              </b-button>
              <b-button
                v-if="!isDisabled"
                type="is-primary"
                @click.stop.prevent="save()"
              >
                Save
              </b-button>
            </div>
          </section>
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
</template>

<style>
.r_episodes__header {
  text-align: right;
  padding: 0 0 1rem 0;
}
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
.r_settings__interaction {
  margin-top: 1rem;
  text-align: right;
}
</style>

<script>
import { mapState } from 'vuex'
import EpisodesTable from '~/components/EpisodesTable'

export default {
  components: {
    EpisodesTable
  },
  data() {
    return {
      activeTab: 0,
      isDisabled: true,
      isLoading: false,
      title: ''
    }
  },
  computed: mapState({
    podcast: state => state.podcasts.activePodcast
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
          this.$router.push('/networks')
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    edit() {
      this.isDisabled = false
    },
    save() {
      this.isLoading = true
      this.$store
        .dispatch('podcasts/update', {
          podcastId: this.podcast.id,
          title: this.title
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