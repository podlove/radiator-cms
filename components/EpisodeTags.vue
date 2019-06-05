<template>
  <div class="tile">
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
          episode && episode.publishedAt ? episode.publishedAt : ''
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
