<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body r_episode-hero">
        <div
          class="r_episode-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${cover ? cover : ''})`
          }"
        ></div>
        <div class="r_episode-hero__container">
          <h1 v-if="episode" class="title is-size-3 r_podcast-hero__title">
            {{ episode.title }}
          </h1>
          <h2 v-if="episode" class="subtitle is-size-6">
            {{ episode.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="container r_episode-main">
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
      <section class="r_episode-main">
        <ul class="r_episode-main__info">
          <li class="r_episode-main__info__item">
            <label class="r_episode-main__info__item__label has-text-grey-light"
              >Number:
            </label>
            <p>{{ episode && episode.number ? episode.number : '' }}</p>
          </li>
          <li class="r_episode-main__info__item">
            <label class="r_episode-main__info__item__label has-text-grey-light"
              >Slug:
            </label>
            <p>{{ episode && episode.slug ? episode.slug : '' }}</p>
          </li>
          <li class="r_episode-main__info__item">
            <label class="r_episode-main__info__item__label has-text-grey-light"
              >Title:
            </label>
            <p>{{ episode && episode.title ? episode.title : '' }}</p>
          </li>
          <li class="r_episode-main__info__item">
            <label class="r_episode-main__info__item__label has-text-grey-light"
              >Subtitle:
            </label>
            <p>{{ episode && episode.subtitle ? episode.subtitle : '' }}</p>
          </li>
          <li class="r_episode-main__info__item">
            <label class="r_episode-main__info__item__label has-text-grey-light"
              >Description:
            </label>
            <p>
              {{ episode && episode.description ? episode.description : '' }}
            </p>
          </li>
        </ul>
        <div v-if="episode && episode.content" class="r_episode-main__content">
          <h2 class="title is-size-5 r_episode-main__content__headline">
            Shownotes
          </h2>
          <div
            class="r_episode-main__content__text"
            v-html="episode.content"
          ></div>
        </div>
        <div
          v-if="episode && episode.chapters"
          class="r_episode-main__chapters"
        >
          <h2 class="title is-size-5 r_episode-main__chapters__headline">
            Chapters
          </h2>
          <ul class="r_episode-main__chapters__list">
            <li
              v-for="chapter in episode.chapters"
              :key="chapter.start"
              class="r_episode-main__chapters__item"
            >
              <p class="r_episode-main__chapters__item__start">00:00:00</p>
              <p
                v-if="chapter.link"
                class="r_episode-main__chapters__item__title"
              >
                <a href="" target="_blank">{{ chapter.title }}</a>
              </p>
              <p v-else class="r_episode-main__chapters__item__title">
                {{ chapter.title }}
              </p>
              <p class="r_episode-main__chapters__item__duration">
                {{ chapter.start }}
              </p>
            </li>
          </ul>
        </div>
      </section>
    </section>
  </section>
</template>

<style>
.r_episode-hero {
  padding-bottom: 2.5rem !important;
  padding-top: 11.25rem !important;
  position: relative;
}
.r_episode-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_episode-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_episode-hero__title {
  font-weight: 400;
}
.r_episode-main {
  margin: 6rem auto;
}
.r_episode-main__chapters,
.r_episode-main__info {
  margin: 4rem 0;
}
.r_episode-main__info__item {
  display: flex;
  margin: 1rem 0;
}
.r_episode-main__chapters,
.r_episode-main__content {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_episode-main__chapters__headline,
.r_episode-main__content__headline {
  margin: 0 !important;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid lightgrey;
}
.r_episode-main__chapters__item,
.r_episode-main__info__item {
  display: flex;
  margin: 1rem 0;
  padding: 0 2rem;
}
.r_episode-main__chapters__item__duration {
  padding-left: 1rem;
}
.r_episode-main__chapters__item__start {
  padding-right: 1rem;
  min-width: 5rem;
}
.r_episode-main__chapters__item__title {
  flex-grow: 1;
}
.r_episode-main__chapters__list {
  padding: 1rem 0;
}
.r_episode-main__content__text {
  padding: 2rem;
}
.r_episode-main__info__item__label {
  margin-right: 2rem;
  width: 5rem;
}
</style>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      cover: null,
      episode: null
    }
  },
  created() {
    this.$store
      .dispatch('episodes/getEpisode', {
        id: this.$route.params.eid
      })
      .then(result => {
        this.episode = result
        if (result && result.image) {
          this.cover = result.image
        } else if (result.podcast && result.podcast.image) {
          this.cover = result.podcast.image
        }
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/404')
      })
  }
}
</script>
