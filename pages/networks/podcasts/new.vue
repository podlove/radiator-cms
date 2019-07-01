<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_new-podcast-hero">
        <div class="r_new-podcast__header__image has-background-light"></div>
        <div class="r_new-podcast__header__container">
          <h1 class="title is-size-3 r_new-podcast__header__title">
            {{ title }}
          </h1>
          <h2 class="subtitle is-size-6">
            {{ description }}
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
      <b-field label="Title">
        <b-input v-model="title" placeholder="New Podcast"></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          v-model="description"
          placeholder="Podcast Description"
        ></b-input>
      </b-field>
      <b-field label="Network">
        <no-ssr>
          <b-select v-model="networkId" placeholder="Select a podcast network">
            <option
              v-for="network in networks"
              :key="network.id"
              :value="network.id"
            >
              {{ network.title }}
            </option>
          </b-select>
        </no-ssr>
      </b-field>
      <upload class="field" label="Podcast Cover" :drop-files="dropCover" />
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

export default {
  components: { Upload },
  data() {
    return {
      alert: null,
      cover: null,
      description: null,
      dropCover: [],
      networkId: null,
      loading: false,
      title: 'New Podcast'
    }
  },
  computed: mapState({
    networks: state => state.networks.networks,
    podcast: state => state.podcasts.podcast
  }),
  methods: {
    createPodcast() {
      this.loading = true
      this.$store
        .dispatch('podcasts/create', {
          cover: this.cover,
          description: this.description,
          title: this.title,
          networkId: this.networkId
        })
        .then(() => {
          this.loading = false
          this.$toast.open({
            message:
              'Your new podcast was susccessfully created. You will be redirected to your new podcast page.',
            type: 'is-success'
          })
          setTimeout(() => {
            this.$router.replace(
              `/networks/${this.networkId}/podcasts/${this.podcast.id}/episodes`
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
    toast() {
      this.$toast.open(this.alert)
    }
  }
}
</script>
