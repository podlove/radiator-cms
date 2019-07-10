<template>
  <!-- NETWORK PAGE -->
  <!-- path: `/networks/[network_id]/podcasts` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_network-hero">
        <div
          class="r_network-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              network && network.image ? network.image : ''
            })`
          }"
        ></div>
        <div class="container r_network-hero__container">
          <h2 v-if="network" lass="subtitle is-size-6 r_network-hero__subtitle">
            Podcast Network
          </h2>
          <h1 v-if="network" class="title is-size-3 r_network-hero__title">
            {{ network.title }}
          </h1>
        </div>
      </div>
    </section>
    <section class="container r_networks__main">
      <b-tabs v-model="activeTab" class="r_network-tabs">
        <b-tab-item label="Podcasts">
          <ul v-if="network">
            <li
              v-for="podcast in network.podcasts"
              :key="podcast.id"
              class="r_network__podcast"
            >
              <podcast :podcast="podcast" />
            </li>
          </ul>
        </b-tab-item>
        <b-tab-item label="Analytics">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for network analytics</p>
            </article>
          </div>
        </b-tab-item>
        <b-tab-item label="Settings">
          <section>
            <b-field label="Network Name">
              <b-input
                v-if="isDisabled"
                v-model="network.title"
                disabled
              ></b-input>
              <b-input
                v-if="!isDisabled"
                v-model="title"
                :placeholder="network.title"
                :is-loading="isLoading"
              ></b-input>
            </b-field>
            <div class="r_settings__interaction">
              <b-button
                v-if="isDisabled"
                type="is-primary"
                outlined
                @click.stop.prevent="edit()"
              >
                Edit Settings
              </b-button>
              <b-button
                v-if="!isDisabled"
                type="is-danger"
                outlined
                @click.stop.prevent="deleteNetwork()"
              >
                Delete Network
              </b-button>
              <b-button
                v-if="!isDisabled"
                type="is-dark"
                outlined
                @click.stop.prevent="cancel()"
              >
                Cancel
              </b-button>
              <b-button
                v-if="!isDisabled"
                type="is-primary"
                @click.stop.prevent="save()"
              >
                Save
              </b-button>
            </div>
          </section>
        </b-tab-item>
      </b-tabs>
    </section>
  </section>
</template>

<style>
.r_network__podcast {
  margin: 2.5rem 0;
}
.r_network-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
}
.r_network-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_network-hero__cover {
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_network-hero__subtitle {
  margin-bottom: 0.5rem !important;
}
.r_network-hero__title {
  font-weight: 400;
  margin-bottom: 0.5rem !important;
}
.r_network-tabs {
  margin: 3.75rem 0.75rem;
}
.r_settings__interaction {
  margin-top: 1rem;
  text-align: right;
}
</style>

<script>
import { mapState } from 'vuex'
import Podcast from '~/components/Podcast'

export default {
  components: {
    Podcast
  },
  data() {
    return {
      activeTab: 0,
      isDisabled: true,
      isLoading: false,
      title: ''
    }
  },
  computed: mapState({
    network: state => state.networks.network,
    token: state => state.auth.token
  }),
  created() {
    this.$store
      .dispatch('networks/getNetwork', {
        id: this.$route.params.nid
      })
      .catch(error => {
        console.warn(error)
        this.$router.push('/404')
      })
  },
  methods: {
    cancel() {
      this.isDisabled = true
    },
    deleteNetwork() {
      this.$store
        .dispatch('networks/deleteNetwork', {
          networkId: this.network.id
        })
        .then(() => {
          this.$router.push('/networks')
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    edit() {
      this.isDisabled = false
    },
    save() {
      this.isLoading = true
      this.$store
        .dispatch('networks/update', {
          networkId: this.network.id,
          title: this.title
        })
        .then(() => {
          this.isDisabled = true
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    }
  }
}
</script>
