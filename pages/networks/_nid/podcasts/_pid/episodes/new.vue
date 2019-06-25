<template>
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
      <upload class="field" label="Audio Files" :dropFiles="dropAudioFiles" />
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
        :dropFiles="dropChapterMarks"
      />
      <upload class="field" label="Transcript" :dropFiles="dropTranscript" />
      <upload
        class="field"
        label="Episode Cover"
        :dropFiles="dropEpisodeCover"
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
      cover: null,
      description: '',
      dropAudioFiles: [],
      dropChapterMarks: [],
      dropEpisodeCover: [],
      dropTranscript: [],
      id: null,
      loading: false,
      number: 283,
      subtitle: 'Episode Placeholder Subitle',
      title: 'Episode Placeholder Title'
    }
  },
  computed: mapState({
    activeNetworkId: state => state.navigation.activeNetworkId,
    activePodcastId: state => state.navigation.activePodcastId,
    token: state => state.auth.token
  }),
  methods: {
    createEpisode() {
      this.loading = true
      this.$store
        .dispatch('episodes/create', {
          file: this.dropAudioFiles[0],
          podcastId: this.activePodcastId,
          title: this.title,
          token: this.token
        })
        .then(result => {
          this.title = result.title
          this.id = result.id
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
              }/episodes/${this.id}`
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
    deleteDropFile(index) {
      this.dropAudioFiles.splice(index, 1)
    },
    toast() {
      this.$toast.open(this.alert)
    }
  }
}
</script>
