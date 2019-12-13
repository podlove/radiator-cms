<template>
  <!-- NEW EPISODE PAGE -->
  <!-- path: `/network/[network_id]/podcast/[podcast_id]/new-episode` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_new-episode-hero">
        <div
          class="r_new-episode__header__image has-background-light"
          :style="{
            backgroundImage: `url(${
              activeAudio && activeAudio.image ? activeAudio.image : ''
            })`
          }"
        ></div>
        <div class="r_new-episode__header__container">
          <h1 class="title is-size-3 r_new-episode__header__title">
            {{ number }}
            <span v-if="number"> - </span>
            {{ title }}
          </h1>
          <h2 class="subtitle is-size-6">
            {{ subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="container r_new-episode__main">
      <b-notification
        v-if="alert"
        :type="alert.type"
        has-icon
        aria-close-label="Close notification"
      >
        {{ alert.message }}
      </b-notification>
      <div class="columns">
        <b-field class="column is-four-fifths" label="Title">
          <b-input v-model="title" placeholder="Episode title"></b-input>
        </b-field>
        <b-field class="column" label="Number">
          <b-numberinput
            v-model="number"
            controls-position="compact"
            placeholder="1"
          ></b-numberinput>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Subtitle">
          <b-input v-model="subtitle" placeholder="Episode subtitle"></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Summary">
          <b-input
            v-model="summary"
            placeholder="Episode summary"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
      <div class="columns">
        <upload
          class="field column"
          label="Audio File"
          :state="audioFileState"
          :type="'AUDIO'"
          :audio="
            audioUploadResult && audioUploadResult.public_url
              ? audioUploadResult.public_url
              : null
          "
          @dropped="params => handleAudioFileDrop(params)"
        />
      </div>
      <div class="columns">
        <upload
          class="field column"
          label="Episode Cover"
          :type="'IMAGE'"
          :drop-files="dropEpisodeCover"
          :image="activeAudio && activeAudio.image ? activeAudio.image : null"
          :state="coverFileState"
          @dropped="params => handleCoverFileDrop(params)"
        />
      </div>
      <b-field label="Contributions">
        <ContributionsField
          :contributions="activeAudio ? activeAudio.contributions : null"
          @addContributionModalOpen="() => (addContributionModalOpen = true)"
          @delete="contributor => handleDeleteContributor(contributor)"
          @edit="contributor => handleEditContributor(contributor)"
        ></ContributionsField>
      </b-field>
      <b-button
        type="is-primary"
        outlined
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="createEpisode()"
      >
        Add New Episode
      </b-button>
    </section>
    <NewContributorModal
      :contribution-roles="contributionRoles"
      :is-modal-active="addContributionModalOpen"
      :persons="activeNetwork ? activeNetwork.people : null"
      @contributorAdded="contributor => handleNewContributor(contributor)"
      @contributorSelected="
        contributor => handleContributorSelected(contributor)
      "
    ></NewContributorModal>
    <EditContributorModal
      v-if="
        activeEpisode &&
          activeEpisode.audio &&
          activeEpisode.audio.contributions
      "
      :contribution-roles="contributionRoles"
      :is-modal-active="isEditContributorModalActive"
      :contributor="activeContributor"
      @contributorUpdated="id => handleUpdateContributor(id)"
    ></EditContributorModal>
  </section>
</template>

<style>
.r_empty-contributions {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.r_new-episode-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
  width: 100%;
}
.r_new-episode__header__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_new-episode__header {
  align-items: flex-end;
  display: flex;
  justify-content: flex-start;
}
.r_new-episode__header__image {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-right: 20px;
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_new-episode__header__title {
  font-weight: 400;
}
.r_new-episode__main {
  margin: 5rem auto;
}
</style>

<script>
import { mapState } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'

import ContributionsField from '~/components/ContributionsField'
import EditContributorModal from '~/components/EditContributorModal'
import NewContributorModal from '~/components/NewContributorModal'
import Upload from '~/components/Upload'

export default {
  components: {
    ContributionsField,
    EditContributorModal,
    NewContributorModal,
    Upload
  },
  data() {
    return {
      activeContributor: null,
      addContributionModalOpen: false,
      alert: null,
      // can be LOADING, ERROR, SUCCESS
      audioFileState: null,
      audioUploadResult: null,
      cover: null,
      coverFileState: null,
      summary: '',
      dropEpisodeCover: null,
      id: null,
      isEditContributorModalActive: false,
      isNewContributorModalActive: false,
      loading: false,
      number: 1,
      subtitle: null,
      title: null
    }
  },
  computed: mapState({
    contributionRoles: state => state.contributions.contributionRoles,
    activeAudio: state => state.audio.activeAudio,
    activeEpisode: state => state.episodes.activeEpisode,
    activePodcast: state => state.podcasts.activePodcast,
    activeNetwork: state => state.networks.activeNetwork
  }),
  methods: {
    createEpisode() {
      this.loading = true
      if (!this.activeEpisode) {
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(result => {
            this.loading = false
            Toast.open({
              message:
                'Your new episode was susccessfully created. You will be redirected to your new episode page.',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.push(
                `/network/${this.activeNetwork.id}/podcast/${
                  this.activePodcast.id
                }/episode/${this.activeEpisode.id}`
              )
            }, 1000)
          })
          .catch(error => {
            this.loading = false
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      } else {
        this.$store
          .dispatch('episodes/update', {
            episodeId: this.activeEpisode.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number,
            image: this.cover
          })
          .then(() => {
            this.loading = false
            Toast.open({
              message:
                'Your new episode was susccessfully created. You will be redirected to your new episode page.',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.push(
                `/network/${this.activeNetwork.id}/podcast/${
                  this.activePodcast.id
                }/episode/${this.activeEpisode.id}`
              )
            }, 1000)
          })
          .catch(error => {
            this.loading = false
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      }
    },
    handleAudioFileDrop(params) {
      this.audioFileState = 'LOADING'
      // Check if there is an activeEpisode object in store
      // and if not create one first
      // TODO: refactor
      if (!this.activeEpisode) {
        console.log('1')
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(() => {
            this.$store
              .dispatch('audio/createPodcastAudio', {
                episodeId: this.activeEpisode.id,
                title: this.title
              })
              .then(() => {
                this.$store
                  .dispatch('audio/createAudioFile', {
                    file: params.file,
                    title: params.file.name,
                    byteSize: params.file.size,
                    mimeType: params.file.type,
                    audioId: this.activeAudio.id
                  })
                  .then(() => {
                    this.audioUploadResult = this.activeAudio
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
          })
          .catch(error => {
            this.audioFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      } else if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.activeEpisode.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('audio/createAudioFile', {
                file: params.file,
                title: params.file.name,
                byteSize: params.file.size,
                mimeType: params.file.type,
                audioId: this.activeAudio.id
              })
              .then(() => {
                this.audioUploadResult = this.activeAudio
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
            file: params.file,
            title: params.file.name,
            byteSize: params.file.size,
            mimeType: params.file.type,
            audioId: this.activeAudio.id
          })
          .then(() => {
            this.audioUploadResult = this.activeAudio
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
      if (!this.activeEpisode) {
        console.log('1')
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(() => {
            this.$store
              .dispatch('audio/createPodcastAudio', {
                episodeId: this.activeEpisode.id,
                title: this.title
              })
              .then(() => {
                this.$store
                  .dispatch('contributions/create', {
                    audioId: this.activeAudio.id,
                    episodeId: this.activeEpisode.id,
                    podcastId: this.activePodcast.id,
                    contributionRoleId: contributor.contributionRoleId,
                    personId: contributor.id
                  })
                  .catch(error => {
                    console.warn(error)
                    this.$router.push('/404')
                  })
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
      } else if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.activeEpisode.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('contributions/create', {
                audioId: this.activeAudio.id,
                episodeId: this.activeEpisode.id,
                podcastId: this.activePodcast.id,
                contributionRoleId: contributor.contributionRoleId,
                personId: contributor.id
              })
              .catch(error => {
                console.warn(error)
                this.$router.push('/404')
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
          .dispatch('contributions/create', {
            audioId: this.activeAudio.id,
            episodeId: this.activeEpisode.id,
            podcastId: this.activePodcast.id,
            contributionRoleId: contributor.contributionRoleId,
            personId: contributor.id
          })
          .catch(error => {
            console.warn(error)
            this.$router.push('/404')
          })
      }
    },
    handleCoverFileDrop(params) {
      console.log('cover', params)
      this.coverFileState = 'LOADING'
      this.cover = params.file
      // Check if there is an activeAudio object in store
      // and if not create one first
      // TODO: refactor
      console.log('this.activeEpisode', this.activeEpisode)
      if (!this.activeEpisode) {
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(() => {
            this.$store
              .dispatch('audio/createPodcastAudio', {
                episodeId: this.activeEpisode.id,
                title: this.title,
                image: params.file
              })
              .then(() => {
                this.coverFileState = 'SUCCESS'
              })
              .catch(error => {
                this.coverFileState = 'ERROR'
                this.alert = {
                  type: 'is-danger',
                  message: error
                }
              })
          })
          .catch(error => {
            this.coverFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      } else if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.activeEpisode.id,
            title: this.title,
            image: params.file
          })
          .then(() => {
            this.coverFileState = 'SUCCESS'
          })
          .catch(error => {
            this.coverFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      } else {
        this.$store
          .dispatch('audio/updateAudio', {
            audioId: this.activeAudio.id,
            title: this.title,
            image: params.file
          })
          .then(() => {
            this.coverFileState = 'SUCCESS'
          })
          .catch(error => {
            this.coverFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      }
    },
    handleDeleteContributor(id) {
      console.log('delete id', id)
      if (!this.activeEpisode) {
        console.log('1')
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(() => {
            this.$store
              .dispatch('audio/createPodcastAudio', {
                episodeId: this.activeEpisode.id,
                title: this.title
              })
              .then(() => {
                this.$store
                  .dispatch('contributions/deleteContribution', {
                    contributionId: id,
                    episodeId: this.activeEpisode.id,
                    podcastId: this.activePodcast.id
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
      } else if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.activeEpisode.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('contributions/deleteContribution', {
                contributionId: id,
                episodeId: this.activeEpisode.id,
                podcastId: this.activePodcast.id
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
          .dispatch('contributions/deleteContribution', {
            contributionId: id,
            episodeId: this.activeEpisode.id,
            podcastId: this.activePodcast.id
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
      }
    },
    handleEditContributor(contributor) {
      console.log('edit contributor', contributor)
      this.activeContributor = contributor
      this.isEditContributorModalActive = true
    },
    handleNewContributor(contributor) {
      console.log('handle new contributor', contributor, this.activeEpisode)
      this.isNewContributorModalActive = false
      if (!this.activeEpisode) {
        console.log('1')
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(() => {
            this.$store
              .dispatch('audio/createPodcastAudio', {
                episodeId: this.activeEpisode.id,
                title: this.title
              })
              .then(() => {
                this.$store
                  .dispatch('people/create', {
                    displayName: contributor.displayName || null,
                    image: contributor.image || null,
                    name: contributor.name || null,
                    networkId: this.activeNetwork.id,
                    nick: contributor.nick || null,
                    podcastId: this.activePodcast.id
                  })
                  .then(result => {
                    console.log('result', result)
                    this.$store
                      .dispatch('contributions/create', {
                        audioId: this.activeAudio.id,
                        episodeId: this.activeEpisode.id,
                        podcastId: this.activePodcast.id,
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
      } else if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.activeEpisode.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('people/create', {
                displayName: contributor.displayName || null,
                image: contributor.image || null,
                name: contributor.name || null,
                networkId: this.activeNetwork.id,
                nick: contributor.nick || null,
                podcastId: this.activePodcast.id
              })
              .then(result => {
                console.log('result', result)
                this.$store
                  .dispatch('contributions/create', {
                    audioId: this.activeAudio.id,
                    episodeId: this.activeEpisode.id,
                    podcastId: this.activePodcast.id,
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
          .dispatch('people/create', {
            displayName: contributor.displayName || null,
            image: contributor.image || null,
            name: contributor.name || null,
            networkId: this.activeNetwork.id,
            nick: contributor.nick || null,
            podcastId: this.activePodcast.id
          })
          .then(result => {
            console.log('result', result)
            this.$store
              .dispatch('contributions/create', {
                audioId: this.activeAudio.id,
                episodeId: this.activeEpisode.id,
                podcastId: this.activePodcast.id,
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
      }
    },
    handleUpdateContributor(contributor) {
      console.log('update contributor', contributor)
      this.isEditContributorModalActive = false
      if (!this.activeEpisode) {
        console.log('1')
        this.$store
          .dispatch('episodes/create', {
            podcastId: this.activePodcast.id,
            title: this.title,
            subtitle: this.subtitle,
            summary: this.summary,
            number: this.number
          })
          .then(() => {
            this.$store
              .dispatch('audio/createPodcastAudio', {
                episodeId: this.activeEpisode.id,
                title: this.title
              })
              .then(() => {
                this.$store
                  .dispatch('people/update', {
                    contributionId: this.activeContributor.id,
                    contributionRoleId: contributor.contributionRoleId,
                    displayName: contributor.displayName,
                    email: contributor.email,
                    episodeId: this.activeEpisode.id,
                    image: contributor.image,
                    link: contributor.link,
                    name: contributor.name,
                    networkId: this.activeNetwork.id,
                    nick: contributor.nick,
                    personId: this.activeContributor.person.id,
                    podcastId: this.activePodcast.id
                  })
                  .catch(error => {
                    console.log(error)
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
          })
          .catch(error => {
            this.audioFileState = 'ERROR'
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      } else if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createPodcastAudio', {
            episodeId: this.activeEpisode.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('people/update', {
                contributionId: this.activeContributor.id,
                contributionRoleId: contributor.contributionRoleId,
                displayName: contributor.displayName,
                email: contributor.email,
                episodeId: this.activeEpisode.id,
                image: contributor.image,
                link: contributor.link,
                name: contributor.name,
                networkId: this.activeNetwork.id,
                nick: contributor.nick,
                personId: this.activeContributor.person.id,
                podcastId: this.activePodcast.id
              })
              .catch(error => {
                console.log(error)
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
          .dispatch('people/update', {
            contributionId: this.activeContributor.id,
            contributionRoleId: contributor.contributionRoleId,
            displayName: contributor.displayName,
            email: contributor.email,
            episodeId: this.activeEpisode.id,
            image: contributor.image,
            link: contributor.link,
            name: contributor.name,
            networkId: this.activeNetwork.id,
            nick: contributor.nick,
            personId: this.activeContributor.person.id,
            podcastId: this.activePodcast.id
          })
          .catch(error => {
            console.log(error)
            this.alert = {
              type: 'is-danger',
              message: error
            }
          })
      }
    },
    toast() {
      Toast.open(this.alert)
    }
  }
}
</script>
