<template>
  <!-- Shows the most important episode data as tags. -->
  <div v-if="episode" class="container tile r_episode-tags columns">
    <div class="column">
      <p class="is-size-7 has-text-weight-bold">
        Publishing:
      </p>
      <b-taglist attached>
        <b-tag type="is-dark">Public website:</b-tag>
        <b-tag v-if="episode.publicPage" type="is-light">
          <a
            class="r_episode-tags__link"
            :href="episode.publicPage"
            target="_blank"
          >
            {{ episode.publicPage }}
          </a>
        </b-tag>
        <b-tag v-if="!episode.publicPage" type="is-warning">
          no public website yet
        </b-tag>
      </b-taglist>
      <b-taglist class="r_episode-tags__state__tags" attached>
        <b-tag type="is-dark">Publishing state:</b-tag>
        <b-tag v-if="episode.publishState === 'drafted'" type="is-info">
          Drafted
        </b-tag>
        <b-tag v-if="episode.publishState === 'scheduled'" type="is-warning">
          Scheduled
        </b-tag>
        <b-tag v-if="episode.publishState === 'published'" type="is-success">
          Published
        </b-tag>
        <b-tag v-if="episode.publishState === 'depublished'" type="is-danger">
          Depublished
        </b-tag>
      </b-taglist>
      <b-taglist attached>
        <b-tag type="is-dark">Publishing date:</b-tag>
        <b-tag v-if="episode.publishedAt" type="is-light">{{
          $moment(episode.publishedAt).format('MMMM Do YYYY, h:mm:ss a')
        }}</b-tag>
        <b-tag v-if="!episode.publishedAt" type="is-warning">
          not published yet
        </b-tag>
      </b-taglist>
      <b-button
        v-if="
          episode.publishState === 'drafted' ||
            episode.publishState === 'depublished'
        "
        class="r_episode-tags__button"
        type="is-primary"
        @click.stop.prevent="$emit('publishEpisode')"
      >
        <b-icon size="is-small" icon="cloud-upload"></b-icon>
        <span> Publish Episode</span>
      </b-button>
      <b-button
        v-if="
          episode.publishState === 'published' ||
            episode.publishState === 'scheduled'
        "
        class="r_episode-tags__button"
        type="is-danger"
        outlined
        @click.stop.prevent="$emit('depublishEpisode')"
      >
        <b-icon size="is-small" icon="cloud-upload"></b-icon>
        <span> Depublish Episode</span>
      </b-button>
    </div>
  </div>
</template>

<style>
/* Overwrite Bulma */
.tags,
.tag {
  margin-bottom: 0 !important;
  margin-top: 0.25rem;
}
.r_episode-tags {
  margin: 1rem auto;
  padding: 1rem 0;
}
.r_episode-tags__button {
  margin-top: 2rem;
}
.r_episode-tags__link,
.r_episode-tags__link:hover,
.r_episode-tags__link:focus,
.r_episode-tags__link:active {
  color: #4a4a4a;
}
.r_episode-info {
  margin: 0 auto;
}
.r_episode-info__item {
  display: flex;
  align-items: center;
  margin: 0 0 1rem 0;
  min-height: 1.5rem;
}
.r_episode-info__item__label {
  margin-right: 1rem;
  width: 3rem;
}
.r_episode-info__item__value {
  width: calc(100% - 3rem);
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
