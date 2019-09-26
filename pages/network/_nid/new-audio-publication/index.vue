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
      <b-field label="Title">
        <b-input v-model="title" placeholder="New Audio Publication"></b-input>
      </b-field>
      <upload
        class="field"
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
      <upload
        class="field"
        label="Audio Publication Cover"
        :state="coverFileState"
        :type="'IMAGE'"
        @dropped="params => handleCoverFileDrop(params)"
      />
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
  </section>
</template>

<style>
.r_new-audio-pub-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
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
import Upload from '~/components/Upload'

export default {
  components: { Upload },
  data() {
    return {
      alert: null,
      // can be LOADING, ERROR, SUCCESS
      audioFileState: null,
      audioUploadResult: null,
      cover: null,
      coverFileState: null,
      loading: false,
      title: 'New Audio Publication'
    }
  },
  computed: mapState({
    activeAudio: state => state.audio.activeAudio,
    networks: state => state.networks.networks,
    activeNetwork: state => state.networks.activeNetwork
  }),
  methods: {
    // TODO: Set audioPublication title
    createAudioPublication() {
      this.loading = true
      this.$store
        .dispatch('audio/updateAudioPublication', {
          audioId: this.activeAudio.audioPublication.id,
          title: this.title
        })
        .then(() => {
          this.loading = false
          this.$toast.open({
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
    handleCoverFileDrop(params) {
      this.coverFileState = 'LOADING'
      this.cover = params.file
      // Check if there is an activeAudio object in store
      // and if not create one first
      // TODO: refactor
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
      }
    },
    toast() {
      this.$toast.open(this.alert)
    }
  }
}
</script>
