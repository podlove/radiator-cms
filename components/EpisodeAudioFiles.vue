<template>
  <!-- Shows Audio Files as a list. -->
  <section class="r_episode-af">
    <section class="r_episode-af__header">
      <h2 class="title is-size-5 r_episode-af__headline">
        Audio Files
      </h2>
    </section>
    <ul class="r_episode-af__list">
      <li v-for="file in audioFiles" :key="file.id" class="r_episode-af__item">
        <p class="r_episode-af__url">
          <a :href="file.file" target="_blank">
            {{ file.title }}
          </a>
        </p>
        <b-tag class="r_episode-af__type" type="is-primary" rounded>
          {{ file.mimeType }}
        </b-tag>
        <span class="r_episode-af__duration">{{ file.byteLength }}</span>
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
  props: {
    audioFiles: {
      type: Array,
      required: true
    }
  }
}
</script>
