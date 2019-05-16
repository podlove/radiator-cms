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
      <b-field label="Title">
        <b-input v-model="title" placeholder="New Podcast"></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          v-model="description"
          placeholder="Podcast Description"
        ></b-input>
      </b-field>
      <upload />
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
import Upload from '~/components/Upload'

export default {
  components: { Upload },
  data() {
    return {
      alert: null,
      cover: null,
      description: null,
      id: null,
      loading: false,
      title: 'New Podcast'
    }
  },
  methods: {
    createPodcast() {
      this.loading = true
      this.$store
        .dispatch('podcasts/create', {
          cover: this.cover,
          description: this.description,
          title: this.title
        })
        .then(result => {
          this.title = result.title
          this.id = result.id
          this.loading = false
          this.$toast.open({
            message:
              'Your new podcast was susccessfully created. You will be redirected to your new podcast page.',
            type: 'is-success'
          })
          setTimeout(() => {
            this.$router.push(
              `/podcasts/${this.title.replace(/\s+/g, '-').toLowerCase()}-${
                this.id
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
    toast() {
      this.$toast.open(this.alert)
    }
  }
}
</script>
