<template>
  <section class="r_episode-af">
    <section class="r_episode-af__header">
      <h2 class="title is-size-5 r_episode-af__headline">
        Audio Files
      </h2>
      <b-button>
        <b-icon size="is-small" icon="plus-circle-outline"></b-icon>
        <a> Add audio files</a>
      </b-button>
    </section>
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
        <b-tooltip
          class="r_episode-af__icon"
          label="Edit audio file"
          type="is-dark"
        >
          <b-button type="is-text">
            <b-icon icon="pencil"></b-icon>
          </b-button>
        </b-tooltip>
        <b-tooltip label="Delete audio file" type="is-danger">
          <b-button type="is-text">
            <b-icon icon="delete"></b-icon>
          </b-button>
        </b-tooltip>
      </li>
    </ul>
  </section>
</template>

<style>
.r_episode-af {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 3rem 0 0 0;
}
.r_episode-af__header {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 2rem;
}
.r_episode-af__headline {
  margin: 0 !important;
}
.r_episode-af__icon {
  margin-right: 1rem;
}
.r_episode-af__item {
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0 2rem;
  height: 50px;
}
.r_episode-af__list {
  padding: 0.5rem 0;
}
.r_episode-af__text {
  padding: 2rem;
}
.r_episode-af__duration,
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
