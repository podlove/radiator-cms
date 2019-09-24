<template>
  <section class="r_podcasts">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_podcasts__header">
          <h1 class="title">Import Podcast</h1>
        </div>
      </div>
    </section>
    <section class="container podcasts__main podcast__import">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
        <b-step-item label="Enter Url">
          <section>
            <b-field horizontal label="Import from Url">
              <b-input v-model="url" placeholder="Enter RSS Feed or Website">
              </b-input>
            </b-field>
            <b-field horizontal label="Network">
              <b-select
                v-model="networkId"
                placeholder="Select a podcast network"
                required
              >
                <option
                  v-for="network in networks"
                  :key="network.id"
                  :value="network.id"
                >
                  {{ network.title }}
                </option>
              </b-select>
            </b-field>
            <div class="podlove-step-navigation-group">
              <b-button
                class="is-primary"
                :disabled="networkId === null"
                @click.stop.prevent="fetchPodcastInfos()"
              >
                Check Podcast
              </b-button>
            </div>
          </section>
        </b-step-item>
        <b-step-item label="Check Podcast">
          <section>
            <b-loading :active.sync="isFetchingInfos"></b-loading>
            <b-field horizontal label="Feed Url">
              <b-input v-model="url" disabled></b-input>
            </b-field>
            <div class="podcast-name">
              <div
                class="r_podcast__cover has-background-dark"
                :style="{
                  backgroundImage: `url(${
                    feedInfo && feedInfo.image ? feedInfo.image : ''
                  })`
                }"
              ></div>
              <div class="r_podcast__title">
                <h1 class="is-size-5">{{ feedInfo.title }}</h1>
                <h2 class="is-size-7">{{ feedInfo.subtitle }}</h2>
              </div>
            </div>
            <p>
              With
              {{ feedInfo.feeds ? feedInfo.feeds[0].episodeCount : 0 }}
            </p>
            <b-field horizontal label="Limit import to episode count">
              <b-input v-model="episodeCount"></b-input>
            </b-field>
            <b-field horizontal label="Short ID">
              <b-input v-model="feedInfo.suggestedShortId" disabled></b-input>
            </b-field>
            <b-field horizontal label="Podcast Url">
              <b-input v-model="feedInfo.link" disabled></b-input>
            </b-field>
            <div class="field import-switch">
              <b-switch v-model="importMetaData">Import Meta Data</b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importAudioFiles">Import Audio Files</b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importMedia.mp3" :disabled="!importAudioFiles">
                mp3
              </b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importMedia.m4a" :disabled="!importAudioFiles">
                m4a
              </b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importMedia.ogg" :disabled="!importAudioFiles">
                ogg
              </b-switch>
            </div>
            <div class="podlove-step-navigation-group">
              <b-button class="is-primary" @click.stop.prevent="navigateTo(0)">
                Back
              </b-button>
              <b-button
                class="is-primary"
                @click.stop.prevent="fetchEpisodes()"
              >
                Import Podcast
              </b-button>
            </div>
          </section>
        </b-step-item>
        <b-step-item label="Import Episodes">
          <section>
            <div class="podcast-name">
              <div
                class="r_podcast__cover has-background-dark"
                :style="{
                  backgroundImage: `url(${
                    feedInfo && feedInfo.image ? feedInfo.image : ''
                  })`
                }"
              ></div>
              <div class="r_podcast__title">
                <h1 class="is-size-5">{{ feedInfo.title }}</h1>
                <h2 class="r_podcast__subtitle is-size-7">
                  {{ feedInfo.subtitle }}
                </h2>
              </div>
            </div>
            <b-progress
              v-if="
                !(
                  Object.entries(currentTask).length === 0 &&
                  currentTask.constructor === Object
                )
              "
              :value="currentTask.progress"
              :max="currentTask.total"
              type="is-primary"
              size="is-medium"
              show-value
            >
              {{ currentTask.progress }} / {{ currentTask.total }}
            </b-progress>
            <episodes-table
              v-if="podcast && podcast.episodes && podcast.episodes.length"
              :episodes="podcast.episodes"
            ></episodes-table>
            <b-table :data="feeds[0] ? feeds[0].episodes : []" :striped="true">
              <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                  {{ props.row.id }}
                </b-table-column>
                <b-table-column field="title" label="Title">
                  {{ props.row.title }}
                </b-table-column>
                <b-table-column
                  field="mp3"
                  label="mp3"
                  :class="checkField(props.row.mp3)"
                >
                  {{ props.row.mp3 }}
                </b-table-column>
                <b-table-column
                  field="m4a"
                  label="m4a"
                  :class="checkField(props.row.m4a)"
                >
                  {{ props.row.m4a }}
                </b-table-column>
                <b-table-column
                  field="ogg"
                  label="ogg"
                  :class="checkField(props.row.ogg)"
                >
                  {{ props.row.ogg }}
                </b-table-column>
                <b-table-column
                  field="transcripts"
                  label="Transcripts"
                  :class="checkField(props.row.transcripts)"
                >
                  {{ props.row.transcripts }}
                </b-table-column>
                <b-table-column
                  field="chapter_marks"
                  label="Chapter Marks"
                  :class="checkField(props.row.chapter_marks)"
                >
                  {{ props.row.chapter_marks }}
                </b-table-column>
              </template>
            </b-table>
            <div class="podlove-step-navigation-group">
              <b-button class="is-primary" @click.stop.prevent="stopImport()">
                Stop Import
              </b-button>
              <b-button
                class="is-primary"
                @click="$router.push(`/network/${networkId}/podcast/${pid}`)"
              >
                Go to Podcast Overview
              </b-button>
            </div>
          </section>
        </b-step-item>
      </b-steps>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import EpisodesTable from '~/components/EpisodesTable'

export default {
  components: {
    EpisodesTable
  },
  data() {
    return {
      activeStep: 0,
      episodeCount: 0,
      importAudioFiles: false,
      importMedia: {
        mp3: false,
        m4a: false,
        ogg: false
      },
      importMetaData: true,
      networkId: null,
      pid: null,
      url: 'https://www.zeitsprung.fm/feed/mp3/'
    }
  },
  computed: {
    ...mapState({
      networks: state => state.networks.networks,
      feedInfo: state => state.feedInfo.feedInfo,
      feeds: state => state.feedInfo.feeds,
      currentTask: state => state.feedInfo.currentTask,
      podcast: state => state.podcasts.activePodcast
    }),
    isFetchingInfos() {
      return (
        Object.entries(this.feedInfo).length === 0 &&
        this.feedInfo.constructor === Object
      )
    }
  },
  methods: {
    checkField(value) {
      return value ? 'is-success' : 'is-danger'
    },
    navigateTo(step) {
      this.activeStep = step
    },
    fetchPodcastInfos() {
      this.$store.dispatch('feedInfo/catchFeedInfo', {
        url: this.url
      })
      this.navigateTo(1)
    },
    fetchEpisodes() {
      let enclosureType = ''
      let feedUrl = ''

      this.feedInfo.feeds.forEach(d => {
        if (d.enclosureType === 'audio/mpeg') {
          enclosureType = d.enclosureType
          feedUrl = d.feedUrl
        }
      })
      const importPodcastFeed = {
        network_id: this.networkId,
        feed_url: feedUrl,
        enclosure_types: enclosureType,
        short_id: this.feedInfo.suggestedShortId
      }
      this.$store.dispatch('feedInfo/createTask', importPodcastFeed)
      this.navigateTo(2)
      this.observeTaskStatus()
    },
    stopImport() {
      this.$store.dispatch('feedInfo/deleteTask', {
        taskId: this.currentTask.id
      })
    },
    showTask() {
      this.$store.dispatch('feedInfo/readTask', { taskId: this.currentTask.id })
    },
    observeTaskStatus(callback) {
      const self = this
      setTimeout(checkTaskStatus, 0)
      function checkTaskStatus() {
        if (
          self.currentTask._links !== undefined &&
          self.currentTask._links['rad:subject'] !== undefined
        ) {
          const pid = self.currentTask._links['rad:subject'].href.split('/')
          self.pid = pid[pid.length - 1]
          self.$store.dispatch('podcasts/getPodcast', {
            id: self.pid
          })
        }
        if (self.currentTask.id !== undefined) {
          self.$store.dispatch('feedInfo/readTask', {
            taskId: self.currentTask.id
          })
        }
        if (self.currentTask.state !== 'done') {
          setTimeout(checkTaskStatus, 2000)
        } else {
          self.$store.dispatch('feedInfo/deleteTask', {
            taskId: self.currentTask.id
          })
        }
      }
    }
  }
}
</script>

<style lang="scss">
.podcasts__main {
  margin: 40px auto;
}

.step-content {
  margin-top: 2em;
}
.podcast__import {
  text-align: center;
}
.podcast-name {
  display: flex;
  direction: row;
  justify-content: flex-end;
  margin: 1.5em 0 2em 0;
  // align-items: center;
  // align-content: center;
}

.podlove-step-navigation-group {
  margin: 1em 0;
}
.r_podcast__cover {
  background-size: cover;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  margin-right: 10px;
  width: 100px;
  height: 100px;
}

.r_podcast__title {
  text-align: left;
}

.import-switch {
  label.switch {
    flex-direction: row-reverse;

    .control-label {
      padding-left: 0px;
      padding-right: 0.5em;
    }
  }
}
</style>
