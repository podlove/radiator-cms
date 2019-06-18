<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_new-network__header">
          <div class="r_new-network__header__image has-background-white"></div>
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
    </section>
    <section class="container r_new-network__main">
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
      <upload label="Audio Files" />
      <b-field label="Shownotes">
        <no-ssr>
          <EpisodesShownotesEditor />
        </no-ssr>
      </b-field>
      <upload label="Chapter Marks" />
      <upload label="Transcript" />
      <upload label="Episode Cover" />
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
.r_new-network__header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.r_new-network__header__image {
  border-radius: 50%;
  opacity: 0.2;
  margin-right: 20px;
  width: 100px;
  height: 100px;
}
.r_new-network__main {
  margin: 40px auto;
}
</style>

<script>
import { mapState } from 'vuex'
import EpisodesShownotesEditor from '../../../../../../components/EpisodesShownotesEditor'
import Upload from '../../../../../../components/Upload'

export default {
  components: {
    EpisodesShownotesEditor,
    Upload
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
      subtitle: '',
      title: ''
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
