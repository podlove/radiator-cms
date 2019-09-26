<template>
  <!-- NEW PODCAST PAGE -->
  <!-- path: `/new-podcast` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_new-podcast-hero">
        <div
          class="r_new-podcast__header__image has-background-light"
          :style="{
            backgroundImage: `url(${
              activePodcast && activePodcast.image ? activePodcast.image : ''
            })`
          }"
        ></div>
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
      <div class="columns">
        <b-field class="column is-four-fifths" label="Title">
          <b-input v-model="title" placeholder="New Podcast"></b-input>
        </b-field>
        <b-field class="column" label="Short Id">
          <b-input v-model="shortId" placeholder="NP"></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Subtitle">
          <b-input
            v-model="subtitle"
            placeholder="Subtitle of the New Podcast"
          ></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Summary">
          <b-input
            v-model="summary"
            type="textarea"
            placeholder="Podcast Summary"
          ></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Author">
          <b-input v-model="author" placeholder="Author's name"></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Language">
          <b-input v-model="language" placeholder="Podcast language"></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Podcast Cover">
          <upload
            class="field"
            :type="'IMAGE'"
            :state="coverFileState"
            :image="
              activePodcast && activePodcast.image ? activePodcast.image : null
            "
            @dropped="params => handleCoverFileDrop(params)"
          />
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Feed Owner Name">
          <b-input
            v-model="ownerName"
            placeholder="Feed owner's name"
          ></b-input>
        </b-field>
      </div>
      <div class="columns">
        <b-field class="column" label="Feed Owner Email">
          <b-input
            v-model="ownerEmail"
            placeholder="Feed owner's email adress"
          ></b-input>
        </b-field>
      </div>
      <b-button
        type="is-primary"
        outlined
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="savePodcast()"
      >
        Add New Podcast
      </b-button>
    </section>
  </section>
</template>

<style>
/* Overwrite Bulma */
.field {
  margin-bottom: 0 !important;
}
.r_new-podcast-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
  width: 100%;
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
.r_new-podcast__main {
  margin: 5rem auto;
}
</style>

<script>
import { mapState } from 'vuex'
import Upload from '~/components/Upload'
import { ToastProgrammatic as Toast } from 'buefy'

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
      ownerEmail: null,
      summary: null,
      loading: false,
      shortId: null,
      subtitle: null,
      title: null
    }
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork,
    activePodcast: state => state.podcasts.activePodcast
  }),
  methods: {
    savePodcast() {
      this.loading = true
      // Check if there is an activePodcast object in store
      // and if not create one first
      if (this.activePodcast) {
        this.updatePodcast(
          {
            author: this.author,
            image: this.cover,
            language: this.language,
            networkId: this.activeNetwork.id,
            ownerName: this.ownerName,
            ownerEmail: this.ownerEmail,
            summary: this.summary,
            shortId: this.shortId,
            subtitle: this.subtitle,
            title: this.title,
            podcastId: this.activePodcast.id
          },
          true
        )
      } else {
        this.createPodcast(
          {
            author: this.author,
            image: this.cover,
            language: this.language,
            networkId: this.activeNetwork.id,
            ownerName: this.ownerName,
            ownerEmail: this.ownerEmail,
            summary: this.summary,
            shortId: this.shortId,
            subtitle: this.subtitle,
            title: this.title || 'New Podcast'
          },
          true
        )
      }
    },
    handleCoverFileDrop(params) {
      this.cover = params.file
      this.coverFileState = 'LOADING'
      // Check if there is an activePodcast object in store
      // and if not create one first
      console.log('this.activePodcast', this.activePodcast.id)
      if (this.activePodcast && this.activePodcast.id) {
        // update network with image
        this.updatePodcast(
          {
            author: this.author,
            image: this.cover,
            language: this.language,
            networkId: this.activeNetwork.id,
            ownerName: this.ownerName,
            ownerEmail: this.ownerEmail,
            summary: this.summary,
            shortId: this.shortId,
            subtitle: this.subtitle,
            title: this.title,
            podcastId: this.activePodcast.id
          },
          false
        )
      } else {
        // create network with image
        console.log('!!')
        this.createPodcast(
          {
            author: this.author,
            image: this.cover,
            language: this.language,
            networkId: this.activeNetwork.id,
            ownerName: this.ownerName,
            ownerEmail: this.ownerEmail,
            summary: this.summary,
            shortId: this.shortId,
            subtitle: this.subtitle,
            title: this.title || 'New Podcast'
          },
          false
        )
      }
    },
    createPodcast(data, isFinal) {
      this.$store
        .dispatch('podcasts/create', data)
        .then(() => {
          if (!isFinal) {
            // change cover file upload input
            this.coverFileState = 'SUCCESS'
          } else {
            // redirect to new podcast
            this.loading = false
            Toast.open({
              message:
                'Your new podcast was susccessfully created. You will be redirected to your new podcast page.',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.replace(
                `/network/${this.activeNetwork.id}/podcast/${
                  this.activePodcast.id
                }`
              )
            }, 1000)
          }
        })
        .catch(error => {
          if (!isFinal) {
            this.coverFileState = 'ERROR'
          } else {
            this.loading = false
          }
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    updatePodcast(data, isFinal) {
      this.$store
        .dispatch('podcasts/update', data)
        .then(() => {
          if (!isFinal) {
            // change cover file upload input
            this.coverFileState = 'SUCCESS'
          } else {
            // redirect to new podcast
            this.loading = false
            Toast.open({
              message:
                'Your new podcast was susccessfully created. You will be redirected to your new podcast page.',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.replace(
                `/network/${this.activeNetwork.id}/podcast/${
                  this.activePodcast.id
                }`
              )
            }, 1000)
          }
        })
        .catch(error => {
          if (!isFinal) {
            this.coverFileState = 'ERROR'
          } else {
            this.loading = false
          }
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    }
  }
}
</script>
