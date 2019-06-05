<template>
  <div v-if="episode && episode.content" class="r_episode-content">
    <h2 class="title is-size-5 r_episode-content__headline">
      Shownotes
    </h2>
    <div class="r_episode-content__text" v-html="episode.content"></div>
  </div>
</template>

<style>
.r_episode-content {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_episode-content__headline {
  margin: 0 !important;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid lightgrey;
}
.r_episode-content__text {
  padding: 2rem;
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
