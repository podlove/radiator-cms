<template>
  <!-- NEW NETWORK PAGE -->
  <!-- path: `/new-network` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_new-network__header">
          <div
            :style="{
              backgroundImage: `url(${
                activeNetwork && activeNetwork.image ? activeNetwork.image : ''
              })`,
              opacity: 1
            }"
            class="r_new-network__header__image has-background-white"
          ></div>
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
      <b-field label="Network Cover">
        <upload
          :type="'IMAGE'"
          :state="coverFileState"
          :image="
            activeNetwork && activeNetwork.image ? activeNetwork.image : null
          "
          @dropped="params => handleCoverFileDrop(params)"
          class="field"
        />
      </b-field>
      <b-button
        :loading="loading"
        :disabled="loading"
        @click.stop.prevent="saveNetwork()"
        type="is-primary"
        outlined
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
  background-size: cover;
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
import { ToastProgrammatic as Toast } from 'buefy'
import Upload from '~/components/Upload'

export default {
  components: { Upload },
  data() {
    return {
      alert: null,
      cover: null,
      coverFileState: null,
      loading: false,
      title: 'New Network'
    }
  },
  computed: mapState({
    activeNetwork: state => state.networks.activeNetwork,
    network: state => state.networks.network
  }),
  methods: {
    saveNetwork() {
      this.loading = true
      // Check if there is an activeNetwork object in store
      // and if not create one first
      if (this.activeNetwork) {
        this.updateNetwork(
          {
            image: this.cover,
            title: this.title,
            networkId: this.activeNetwork.id
          },
          true
        )
      } else {
        this.createNetwork(
          {
            image: this.cover,
            title: this.title
          },
          true
        )
      }
    },
    handleCoverFileDrop(params) {
      this.cover = params.file
      this.coverFileState = 'LOADING'
      // Check if there is an activeNetwork object in store
      // and if not create one first
      console.log('this.activeNetwork', this.activeNetwork)
      if (this.activeNetwork) {
        // update network with image
        this.updateNetwork(
          {
            image: params.file,
            title: this.title,
            networkId: this.activeNetwork.id
          },
          false
        )
      } else {
        // create network with image
        this.createNetwork(
          {
            image: params.file,
            title: this.title
          },
          false
        )
      }
    },
    createNetwork(data, isFinal) {
      this.$store
        .dispatch('networks/create', data)
        .then(() => {
          if (!isFinal) {
            // change cover file upload input
            this.coverFileState = 'SUCCESS'
          } else {
            // redirect to new network
            this.loading = false
            Toast.open({
              message:
                'Your new network was susccessfully created. You will be redirected to your new network page.',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.replace(`/network/${this.activeNetwork.id}`)
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
    updateNetwork(data, isFinal) {
      this.$store
        .dispatch('networks/update', data)
        .then(() => {
          if (!isFinal) {
            // change cover file upload input
            this.coverFileState = 'SUCCESS'
          } else {
            // redirect to new network
            this.loading = false
            Toast.open({
              message:
                'Your new network was susccessfully created. You will be redirected to your new network page.',
              type: 'is-success'
            })
            setTimeout(() => {
              this.$router.replace(`/network/${this.activeNetwork.id}`)
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
