<template>
  <!-- Shows episodes as a list. -->
  <section class="has-background-white r_episodes">
    <!-- <section class="r_episodes__header">
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
    </section> -->
    <no-ssr>
      <section class="r_episodes__main">
        <b-table
          v-if="podcast && podcast.episodes && podcast.episodes.length > 0"
          :data="podcast.episodes"
          :mobile-cards="true"
          :paginated="true"
          :per-page="20"
          detailed
          detail-key="id"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <template slot-scope="props">
            <b-table-column
              v-if="props.row.number"
              field="number"
              label="Number"
              width="40"
              sortable
            >
              {{ props.row.number }}
            </b-table-column>
            <b-table-column field="title" label="Title" sortable>
              {{ props.row.title }}
            </b-table-column>
            <b-table-column
              field="publishedAt"
              label="Date"
              sortable
              width="130"
            >
              <b-tooltip
                :label="
                  `Successfully published on ${$moment(
                    props.row.publishedAt
                  ).format('DD.MM.YYYY')}`
                "
                type="is-dark"
              >
                <b-taglist attached>
                  <b-tag type="is-success">
                    <b-icon icon="check-circle" size="is-small"></b-icon>
                  </b-tag>
                  <b-tag type="is-dark">
                    {{ $moment(props.row.publishedAt).format('DD.MM.YYYY') }}
                  </b-tag>
                </b-taglist>
              </b-tooltip>
            </b-table-column>
            <b-table-column width="100">
              <b-tooltip label="Edit episode" type="is-dark">
                <b-button
                  type="is-text"
                  @click="$router.push(`episodes/${props.row.id}`)"
                >
                  <b-icon icon="pencil"></b-icon>
                </b-button>
              </b-tooltip>
              <b-tooltip label="Open episode page in new tab" type="is-dark">
                <b-button type="is-text">
                  <b-icon icon="open-in-new"></b-icon>
                </b-button>
              </b-tooltip>
            </b-table-column>
          </template>
          <template slot="detail" slot-scope="props">
            <article class="media">
              <figure v-if="props.row.image" class="media-left">
                <p class="image is-64x64">
                  <img :src="props.row.image" />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ props.row.title }}</strong>
                    <br />
                    <small>{{ props.row.subtitle }}</small>
                  </p>
                  <p>
                    {{ props.row.description }}
                  </p>
                  <b-taglist attached>
                    <b-tag type="is-primary">
                      Duration:
                    </b-tag>
                    <b-tag type="is-dark">
                      {{ props.row.duration }}
                    </b-tag>
                  </b-taglist>
                </div>
              </div>
            </article>
          </template>
        </b-table>
      </section>
    </no-ssr>
  </section>
</template>

<style>
/* Overwrite Buefy table styles */
.b-table .level {
  padding-right: 1rem;
}
/* Overwrite Buefy table styles */
.table td {
  vertical-align: inherit;
}
.r_episodes {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 0.25rem 0 0 0;
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
  created() {
    console.log(this.podcast)
  }
}
</script>
