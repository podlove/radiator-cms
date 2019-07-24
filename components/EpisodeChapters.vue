<template>
  <!-- Shows episode chapter marks as a list. -->
  <div v-if="episode && episode.chapters" class="r_episode-chapters">
    <section class="r_episode-chapters__header">
      <h2 class="title is-size-5 r_episode-chapters__headline">
        Chapters
      </h2>
      <b-button>
        <b-icon size="is-small" icon="upload"></b-icon>
        <a> Import chapter marks</a>
      </b-button>
    </section>
    <div>
      {{ uploadMode }}
    </div>
    <ul class="r_episode-chapters__list">
      <li
        v-for="chapter in episode.chapters"
        :key="chapter.start"
        class="r_episode-chapters__item"
      >
        <b-icon
          class="r_episode-chapters__icon r_episode-chapters__icon--ia has-text-grey-light"
          icon="drag-vertical"
        ></b-icon>
        <p class="r_episode-chapters__item__start">{{ chapter.startString }}</p>
        <p v-if="chapter.link" class="r_episode-chapters__item__title">
          <a href="" target="_blank">{{ chapter.title }}</a>
        </p>
        <p v-else class="r_episode-chapters__item__title">
          {{ chapter.title }}
        </p>
        <p class="r_episode-chapters__item__duration">
          {{ chapter.start }}
        </p>
        <b-tooltip
          class="r_episode-chapters__icon"
          label="Edit chapter"
          type="is-dark"
        >
          <b-button type="is-text">
            <b-icon icon="pencil"></b-icon>
          </b-button>
        </b-tooltip>
        <b-tooltip label="Delete chapter" type="is-danger">
          <b-button type="is-text">
            <b-icon icon="delete"></b-icon>
          </b-button>
        </b-tooltip>
      </li>
    </ul>
  </div>
</template>

<style>
.r_episode-chapters {
  margin: 4rem 0 0 0;
}
.r_episode-chapters {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_episode-chapters__headline {
  margin: 0 !important;
}
.r_episode-chapters__header {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 2rem;
}
.r_episode-chapters__icon {
  margin-right: 1rem;
}
.r_episode-chapters__icon--ia {
  cursor: grab;
  margin-right: 0.25rem;
}
.r_episode-chapters__item {
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0 2rem 0 0;
  height: 50px;
}
.r_episode-chapters__item__duration {
  margin-right: 1rem;
  padding-left: 1rem;
}
.r_episode-chapters__item__start {
  padding-right: 1rem;
  min-width: 5rem;
}
.r_episode-chapters__item__title {
  flex-grow: 1;
}
.r_episode-chapters__list {
  padding: 0.5rem 0;
}
</style>

<script>
export default {
  props: {
    episode: {
      type: Object,
      required: true
    },
    uploadMode: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>
