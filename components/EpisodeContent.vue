<template>
  <!-- Shows shownotes of an episode. -->
  <div v-if="episode && episode.summary" class="r_episode-content">
    <section class="r_episode-content__header">
      <h2 class="title is-size-5 r_episode-content__headline">
        Shownotes
      </h2>
    </section>
    <div class="r_episode-content__text" v-html="episode.summary"></div>
  </div>
</template>

<style>
.r_episode-content {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 4rem 0 0 0;
}
.r_episode-content__headline {
  margin: 0 !important;
}
.r_episode-content__header {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 2rem;
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
