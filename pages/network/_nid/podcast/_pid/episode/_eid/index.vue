<template>
  <!-- EPISODE PAGE -->
  <!-- path: `/networks/[network_id]/podcasts/[podcast_id]/episodes/[episode_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_episode-hero">
        <div
          class="r_episode-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              episode && episode.audio && episode.audio.image
                ? episode.audio.image
                : ''
            })`
          }"
        ></div>
        <div class="r_episode-hero__container">
          <h1 v-if="episode" class="title is-size-3 r_podcast-hero__title">
            {{ episode.title }}
            <b-tooltip
              v-if="episode && episode.publicPage"
              label="Open public podcast page in new tab"
              type="is-dark"
            >
              <a :href="podcast.publicPage" target="_blank">
                <b-button
                  type="is-text is-light"
                  class="r_episode-hero__button"
                >
                  <b-icon icon="open-in-new"></b-icon>
                </b-button>
              </a>
            </b-tooltip>
          </h1>
          <h2 v-if="episode" class="subtitle is-size-6">
            {{ episode.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="r_episode-highlights">
      <EpisodeTags
        :episode="episode"
        @publishEpisode="handlePublishEpisode()"
        @depublishEpisode="handleDepublishEpisode()"
      ></EpisodeTags>
    </section>
    <section class="container r_episode-main">
      <section v-if="episode" class="r_episode-main">
        <b-tabs v-model="activeTab" class="r_network-tabs">
          <b-tab-item label="Content">
            <!-- <div
              v-if="
                episode &&
                  podcast &&
                  typeof episode === 'object' &&
                  typeof podcast === 'object' &&
                  typeof episode.audio === 'object' &&
                  episode.audio.audioFiles &&
                  episode.audio.audioFiles.length > 0 &&
                  typeof episode.audio.audioFiles[0] === 'object'
              "
              id="podlove-webplayer"
              class="r_episode_player"
            ></div> -->
            <!-- Title Field -->
            <b-field v-if="episode" label="Title">
              <p class="r_inactive-input">
                <b-input
                  v-if="editable.title"
                  v-model="currentContent.title"
                  type="text"
                  :placeholder="episode.title"
                  class="r_inactive-input__input"
                ></b-input>
                <span v-if="!editable.title" class="r_inactive-input__text">
                  {{ episode.title }}
                </span>
                <b-button
                  v-if="!editable.title"
                  type="is-text"
                  @click.stop.prevent="editable.title = true"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.title"
                  type="is-text"
                  @click.stop.prevent="editable.title = false"
                >
                  <b-icon icon="cancel"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.title"
                  type="is-text"
                  @click.stop.prevent="
                    handleUpdateEpisode('title', {
                      title: currentContent.title
                    })
                  "
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </p>
            </b-field>
            <!-- Subtitle Field -->
            <b-field v-if="episode" label="Subtitle">
              <p class="r_inactive-input">
                <b-input
                  v-if="editable.subtitle"
                  v-model="currentContent.subtitle"
                  type="text"
                  :placeholder="episode.subtitle"
                  class="r_inactive-input__input"
                ></b-input>
                <span v-if="!editable.subtitle" class="r_inactive-input__text">
                  {{ episode.subtitle }}
                </span>
                <b-button
                  v-if="!editable.subtitle"
                  type="is-text"
                  @click.stop.prevent="editable.subtitle = true"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.subtitle"
                  type="is-text"
                  @click.stop.prevent="editable.subtitle = false"
                >
                  <b-icon icon="cancel"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.subtitle"
                  type="is-text"
                  @click.stop.prevent="
                    handleUpdateEpisode('subtitle', {
                      subtitle: currentContent.subtitle
                    })
                  "
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </p>
            </b-field>
            <!-- Summary Field -->
            <b-field v-if="episode" label="Summary">
              <p class="r_inactive-input">
                <b-input
                  v-if="editable.summary"
                  v-model="currentContent.summary"
                  type="textarea"
                  :placeholder="episode.summary"
                  class="r_inactive-input__input"
                ></b-input>
                <span
                  v-if="!editable.summary"
                  class="r_inactive-input__text r_inactive-input__text--textarea"
                >
                  {{ episode.summary }}
                </span>
                <b-button
                  v-if="!editable.summary"
                  type="is-text"
                  @click.stop.prevent="editable.summary = true"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.summary"
                  type="is-text"
                  @click.stop.prevent="editable.summary = false"
                >
                  <b-icon icon="cancel"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.summary"
                  type="is-text"
                  @click.stop.prevent="
                    handleUpdateEpisode('summary', {
                      summary: currentContent.summary
                    })
                  "
                >
                  <b-icon icon="check"></b-icon>
                </b-button>
              </p>
            </b-field>
            <div class="columns">
              <!-- ShortId Field -->
              <b-field v-if="episode" label="Short Id" class="column">
                <p class="r_inactive-input">
                  <b-input
                    v-if="editable.shortId"
                    v-model="currentContent.shortId"
                    :placeholder="episode.shortId"
                    class="r_inactive-input__input"
                  ></b-input>
                  <span v-if="!editable.shortId" class="r_inactive-input__text">
                    {{ episode.shortId }}
                  </span>
                  <b-button
                    v-if="!editable.shortId"
                    type="is-text"
                    @click.stop.prevent="editable.shortId = true"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.shortId"
                    type="is-text"
                    @click.stop.prevent="editable.shortId = false"
                  >
                    <b-icon icon="cancel"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.shortId"
                    type="is-text"
                    @click.stop.prevent="
                      handleUpdateEpisode('shortId', {
                        shortId: currentContent.shortId
                      })
                    "
                  >
                    <b-icon icon="check"></b-icon>
                  </b-button>
                </p>
              </b-field>
              <!-- Number Field -->
              <b-field v-if="episode" label="Number" class="column">
                <p class="r_inactive-input">
                  <b-input
                    v-if="editable.number"
                    v-model="currentContent.number"
                    :placeholder="episode.number"
                    class="r_inactive-input__input"
                  ></b-input>
                  <span v-if="!editable.number" class="r_inactive-input__text">
                    {{ episode.number }}
                  </span>
                  <b-button
                    v-if="!editable.number"
                    type="is-text"
                    @click.stop.prevent="editable.number = true"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.number"
                    type="is-text"
                    @click.stop.prevent="editable.number = false"
                  >
                    <b-icon icon="cancel"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.number"
                    type="is-text"
                    @click.stop.prevent="
                      handleUpdateEpisode('number', {
                        number: currentContent.number
                      })
                    "
                  >
                    <b-icon icon="check"></b-icon>
                  </b-button>
                </p>
              </b-field>
            </div>
            <b-field label="Episode Cover">
              <div class="r_inactive-input__cover">
                <div
                  v-if="!editable.image"
                  class="r_inactive-input__cover__image"
                  :style="{
                    backgroundImage: `url(${
                      episode.image ? episode.image : ''
                    })`
                  }"
                ></div>
                <upload
                  v-if="editable.image"
                  class="field"
                  :state="coverFileState"
                  :type="'IMAGE'"
                  :image="currentContent.image"
                  @dropped="
                    params =>
                      handleUpdateAudio('image', {
                        image: params.file
                      })
                  "
                />
                <b-button
                  v-if="!editable.image"
                  type="is-text"
                  @click.stop.prevent="editable.image = true"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
              </div>
            </b-field>
            <b-field label="Audio File">
              <div>
                <ul>
                  <li
                    v-for="file in episode.audio.audioFiles"
                    :key="file.id"
                    class="r_inactive-input__audiofile"
                  >
                    <div class="r_inactive-input__audiofile__container">
                      <p class="r_inactive-input__audiofile__url">
                        {{ file.title }}
                      </p>
                      <b-tag
                        v-if="file.mimeType"
                        class="r_inactive-input__audiofile__type"
                        type="is-primary"
                        rounded
                      >
                        {{ file.mimeType }}
                      </b-tag>
                      <span class="r_inactive-input__audiofile__duration">
                        {{ episode.audio.durationString }}
                      </span>
                    </div>
                    <b-button
                      type="is-text"
                      @click.prevent="handleDeleteAudioFile(file.id)"
                    >
                      <b-icon icon="delete"></b-icon>
                    </b-button>
                  </li>
                </ul>
                <upload
                  v-if="
                    !episode.audio ||
                      !episode.audio.audioFiles ||
                      episode.audio.audioFiles.length <= 0
                  "
                  class="field"
                  :state="audioFileState"
                  :type="'AUDIO'"
                  :audio="currentContent.audio"
                  :is-not-deletable="true"
                  @dropped="
                    params =>
                      handleCreateAudioFile('audio', {
                        file: params.file
                      })
                  "
                />
              </div>
            </b-field>
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
  width: 100%;
}
.r_episode-hero__button {
  opacity: 0.25;
  transform: scale(0.85);
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
  padding: 2rem 0 2rem 0;
}
.r_episode-main {
  margin: 4rem auto 6rem auto;
}
.r_episode_player {
  text-align: center;
  margin-top: 3rem;
}
.r_inactive-input {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0.5rem 0;
}
.r_inactive-input__audiofile {
  display: flex;
}
.r_inactive-input__audiofile__container {
  background-color: #e8e8e8;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 0.5rem;
  padding: 0.425rem 1rem;
  min-height: 2.375rem;
}
.r_inactive-input__audiofile__url {
  flex-grow: 1;
}
.r_inactive-input__audiofile__type {
  margin: 0 1rem;
}
.r_inactive-input__cover {
  display: flex;
  align-items: flex-start;
}
.r_inactive-input__cover__image {
  background-size: cover;
  border-radius: 50%;
  margin-right: 1rem;
  width: 6rem;
  height: 6rem;
}
.r_inactive-input__input {
  background-color: #e8e8e8;
  border-radius: 0.25rem;
  flex-grow: 1;
  margin-right: 0.5rem;
}
.r_inactive-input__text--textarea {
  min-height: 6.75rem;
}
.r_inactive-input__text {
  background-color: #e8e8e8;
  border-radius: 0.25rem;
  flex-grow: 1;
  margin-right: 0.5rem;
  padding: 0.425rem 1rem;
  min-height: 2.375rem;
}
</style>

<script>
import { mapState } from 'vuex'
import EpisodeTags from '~/components/EpisodeTags'
import Upload from '~/components/Upload'

export default {
  components: {
    EpisodeTags,
    Upload
  },
  data() {
    return {
      activeTab: 0,
      audioFileState: null,
      currentContent: {
        audio: null,
        image: null,
        number: '',
        shortId: '',
        subtitle: '',
        summary: '',
        title: ''
      },
      coverFileState: null,
      editable: {
        audio: false,
        image: false,
        number: false,
        shortId: false,
        subtitle: false,
        summary: false,
        title: false
      }
    }
  },
  computed: {
    ...mapState({
      episode: state => state.episodes.activeEpisode,
      podcast: state => state.podcasts.activePodcast
    })
  },
  // updated() {
  //   const playerConfig = {
  //     title: this.episode.title || '',
  //     subtitle: this.episode.subtitle || '',
  //     description: this.episode.description || '',
  //     publicationDate: this.episode.publishedAt,
  //     poster: this.episode.image,
  //     summary: this.episode.summary,
  //     show: {
  //       title: this.podcast.title,
  //       subtitle: this.podcast.subtitle,
  //       summary: this.podcast.summary,
  //       poster: this.podcast.image
  //     },
  //     duration: '04:15:32',
  //     audio: [
  //       {
  //         url: this.episode.audio.audioFiles[0].directUrl,
  //         mimeType: this.episode.audio.audioFiles[0].mimeType,
  //         size: this.episode.audio.audioFiles[0].byteLength,
  //         title: this.episode.audio.audioFiles[0].title
  //       }
  //     ]
  //   }
  //   window.podlovePlayer('#podlove-webplayer', playerConfig)
  // },
  methods: {
    handleCreateAudioFile(propertyToSetToEditableFalse, data) {
      if (!this.episode.audio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.episode.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('audio/createAudioFile', {
                file: data.file,
                title: data.file.name,
                audioId: this.episode.audio.id,
                episodeId: this.episode.id
              })
              .then(() => {
                this.audioUploadResult = this.episode.audio
                this.audioFileState = 'SUCCESS'
              })
              .catch(error => {
                this.audioFileState = 'ERROR'
                this.alert = {
                  type: 'is-danger',
                  message: error
                }
              })
          })
          .catch(error => {
            this.audioFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      } else {
        this.$store
          .dispatch('audio/createAudioFile', {
            file: data.file,
            title: data.file.name,
            audioId: this.episode.audio.id,
            episodeId: this.episode.id
          })
          .then(() => {
            this.audioUploadResult = this.episode.audio
            this.audioFileState = 'SUCCESS'
          })
          .catch(error => {
            this.audioFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      }
    },
    handleDeleteAudioFile(id) {
      this.$store
        .dispatch('audio/deleteAudioFile', {
          id: id,
          episodeId: this.episode.id
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleDepublishEpisode() {
      this.$store
        .dispatch('episodes/update', {
          title: this.episode.title,
          episodeId: this.episode.id,
          publishState: 'depublished'
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handlePublishEpisode() {
      this.$store
        .dispatch('episodes/update', {
          title: this.episode.title,
          episodeId: this.episode.id,
          publishState: 'published'
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleUpdateAudio(propertyToSetToEditableFalse, data) {
      data.audioId = this.episode.audio.id
      data.episodeId = this.episode.id
      this.$store
        .dispatch('audio/updateAudio', data)
        .then(() => {
          this.editable[propertyToSetToEditableFalse] = false
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleUpdateAudioFile(propertyToSetToEditableFalse, data) {
      data.audioId = this.episode.audio.id
      data.episodeId = this.episode.id
      this.$store
        .dispatch('audio/deleteAudioFile', {
          id: data.audioFileId
        })
        .then(() => {
          this.$store
            .dispatch('audio/createAudioFile', data)
            .then(() => {
              this.editable[propertyToSetToEditableFalse] = false
            })
            .catch(error => {
              console.warn(error)
              this.$router.push('/404')
            })
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleUpdateEpisode(propertyToSetToEditableFalse, data) {
      data.episodeId = this.episode.id
      if (!data.title) {
        data.title = this.episode.title
      }
      this.$store
        .dispatch('episodes/update', data)
        .then(() => {
          console.log('updated')
          this.editable[propertyToSetToEditableFalse] = false
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    }
  }
}
</script>
