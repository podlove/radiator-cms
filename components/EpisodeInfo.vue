<template>
  <!-- Shows the most important information of an episode in a box. -->
  <ul class="r_episode-info">
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label is-size-7 has-text-weight-bold">
        Number:
      </label>
      <p class="r_episode-info__item__value">
        {{ episode && episode.number ? episode.number : '' }}
      </p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label is-size-7 has-text-weight-bold">
        Slug:
      </label>
      <p class="r_episode-info__item__value">
        {{ episode && episode.slug ? episode.slug : '' }}
      </p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label is-size-7 has-text-weight-bold">
        Title:
      </label>
      <p class="r_episode-info__item__value">
        {{ episode && episode.title ? episode.title : '' }}
      </p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label is-size-7 has-text-weight-bold">
        Subtitle:
      </label>
      <p class="r_episode-info__item__value">
        {{ episode && episode.subtitle ? episode.subtitle : '' }}
      </p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label is-size-7 has-text-weight-bold">
        Description:
      </label>
      <p class="r_episode-info__item__value">
        {{ episode && episode.description ? episode.description : '' }}
      </p>
    </li>
  </ul>
</template>

<style>
.r_episode-info {
  margin: 1rem auto;
  padding: 1rem 0;
  max-width: 960px;
}
.r_episode-info__item {
  display: flex;
  margin: 1rem 0;
}
.r_episode-info__item {
  display: flex;
  margin: 1rem 0;
}
.r_episode-info__item__label {
  margin-right: 1rem;
  width: 5rem;
}
.r_episode-info__item__value {
  width: calc(100% - 5rem);
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
