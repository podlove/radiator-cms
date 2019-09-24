<template>
  <!-- Shows a podcast with a list of episodes. -->
  <article class="r_podcast">
    <header class="r_podcast__header has-background-light">
      <div
        class="r_podcast__cover has-background-dark"
        :style="{
          backgroundImage: `url(${
            podcast && podcast.image ? podcast.image : ''
          })`
        }"
      ></div>
      <nuxt-link :to="'/network/' + network.id + '/podcast/' + podcast.id">
        <h1 class="is-size-5">{{ podcast.title }}</h1>
        <h2 class="is-size-7">{{ podcast.subtitle }}</h2>
      </nuxt-link>
      <p class="r_podcast__analytics">
        <span class="is-size-4">38293</span>
        <span class="is-size-7">Subscriptions</span>
      </p>
    </header>
    <main class="r_podcast__main">
      <!-- Fallback: No Episodes -->
      <div v-if="!podcast.episodes || !podcast.episodes.length > 0">
        <p class="r_network__info-text">
          Your podcast has no episodes.
        </p>
        <p>
          <nuxt-link
            :to="
              '/network/' +
                network.id +
                '/podcast/' +
                podcast.id +
                '/new-episode'
            "
          >
            <b-button outlined type="is-primary" icon-left="plus-circle">
              <span>Create a new episode</span>
            </b-button>
          </nuxt-link>
        </p>
      </div>
      <!-- List of episodes -->
      <ul v-if="podcast.episodes" class="r_podcast__episodes">
        <li
          v-for="episode in podcast.episodes"
          :key="episode.id"
          class="r_podcast__episodes__element"
        >
          <a href="">
            <div class="r_podcast__episode-cover has-background-dark"></div>
          </a>
          <h3 class="r_podcast__episode-title">
            <nuxt-link
              :to="
                '/network/' +
                  network.id +
                  '/podcast/' +
                  podcast.id +
                  '/episode/' +
                  episode.id
              "
            >
              {{ episode.title }}
            </nuxt-link>
          </h3>
          <p class="r_podcast__episode-info">
            <span class="is-size-7">Downloads:</span>
            <span> 23943</span>
          </p>
          <p class="r_podcast__episode-info">
            <b-icon
              icon="check-circle"
              size="is-small"
              type="is-success"
            ></b-icon>
            {{ $moment(episode.publishedAt).format('DD.MM.YYYY') }}
          </p>
          <b-tooltip
            label="Open in episode page in new tab"
            class="r_podcast__episode-info"
            type="is-dark"
          >
            <a href="" target="_blank">
              <b-button type="is-text" class="button">
                <b-icon icon="open-in-new"></b-icon>
              </b-button>
            </a>
          </b-tooltip>
          <b-button type="is-text" class="button">
            <b-icon icon="dots-vertical"></b-icon>
          </b-button>
        </li>
      </ul>
    </main>
  </article>
</template>

<style>
.r_podcast {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_podcast__cover {
  background-size: cover;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  /* todo: negative space looks strange on mobile with long description */
  bottom: -20px;
  margin-right: 10px;
  width: 100px;
  min-width: 100px;
  height: 100px;
}
.r_podcast__episodes__element {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.r_podcast__episode-cover {
  border-radius: 2px;
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.r_podcast__episode-title {
  flex-grow: 1;
  margin-right: 20px;
}
.r_podcast__episode-info {
  margin-right: 20px;
}
.r_podcast__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px 20px;
}
.r_podcast__main {
  padding: 20px 20px;
}
.r_podcast__title {
  flex: 3 0px;
}
</style>

<script>
export default {
  props: {
    network: {
      type: Object,
      required: true
    },
    podcast: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      total: 200,
      current: 1,
      perPage: 20,
      order: 'is-centered'
    }
  }
}
</script>
