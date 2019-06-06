<template>
  <div class="r_episode-af">
    <h2 class="title is-size-5 r_episode-af__headline">
      Audio Files
    </h2>
    <ul class="r_episode-af__list">
      <li
        v-for="file in mockData.audioFiles"
        :key="file.type"
        class="r_episode-af__item"
      >
        <b-icon
          type="is-success"
          class="r_episode-af__icon"
          size="is-small"
          icon="check-circle-outline"
        ></b-icon>
        <p class="r_episode-af__url">
          <a :href="file.url" target="_blank">
            {{ file.url }}
          </a>
        </p>
        <b-tag class="r_episode-af__type" type="is-primary" rounded>
          {{ file.type }}
        </b-tag>
        <span class="r_episode-af__duration">2:48:23</span>
      </li>
    </ul>
  </div>
</template>

<style>
.r_episode-af {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 4rem 0 0 0;
}
.r_episode-af__headline {
  margin: 0 !important;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid lightgrey;
}
.r_episode-af__icon {
  margin-right: 1rem;
}
.r_episode-af__item {
  align-items: center;
  display: flex;
  margin: 1rem 0;
  padding: 0 2rem;
}
.r_episode-af__list {
  padding: 1rem 0;
}
.r_episode-af__text {
  padding: 2rem;
}
.r_episode-af__type {
  margin-right: 1rem;
}
.r_episode-af__url {
  flex-grow: 1;
  margin-right: 1rem;
}
</style>

<script>
export default {
  data() {
    return {
      mockData: {
        audioFiles: [
          {
            type: 'oga',
            url:
              'http://forschergeist.de/podlove/file/1894/s/feed/c/m4a/fg068-risikoforschung.m4a',
            state: 'success'
          },
          {
            type: 'mp3',
            url:
              'http://forschergeist.de/podlove/file/1894/s/feed/c/m4a/fg068-risikoforschung.m4a',
            state: 'success'
          },
          {
            type: 'm4a',
            url:
              'http://forschergeist.de/podlove/file/1894/s/feed/c/m4a/fg068-risikoforschung.m4a',
            state: 'success'
          },
          {
            type: 'opus',
            url:
              'http://forschergeist.de/podlove/file/1894/s/feed/c/m4a/fg068-risikoforschung.m4a',
            state: 'success'
          }
        ]
      }
    }
  },
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>
