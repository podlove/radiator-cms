<template>
  <ul class="r_episode-info">
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label has-text-grey-light"
        >Number:
      </label>
      <p>{{ episode && episode.number ? episode.number : '' }}</p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label has-text-grey-light"
        >Slug:
      </label>
      <p>{{ episode && episode.slug ? episode.slug : '' }}</p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label has-text-grey-light"
        >Title:
      </label>
      <p>{{ episode && episode.title ? episode.title : '' }}</p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label has-text-grey-light"
        >Subtitle:
      </label>
      <p>{{ episode && episode.subtitle ? episode.subtitle : '' }}</p>
    </li>
    <li class="r_episode-info__item">
      <label class="r_episode-info__item__label has-text-grey-light"
        >Description:
      </label>
      <p>
        {{ episode && episode.description ? episode.description : '' }}
      </p>
    </li>
  </ul>
</template>

<style>
.r_episode-info {
  margin: 4rem 0;
}
.r_episode-info__item {
  display: flex;
  margin: 1rem 0;
}
.r_episode-info__item {
  display: flex;
  margin: 1rem 0;
  padding: 0 2rem;
}
.r_episode-info__item__label {
  margin-right: 2rem;
  width: 5rem;
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
