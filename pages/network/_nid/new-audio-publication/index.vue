<template>
  <!-- NEW AUDIO PUBLICATION PAGE -->
  <!-- path: `/network/[network_id]/new-audio-publication` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_new-audio-pub-hero">
        <div
          class="r_new-audio-pub__header__image has-background-light"
          :style="{
            backgroundImage: `url(${cover ? cover : ''})`
          }"
        ></div>
        <div class="r_new-audio-pub__header__container">
          <h1 class="title is-size-3 r_new-audio-pub__header__title">
            {{ title }}
          </h1>
        </div>
      </div>
    </section>
    <section class="container r_new-audio-pub__main">
      <b-notification
        v-if="alert"
        :type="alert.type"
        has-icon
        aria-close-label="Close notification"
      >
        {{ alert.message }}
      </b-notification>
      <div class="columns">
        <b-field class="column" label="Title">
          <b-input
            v-model="title"
            placeholder="New Audio Publication"
          ></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Audio File">
          <upload
            class="field"
            :state="audioFileState"
            :type="'AUDIO'"
            :audio="
              audioUploadResult && audioUploadResult.public_url
                ? audioUploadResult.public_url
                : null
            "
            @dropped="params => handleAudioFileDrop(params)"
          />
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Audio Publication Cover">
          <upload
            class="field"
            :state="coverFileState"
            :type="'IMAGE'"
            @dropped="params => handleCoverFileDrop(params)"
          />
        </b-field>
      </div>
      <div>
        <b-field label="Contributions">
          <ContributionsField
            :contributions="activeAudio ? activeAudio.contributions : null"
            @addContributionModalOpen="() => (addContributionModalOpen = true)"
            @delete="id => handleDeleteContributor(id)"
            @edit="contributor => handleEditContributor(contributor)"
          ></ContributionsField>
        </b-field>
      </div>
      <b-button
        type="is-primary"
        outlined
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="createAudioPublication()"
      >
        Add New Audio Publication
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
      :contribution-roles="contributionRoles"
      :is-modal-active="isEditContributorModalActive"
      :contributor="activeContributor"
      @contributorUpdated="contributor => handleUpdateContributor(contributor)"
    ></EditContributorModal>
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
.r_new-audio-pub-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
  width: 100%;
}
.r_new-audio-pub__header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.r_new-audio-pub__header__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_new-audio-pub__header__image {
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
.r_new-audio-pub__main {
  margin: 40px auto;
}
</style>

<script>
import { mapState } from 'vuex'
import { ToastProgrammatic as Toast } from 'buefy'

import Upload from '~/components/Upload'
import ContributionsField from '~/components/ContributionsField'
import EditContributorModal from '~/components/EditContributorModal'
import NewContributorModal from '~/components/NewContributorModal'

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
      isEditContributorModalActive: false,
      isNewContributorModalActive: false,
      loading: false,
      title: 'New Audio Publication'
    }
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork,
    activeAudio: state => state.audio.activeAudio,
    contributionRoles: state => state.contributions.contributionRoles,
    networks: state => state.networks.networks
  }),
  methods: {
    createAudioPublication() {
      this.loading = true
      this.$store
        .dispatch('audio/updateAudioPublication', {
          id: this.activeAudio.audioPublication.id,
          title: this.title,
          audioId: this.activeAudio.id
        })
        .then(() => {
          this.loading = false
          Toast.open({
            message:
              'Your new audio publication was susccessfully created. You will be redirected to the audio publication page.',
            type: 'is-success'
          })
          setTimeout(() => {
            this.$router.replace(
              `/network/${this.activeNetwork.id}/audio-publications/${
                this.activeAudio.id
              }`
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
    },
    handleAudioFileDrop(params) {
      this.audioFileState = 'LOADING'
      // Check if there is an activeAudio object in store
      // and if not create one first
      // TODO: refactor
      console.log('this.activeAudio', this.activeAudio)
      if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createAudio', {
            networkId: this.activeNetwork.id,
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
      if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createAudio', {
            networkId: this.activeNetwork.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('contributions/create', {
                audioId: this.activeAudio.id,
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
            contributionRoleId: contributor.contributionRoleId,
            personId: contributor.id
          })
          .catch(error => {
            console.warn(error)
            this.$router.push('/404')
          })
      }
    },
    handleDeleteContributor(id) {
      if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createAudio', {
            networkId: this.activeNetwork.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('contributions/deleteContribution', {
                contributionId: id,
                audioId: this.activeAudio.id
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
            audioId: this.activeAudio.id
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
    handleCoverFileDrop(params) {
      this.coverFileState = 'LOADING'
      this.cover = params.file
      // Check if there is an activeAudio object in store
      // and if not create one first
      // TODO: refactor
      console.log('this.activeAudio', this.activeAudio)
      if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createAudio', {
            networkId: this.activeNetwork.id,
            title: this.title,
            image: params.file
          })
          .then(() => {
            this.cover = this.activeAudio.image
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
            image: params.file
          })
          .then(() => {
            this.cover = this.activeAudio.image
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
    handleEditContributor(contributor) {
      console.log('edit contributor', contributor)
      this.activeContributor = contributor
      this.isEditContributorModalActive = true
    },
    handleNewContributor(contributor) {
      console.log('handle new contributor', contributor, this.episode)
      this.isNewContributorModalActive = false
      if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createAudio', {
            networkId: this.activeNetwork.id,
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
                audioId: this.activeAudio.id
              })
              .then(result => {
                console.log('result', result)
                this.$store
                  .dispatch('contributions/create', {
                    audioId: this.activeAudio.id,
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
            audioId: this.activeAudio.id
          })
          .then(result => {
            console.log('result', result)
            this.$store
              .dispatch('contributions/create', {
                audioId: this.activeAudio.id,
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
      if (!this.activeAudio) {
        this.$store
          .dispatch('audio/createAudio', {
            networkId: this.activeNetwork.id,
            title: this.title
          })
          .then(() => {
            this.$store
              .dispatch('people/update', {
                contributionId: this.activeContributor.id,
                contributionRoleId: contributor.contributionRoleId,
                displayName: contributor.displayName,
                email: contributor.email,
                image: contributor.image,
                link: contributor.link,
                name: contributor.name,
                networkId: this.activeNetwork.id,
                nick: contributor.nick,
                personId: this.activeContributor.person.id,
                audioId: this.activeAudio.id
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
            image: contributor.image,
            link: contributor.link,
            name: contributor.name,
            networkId: this.activeNetwork.id,
            nick: contributor.nick,
            personId: this.activeContributor.person.id,
            audioId: this.activeAudio.id
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
