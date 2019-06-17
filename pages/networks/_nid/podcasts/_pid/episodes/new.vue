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
      <b-field label="Audio Files">
        <b-upload v-model="dropFiles" multiple drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Drop your audio files here or click to upload.</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <b-field label="Shownotes">
        <no-ssr>
          <EpisodesShownotesEditor />
        </no-ssr>
      </b-field>
      <div class="tags">
        <span
          v-for="(file, index) in dropFiles"
          :key="index"
          class="tag is-primary"
        >
          {{ file.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile(index)"
          ></button>
        </span>
      </div>
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

export default {
  components: {
    EpisodesShownotesEditor
  },
  data() {
    return {
      alert: null,
      cover: null,
      description: '',
      dropFiles: [],
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
          file: this.dropFiles[0],
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
      this.dropFiles.splice(index, 1)
    },
    toast() {
      this.$toast.open(this.alert)
    }
  }
}
</script>
