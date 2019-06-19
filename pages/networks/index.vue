<template>
  <section class="r_networks">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_networks__header">
          <h1 class="title">All Podcast Networks</h1>
          <no-ssr>
            <dropdown />
          </no-ssr>
        </div>
      </div>
    </section>
    <section class="container r_networks__main">
      <div v-if="networks">
        <div v-for="network in networks" :key="network.id">
          <div class="r_network__header">
            <div
              class="r_network__header__cover has-background-light"
              :style="{
                backgroundImage: `url(${
                  network && network.image ? network.image : ''
                })`
              }"
            ></div>
            <h2 class="is-size-4">{{ network.title }}</h2>
          </div>
          <b-tabs v-model="activeTab" class="r_network-tabs">
            <b-tab-item label="Podcasts">
              <ul class="r_network-tabs__list" v-if="network.podcasts">
                <li
                  v-for="podcast in network.podcasts"
                  :key="podcast.id"
                  class="r_networks__podcast"
                >
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-1by1">
                        <img :src="`${podcast.image}`" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <p class="title is-4">{{ podcast.title }}</p>
                          <p class="subtitle is-6">{{ podcast.subtitle }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </b-tab-item>
            <b-tab-item label="Settings">
              <div class="tile">
                <article class="tile is-child notification is-warning">
                  <p class="title">Placeholder...</p>
                  <p class="subtitle">for network settings</p>
                </article>
              </div>
            </b-tab-item>
          </b-tabs>
        </div>
      </div>
    </section>
  </section>
</template>

<style>
.r_network__header {
  align-items: center;
  display: flex;
  margin-bottom: 2rem;
}
.r_network__header__cover {
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin-right: 10px;
  width: 100px;
  height: 100px;
}
.r_networks__header {
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
}
.r_networks__main {
  margin: 40px auto;
}
.r_networks__podcast {
  margin: 1.5rem 0 2.5rem 0;
  width: 25%;
  min-width: 250px;
}
.r_network-tabs__list {
  display: flex;
  flex-wrap: wrap;
}
.r_network-tabs__list__cover {
  width: 200px;
  height: 200px;
}
</style>

<script>
import { mapState } from 'vuex'

import Dropdown from '~/components/Dropdown'

export default {
  components: {
    Dropdown
  },
  data() {
    return {
      activeTab: 0
    }
  },
  computed: mapState({
    isLoggedIn: state => state.auth.isLoggedIn,
    username: state => state.auth.username,
    networks: state => state.networks.networks
  })
}
</script>
