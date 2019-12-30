<template>
  <!-- EPISODE PAGE -->
  <!-- path: `/networks/[network_id]/podcasts/[podcast_id]/episodes/[episode_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_episode-hero">
        <div
          :style="{
            backgroundImage: `url(${
              episode && episode.audio && episode.audio.image
                ? episode.audio.image
                : ''
            })`
          }"
          class="r_episode-hero__cover has-background-light"
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
            <b-field v-if="episode" label="Title">
              <p class="r_inactive-input">
                <b-input
                  v-if="editable.title"
                  v-model="currentContent.title"
                  :placeholder="episode.title"
                  type="text"
                  class="r_inactive-input__input"
                ></b-input>
                <span v-if="!editable.title" class="r_inactive-input__text">
                  {{ episode.title }}
                </span>
                <b-button
                  v-if="!editable.title"
                  @click.stop.prevent="editable.title = true"
                  type="is-text"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.title"
                  @click.stop.prevent="editable.title = false"
                  type="is-text"
                >
                  <b-icon icon="cancel"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.title"
                  @click.stop.prevent="
                    handleUpdateEpisode('title', {
                      title: currentContent.title
                    })
                  "
                  type="is-text"
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
                  :placeholder="episode.subtitle"
                  type="text"
                  class="r_inactive-input__input"
                ></b-input>
                <span v-if="!editable.subtitle" class="r_inactive-input__text">
                  {{ episode.subtitle }}
                </span>
                <b-button
                  v-if="!editable.subtitle"
                  @click.stop.prevent="editable.subtitle = true"
                  type="is-text"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.subtitle"
                  @click.stop.prevent="editable.subtitle = false"
                  type="is-text"
                >
                  <b-icon icon="cancel"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.subtitle"
                  @click.stop.prevent="
                    handleUpdateEpisode('subtitle', {
                      subtitle: currentContent.subtitle
                    })
                  "
                  type="is-text"
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
                  :placeholder="episode.summary"
                  type="textarea"
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
                  @click.stop.prevent="editable.summary = true"
                  type="is-text"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.summary"
                  @click.stop.prevent="editable.summary = false"
                  type="is-text"
                >
                  <b-icon icon="cancel"></b-icon>
                </b-button>
                <b-button
                  v-if="editable.summary"
                  @click.stop.prevent="
                    handleUpdateEpisode('summary', {
                      summary: currentContent.summary
                    })
                  "
                  type="is-text"
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
                    @click.stop.prevent="editable.shortId = true"
                    type="is-text"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.shortId"
                    @click.stop.prevent="editable.shortId = false"
                    type="is-text"
                  >
                    <b-icon icon="cancel"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.shortId"
                    @click.stop.prevent="
                      handleUpdateEpisode('shortId', {
                        shortId: currentContent.shortId
                      })
                    "
                    type="is-text"
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
                    @click.stop.prevent="editable.number = true"
                    type="is-text"
                  >
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.number"
                    @click.stop.prevent="editable.number = false"
                    type="is-text"
                  >
                    <b-icon icon="cancel"></b-icon>
                  </b-button>
                  <b-button
                    v-if="editable.number"
                    @click.stop.prevent="
                      handleUpdateEpisode('number', {
                        number: currentContent.number
                      })
                    "
                    type="is-text"
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
                  :style="{
                    backgroundImage: `url(${
                      episode.image ? episode.image : ''
                    })`
                  }"
                  class="r_inactive-input__cover__image"
                ></div>
                <upload
                  v-if="editable.image"
                  :state="coverFileState"
                  :type="'IMAGE'"
                  :image="currentContent.image"
                  @dropped="
                    params =>
                      handleUpdateAudio('image', {
                        image: params.file
                      })
                  "
                  class="field"
                />
                <b-button
                  v-if="!editable.image"
                  @click.stop.prevent="editable.image = true"
                  type="is-text"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
              </div>
            </b-field>
            <b-field label="Audio File">
              <div>
                <ul v-if="episode.audio">
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
                      @click.prevent="handleDeleteAudioFile(file.id)"
                      type="is-text"
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
                  class="field"
                />
              </div>
            </b-field>
            <b-field label="Contributions">
              <ContributionsField
                v-if="episode.audio"
                :contributions="episode.audio.contributions"
                @addContributionModalOpen="
                  () => (isNewContributorModalActive = true)
                "
                @delete="contributor => handleDeleteContributor(contributor)"
                @edit="contributor => handleEditContributor(contributor)"
              ></ContributionsField>
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
    <NewContributorModal
      :active="isNewContributorModalActive"
      :contribution-roles="contributionRoles"
      :persons="network ? network.people : null"
      @close="() => (isNewContributorModalActive = false)"
      @contributorAdded="contributor => handleNewContributor(contributor)"
      @contributorSelected="
        contributor => handleContributorSelected(contributor)
      "
    ></NewContributorModal>
    <EditContributorModal
      v-if="episode && episode.audio && episode.audio.contributions"
      :active="isEditContributorModalActive"
      :contribution-roles="contributionRoles"
      :contributor="activeContributor"
      @close="() => (isEditContributorModalActive = false)"
      @contributorUpdated="id => handleUpdateContributor(id)"
    ></EditContributorModal>
    <EpisodeTranscripts></EpisodeTranscripts>
  </section>
</template>

<style>
/* Overwrite Bulma */
.field:not(:last-child) {
  margin-bottom: 1.5rem !important;
}
.r_empty-contributions {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
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
  background-color: #e8e8e8;
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
import ContributionsField from '~/components/ContributionsField'
import EditContributorModal from '~/components/EditContributorModal'
import EpisodeTags from '~/components/EpisodeTags'
import EpisodeTranscripts from '~/components/EpisodeTranscripts'
import NewContributorModal from '~/components/NewContributorModal'
import Upload from '~/components/Upload'

export default {
  components: {
    ContributionsField,
    EditContributorModal,
    EpisodeTags,
    EpisodeTranscripts,
    NewContributorModal,
    Upload
  },
  data() {
    return {
      activeContributor: null,
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
      },
      isEditContributorModalActive: false,
      isNewContributorModalActive: false
    }
  },
  computed: {
    ...mapState({
      contributionRoles: state => state.contributions.contributionRoles,
      episode: state => state.episodes.activeEpisode,
      network: state => state.networks.activeNetwork,
      podcast: state => state.podcasts.activePodcast
    })
  },
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
    handleContributorSelected(contributor) {
      this.$store
        .dispatch('contributions/create', {
          audioId: this.episode.audio.id,
          episodeId: this.episode.id,
          podcastId: this.podcast.id,
          contributionRoleId: contributor.contributionRoleId,
          personId: contributor.id
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
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
    handleDeleteContributor(id) {
      this.$store
        .dispatch('contributions/deleteContribution', {
          contributionId: id,
          episodeId: this.episode.id,
          podcastId: this.podcast.id
        })
        .then(() => {
          this.alert = {
            type: 'is-success',
            message: 'Contributor successfully removed.'
          }
        })
        .catch(error => {
          console.log(error)
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    handleDepublishEpisode() {
      this.$store
        .dispatch('episodes/depublishEpisode', {
          episodeId: this.episode.id
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleEditContributor(contributor) {
      this.activeContributor = contributor
      this.isEditContributorModalActive = true
    },
    handleNewContributor(contributor) {
      this.isNewContributorModalActive = false
      this.$store
        .dispatch('people/create', {
          displayName: contributor.displayName || null,
          image: contributor.image || null,
          name: contributor.name || null,
          networkId: this.network.id,
          nick: contributor.nick || null,
          podcastId: this.podcast.id
        })
        .then(result => {
          this.$store
            .dispatch('contributions/create', {
              audioId: this.episode.audio.id,
              episodeId: this.episode.id,
              podcastId: this.podcast.id,
              contributionRoleId: contributor.contributionRoleId,
              personId: result.id
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
    handlePublishEpisode() {
      this.$store
        .dispatch('episodes/publishEpisode', {
          episodeId: this.episode.id
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
    handleUpdateContributor(contributor) {
      this.isEditContributorModalActive = false
      this.activeContributor = null
      this.$store
        .dispatch('people/update', {
          contributionId: this.activeContributor.id,
          contributionRoleId: contributor.contributionRoleId,
          displayName: contributor.displayName,
          email: contributor.email,
          episodeId: this.episode.id,
          image: contributor.image,
          link: contributor.link,
          name: contributor.name,
          networkId: this.network.id,
          nick: contributor.nick,
          personId: this.activeContributor.person.id,
          podcastId: this.podcast.id
        })
        .catch(error => {
          console.log(error)
          this.alert = {
            type: 'is-danger',
            message: error
          }
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
