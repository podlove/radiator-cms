<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_new-network-header">
          <div class="r_new-network-header__image has-background-white"></div>
          <h1 class="title">{{ title }}</h1>
        </div>
      </div>
    </section>
    <section class="r_layout_main">
      <b-notification
        v-if="alert"
        :type="alert.type"
        has-icon
        aria-close-label="Close notification"
      >
        {{ alert.message }}
      </b-notification>
      <b-field label="Network Title">
        <b-input v-model="title" placeholder="New Network"></b-input>
      </b-field>
      <upload />
      <b-button
        type="is-primary"
        outlined
        @click.stop.prevent="createNetwork()"
        :loading="loading"
        :disabled="loading"
      >
        Add New Network
      </b-button>
    </section>
  </section>
</template>

<style>
.r_new-network-header {
  align-items: center;
  display: flex;
  justify-content: flex-start;
}
.r_new-network-header__image {
  border-radius: 50%;
  opacity: 0.2;
  margin-right: 20px;
  width: 100px;
  height: 100px;
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
      id: null,
      loading: false,
      title: 'New Network'
    }
  },
  methods: {
    createNetwork() {
      this.loading = true
      this.$store
        .dispatch('networks/create', {
          cover: this.cover,
          title: this.title
        })
        .then(result => {
          this.title = result.title
          this.id = result.id
          this.loading = false
          this.$toast.open({
            message:
              'Your new network was susccessfully created. You will be redirected to your new network page.',
            type: 'is-success'
          })
          setTimeout(() => {
            this.$router.push(
              `/networks/${this.title.replace(/\s+/g, '-').toLowerCase()}-${
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
