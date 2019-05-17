<template>
  <section class="has-background-white r_episodes">
    <section class="r_episodes__header">
      <b-input
        class="r_episodes__header__search"
        icon="magnify"
        type="search"
        placeholder="Search..."
      ></b-input>
      <b-field class="r_episodes__header__sortby" label="Sort by">
        <b-select placeholder="Latest, alphabetically, ...">
          <option value="1">Latest</option>
          <option value="2">Alphabetically</option>
        </b-select>
      </b-field>
      <b-button>
        <b-icon size="is-small" icon="plus-circle-outline"></b-icon>
        <a :href="`${path}/new`"> Add new Episode</a>
      </b-button>
    </section>
    <no-ssr>
      <section class="r_episodes__main">
        <ul v-if="podcast && podcast.episodes && podcast.episodes.length > 0">
          <li
            v-for="episode in podcast.episodes"
            :key="episode.guid"
            class="r_episodes__podcast"
          >
            <div class="r_episodes__podcast__main">
              <div
                class="r_episodes__main__cover has-background-light"
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
            <div class="r_episodes__podcast__aside">
              <b-tooltip label="Edit episode" type="is-dark">
                <b-button type="is-text">
                  <b-icon icon="pencil"></b-icon>
                </b-button>
              </b-tooltip>
              <b-tooltip label="Open episode page in new tab" type="is-dark">
                <b-button type="is-text">
                  <b-icon icon="open-in-new"></b-icon>
                </b-button>
              </b-tooltip>
              <b-button type="is-text">
                <b-icon icon="dots-vertical"></b-icon>
              </b-button>
            </div>
          </li>
        </ul>
        <div class="r_episodes__footer">
          <b-pagination
            :total="total"
            :current.sync="current"
            :order="order"
            :per-page="perPage"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
          </b-pagination>
        </div>
      </section>
    </no-ssr>
  </section>
</template>

<style>
.r_episodes {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_episodes__header {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem;
}
.r_episodes__header__search {
  flex-grow: 1;
  margin-right: 1rem;
}
.r_episodes__header__sortby {
  align-items: center;
  display: flex;
  margin-bottom: 0 !important;
  margin-right: 1rem;
}
.r_episodes__header__sortby label {
  font-weight: 400;
  margin-bottom: 0 !important;
  margin-right: 0.5rem;
}
.r_episodes__footer {
  padding: 1rem;
}
.r_episodes__main__cover {
  background-size: cover;
  border-radius: 0.125rem;
  margin-right: 0.5rem;
  width: 1.875rem;
  height: 1.875rem;
}
.r_episodes__podcast {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 0.675rem 1.25rem;
  transition: background-color 0.075s ease-in-out;
}
.r_episodes__podcast:hover {
  background-color: lightgray;
}
.r_episodes__podcast__aside {
  margin-left: 2rem;
}
.r_episodes__podcast__main {
  align-items: center;
  display: flex;
  flex-grow: 1;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      activeTab: 0,
      total: 200,
      current: 1,
      perPage: 20,
      order: 'is-centered',
      path: this.$route.path
    }
  },
  computed: mapState({
    podcast: state => state.podcasts.podcast
  }),
  created: function() {
    console.log('!!', this.$route)
  }
}
</script>
