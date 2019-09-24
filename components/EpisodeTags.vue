<template>
  <!-- Shows the most important episode data as tags. -->
  <div v-if="episode" class="tile r_episode-tags">
    <div class="tile">
      <b-taglist attached>
        <b-tag type="is-dark">State:</b-tag>
        <b-tag type="is-success">Published</b-tag>
      </b-taglist>
    </div>
    <div class="tile">
      <b-taglist attached>
        <b-tag type="is-dark">Release Date:</b-tag>
        <b-tag type="is-info">{{
          episode && episode.publishedAt
            ? $moment(episode.publishedAt).format('DD.MM.YYYY')
            : ''
        }}</b-tag>
      </b-taglist>
    </div>
    <div class="tile">
      <b-taglist attached>
        <b-tag type="is-dark">Downloads Total:</b-tag>
        <b-tag type="is-info">12.238</b-tag>
      </b-taglist>
    </div>
    <div class="tile">
      <b-taglist attached>
        <b-tag type="is-dark">Downloads Last Week:</b-tag>
        <b-tag type="is-info">3302</b-tag>
      </b-taglist>
    </div>
  </div>
</template>

<style>
.r_episode-tags {
  margin: 1rem auto;
  padding: 1rem 0;
  max-width: 960px;
}
</style>

<script>
export default {
  props: {
    episode: {
      type: Object,
      required: false,
      default: null
    }
  }
}
</script>
