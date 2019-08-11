<template>
  <!-- NEW NETWORK PAGE -->
  <!-- path: `/new-network` -->
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
        <b-input v-model="title" placeholder="New Network"></b-input>
      </b-field>
      <upload
        class="field"
        label="Network Image"
        :drop-files="dropNetworkImage"
      />
      <b-button
        type="is-primary"
        outlined
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="createNetwork()"
      >
        Add New Network
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
import Upload from '~/components/Upload'
import { ToastProgrammatic as Toast } from 'buefy'

export default {
  components: { Upload },
  data() {
    return {
      alert: null,
      cover: null,
      dropNetworkImage: [],
      loading: false,
      title: 'New Network'
    }
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork,
    network: state => state.networks.network
  }),
  methods: {
    createNetwork() {
      this.loading = true
      this.$store
        .dispatch('networks/create', {
          cover: this.cover,
          title: this.title
        })
        .then(() => {
          this.loading = false
          Toast.open({
            message:
              'Your new network was susccessfully created. You will be redirected to your new network page.',
            type: 'is-success'
          })
          setTimeout(() => {
            this.$router.replace(`/network/${this.activeNetwork.id}`)
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
      Toast.open(this.alert)
    }
  }
}
</script>
