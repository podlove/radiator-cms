<template>
  <section class="r_podcasts">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_podcasts__header">
          <h1 class="title">Import Podcast</h1>
        </div>
      </div>
    </section>
    <section class="container podcasts__main">
      <b-steps v-model="activeStep" animated="true" has-navigation="false">
        <b-step-item label="Enter Url">
          <section>
            <b-field horizontal label="Import from Url">
              <b-input v-model="url" placeholder="Enter RSS Feed or Website">
              </b-input>
            </b-field>
            <b-field horizontal label="Network">
              <b-select
                v-model="networkId"
                placeholder="Select a podcast network"
              >
                <option
                  v-for="network in networks"
                  :key="network.id"
                  :value="network.id"
                >
                  {{ network.title }}
                </option>
              </b-select>
            </b-field>
            <b-button class="is-primary">
              Check Podcast
            </b-button>
          </section>
        </b-step-item>
        <b-step-item label="Check Podcast"></b-step-item>
        <b-step-item label="Import Episodes"></b-step-item>
      </b-steps>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeStep: 0,
      networkId: null,
      url: ''
    }
  },
  computed: mapState({
    networks: state => state.networks.networks,
    podcast: state => state.podcasts.podcast
  })
}
</script>

<style>
.podcasts__main {
  margin: 40px auto;
}
</style>
