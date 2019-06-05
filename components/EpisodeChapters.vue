<template>
  <div v-if="episode && episode.chapters" class="r_episode-chapters">
    <h2 class="title is-size-5 r_episode-chapters__headline">
      Chapters
    </h2>
    <ul class="r_episode-chapters__list">
      <li
        v-for="chapter in episode.chapters"
        :key="chapter.start"
        class="r_episode-chapters__item"
      >
        <p class="r_episode-chapters__item__start">00:00:00</p>
        <p v-if="chapter.link" class="r_episode-chapters__item__title">
          <a href="" target="_blank">{{ chapter.title }}</a>
        </p>
        <p v-else class="r_episode-chapters__item__title">
          {{ chapter.title }}
        </p>
        <p class="r_episode-chapters__item__duration">
          {{ chapter.start }}
        </p>
      </li>
    </ul>
  </div>
</template>

<style>
.r_episode-chapters {
  margin: 4rem 0;
}
.r_episode-chapters {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_episode-chapters__headline {
  margin: 0 !important;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid lightgrey;
}
.r_episode-chapters__item {
  display: flex;
  margin: 1rem 0;
  padding: 0 2rem;
}
.r_episode-chapters__item__duration {
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
  padding: 1rem 0;
}
</style>

<script>
export default {
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>
