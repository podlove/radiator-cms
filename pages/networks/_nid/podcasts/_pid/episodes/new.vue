<template>
  <!-- NEW EPISODE PAGE -->
  <!-- path: `/networks/[network_id]/podcasts/[podcast_id]/episodes/new` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_new-episode-hero">
        <div class="r_new-episode__header__image has-background-light"></div>
        <div class="r_new-episode__header__container">
          <h1 class="title is-size-3 r_new-episode__header__title">
            {{ number }} - {{ title }}
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
      <b-field label="Number">
        <b-numberinput v-model="number" placeholder="283"></b-numberinput>
      </b-field>
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-field label="Subtitle">
        <b-input v-model="subtitle"></b-input>
      </b-field>
      <b-field label="Description">
        <b-input v-model="description"></b-input>
      </b-field>
      <upload
        class="field"
        label="Audio File"
        :state="audioFileState"
        :audio="
          audioUploadResult && audioUploadResult.public_url
            ? audioUploadResult.public_url
            : null
        "
        @dropped="file => handleAudioFileDrop(file)"
      />
      <b-field label="Shownotes">
        <no-ssr>
          <EpisodesShownotesEditor />
        </no-ssr>
      </b-field>
      <b-field>
        <no-ssr>
          <WikidataInput language="de" />
        </no-ssr>
      </b-field>
      <upload
        class="field"
        label="Chapter Marks"
        :drop-files="dropChapterMarks"
      />
      <upload class="field" label="Transcript" :drop-files="dropTranscript" />
      <upload
        class="field"
        label="Episode Cover"
        :drop-files="dropEpisodeCover"
      />
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
  </section>
</template>

<style>
.field {
  margin-bottom: 2rem;
}
.r_new-episode-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
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
  margin: 40px auto;
}
</style>

<script>
import { mapState } from 'vuex'
import EpisodesShownotesEditor from '~/components/EpisodesShownotesEditor'
import Upload from '~/components/Upload'
import WikidataInput from '~/components/WikidataInput'

export default {
  components: {
    EpisodesShownotesEditor,
    Upload,
    WikidataInput
  },
  data() {
    return {
      alert: null,
      // can be LOADING, ERROR, SUCCESS
      audioFileState: null,
      audioUploadResult: null,
      cover: null,
      description: '',
      dropChapterMarks: [],
      dropEpisodeCover: [],
      dropTranscript: [],
      id: null,
      loading: false,
      number: 283,
      subtitle: 'Episode Placeholder Subtitle',
      title: 'Episode Placeholder Title'
    }
  },
  computed: mapState({
    activeNetworkId: state => state.navigation.activeNetworkId,
    activePodcastId: state => state.navigation.activePodcastId,
    episode: state => state.episodes.episode
  }),
  methods: {
    createEpisode() {
      this.loading = true
      this.$store
        .dispatch('episodes/create', {
          podcastId: this.activePodcastId,
          title: this.title
        })
        .then(result => {
          this.loading = false
          this.$toast.open({
            message:
              'Your new episode was susccessfully created. You will be redirected to your new episode page.',
            type: 'is-success'
          })
          setTimeout(() => {
            this.$router.replace(
              `/networks/${this.activeNetworkId}/podcasts/${
                this.activePodcastId
              }/episodes/${this.episode.id}`
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
    handleAudioFileDrop(file) {
      this.audioFileState = 'LOADING'
      this.$store
        .dispatch('audio/createAudio', {
          file: file,
          networkId: this.activeNetworkId,
          title: file.name
        })
        .then(result => {
          this.audioUploadResult = result
          this.audioFileState = 'SUCCESS'
        })
        .catch(error => {
          this.audioFileState = 'ERROR'
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    toast() {
      this.$toast.open(this.alert)
    }
  }
}
</script>
