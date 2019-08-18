<template>
  <!-- NEW PODCAST PAGE -->
  <!-- path: `/new-podcast` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_new-podcast-hero">
        <div class="r_new-podcast__header__image has-background-light"></div>
        <div class="r_new-podcast__header__container">
          <h1 class="title is-size-3 r_new-podcast__header__title">
            {{ title }}
          </h1>
          <h2 class="subtitle is-size-6">
            {{ subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="container r_new-podcast__main">
      <b-notification
        v-if="alert"
        :type="alert.type"
        has-icon
        aria-close-label="Close notification"
      >
        {{ alert.message }}
      </b-notification>
      <b-field label="Short Id">
        <b-input v-model="shortId" placeholder="NE"></b-input>
      </b-field>
      <b-field label="Title">
        <b-input v-model="title" placeholder="New Podcast"></b-input>
      </b-field>
      <b-field label="Subtitle">
        <b-input
          v-model="subtitle"
          placeholder="Subtitle of the New Podcast"
        ></b-input>
      </b-field>
      <b-field label="Summary">
        <b-input v-model="summary" placeholder="Podcast Summary"></b-input>
      </b-field>
      <b-field label="Author">
        <b-input v-model="author" placeholder="Author's name"></b-input>
      </b-field>
      <b-field label="Language">
        <b-input v-model="language" placeholder="Podcast language"></b-input>
      </b-field>
      <b-field label="Podcast Cover">
        <upload
          class="field"
          :type="'IMAGE'"
          :state="coverFileState"
          :image="cover"
          @dropped="params => handleCoverFileDrop(params)"
        />
      </b-field>
      <b-button
        type="is-primary"
        outlined
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="createPodcast()"
      >
        Add New Podcast
      </b-button>
    </section>
  </section>
</template>

<style>
.r_new-podcast-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
}
.r_new-podcast__header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.r_new-podcast__header__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_new-podcast__header__image {
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
.r_new-podcast__main {
  margin: 40px auto;
}
</style>

<script>
import { mapState } from 'vuex'
import Upload from '~/components/Upload'
// import { ToastProgrammatic as Toast } from 'buefy'

export default {
  components: { Upload },
  data() {
    return {
      alert: null,
      author: null,
      cover: null,
      coverFileState: null,
      language: 'DE',
      ownerName: null,
      summary: null,
      loading: false,
      shortId: 'NE',
      subtitle: null,
      title: 'New Podcast'
    }
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork,
    activePodcast: state => state.podcasts.activePodcast
  }),
  methods: {
    createPodcast() {
      this.loading = true
      this.$store
        .dispatch('podcasts/create', {
          author: this.author,
          image: this.cover,
          language: this.language,
          networkId: this.activeNetwork.id,
          summary: this.summary,
          shortId: this.shortId,
          subtitle: this.subtitle,
          title: this.title
        })
        .then(() => {
          this.loading = false
          // Toast.open({
          //   message:
          //     'Your new podcast was susccessfully created. You will be redirected to your new podcast page.',
          //   type: 'is-success'
          // })
          setTimeout(() => {
            this.$router.replace(
              `/network/${this.activeNetwork.id}/podcast/${
                this.activePodcast.id
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
    handleCoverFileDrop(params) {
      this.cover = params.file
      this.coverFileState = 'SUCCESS'
    }
  }
}
</script>
