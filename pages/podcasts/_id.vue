<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body r_podcast-hero">
        <div
          class="r_podcast-hero__cover has-background-light"
          :style="{ backgroundImage: `url(${podcast ? podcast.image : ''})` }"
        ></div>
        <div class="container r_podcast-hero__container">
          <h1 v-if="podcast" class="title is-size-3 r_podcast-hero__title">
            {{ podcast.title }}
          </h1>
          <h1 v-if="podcast" lass="subtitle is-size-6">
            {{ podcast.subtitle }}
          </h1>
        </div>
        <div class="r_podcast-hero__menu">
          <b-button type="is-white" outlined>
            <b-icon size="is-small" icon="settings"></b-icon>
          </b-button>
        </div>
      </div>
    </section>
    <section class="has-background-white r_podcast-card">
      <section class="r_podcast-card__header">
        <h2 class="is-size-5">Episodes</h2>
        <b-input icon="magnify" type="search" placeholder="Search..."></b-input>
        <b-field class="r_podcast-card__header__sortby" label="Sort by">
          <b-select placeholder="Latest, alphabetically, ...">
            <option value="1">Latest</option>
            <option value="2">Alphabetically</option>
          </b-select>
        </b-field>
        <b-button>
          <b-icon size="is-small" icon="plus-circle-outline"></b-icon>
          <span> Add new Episode</span>
        </b-button>
      </section>
      <section class="r_podcast-card__main">
        <ul v-if="podcast && podcast.episodes && podcast.episodes.length > 0">
          <li
            v-for="episode in podcast.episodes"
            :key="episode.guid"
            class="r_podcast-card__podcast"
          >
            <div class="r_podcast-card__podcast__main">
              <div
                class="r_podcast-card__main__cover has-background-light"
                :style="{
                  backgroundImage: `url(${
                    episode.image ? episode.image : podcast.image
                  })`
                }"
              ></div>
              <p>{{ episode.title }}</p>
            </div>
            <p>
              <b-icon size="is-small" icon="check-circle-outline"></b-icon>
              <span> {{ episode.publishedAt }}</span>
            </p>
            <div class="r_podcast-card__podcast__aside">
              <b-button type="is-text" outlined>
                <b-icon icon="pencil"></b-icon>
              </b-button>
              <b-button type="is-text" outlined>
                <b-icon icon="open-in-new"></b-icon>
              </b-button>
              <b-button type="is-text" outlined>
                <b-icon icon="dots-vertical"></b-icon>
              </b-button>
            </div>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<style>
.r_podcast-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 5rem 1.5rem;
}
.r_podcast-card__header {
  align-items: center;
  border-bottom: 1px solid grey;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
}
.r_podcast-card__header__sortby {
  align-items: center;
  display: flex;
  margin-bottom: 0 !important;
}
.r_podcast-card__header__sortby label {
  font-weight: 400;
  margin-bottom: 0 !important;
  margin-right: 0.5rem;
}
.r_podcast-card__main__cover {
  background-size: cover;
  border-radius: 0.125rem;
  margin-right: 0.5rem;
  width: 1.875rem;
  height: 1.875rem;
}
.r_podcast-card__podcast {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 0.675rem 1.25rem;
  transition: background-color 0.075s ease-in-out;
}
.r_podcast-card__podcast:hover {
  background-color: lightgray;
}
.r_podcast-card__podcast__aside {
  margin-left: 2rem;
}
.r_podcast-card__podcast__main {
  align-items: center;
  display: flex;
  flex-grow: 1;
}
.r_podcast-hero {
  padding-bottom: 2.5rem !important;
  padding-top: 11.25rem !important;
  position: relative;
}
.r_podcast-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_podcast-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_podcast-hero__menu {
  position: absolute;
  top: 11.25rem;
  right: 1.5rem;
}
.r_podcast-hero__title {
  font-weight: 400;
  margin-bottom: 0.5rem !important;
}
</style>

<script>
export default {
  data() {
    return {
      podcast: null
    }
  },
  created() {
    this.$store
      .dispatch('podcasts/getPodcast', {
        id: this.$route.params.id
      })
      .then(result => {
        console.log(result)
        this.podcast = result
      })
      .catch(error => {
        console.warn(error)
        this.$router.push('/404')
      })
  }
}
</script>
