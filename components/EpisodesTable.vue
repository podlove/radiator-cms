<template>
  <!-- Shows episodes as a sortable, paginated table. -->
  <section class="has-background-white r_episodes">
    <no-ssr>
      <section class="r_episodes__main">
        <b-table
          :data="episodes"
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
            <b-table-column field="number" label="Number" width="40" sortable>
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
                v-if="props.row.publishState === 'drafted'"
                :label="'Episode draft'"
                type="is-dark"
              >
                <b-taglist attached>
                  <b-tag type="is-info">
                    <b-icon icon="circle-edit-outline" size="is-small"></b-icon>
                  </b-tag>
                  <b-tag type="is-dark">
                    {{
                      props.row.publishedAt
                        ? $moment(props.row.publishedAt).format('DD.MM.YYYY')
                        : 'no date'
                    }}
                  </b-tag>
                </b-taglist>
              </b-tooltip>
              <b-tooltip
                v-if="props.row.publishState === 'scheduled'"
                :label="
                  'Your episode is scheduled and will be published on ' +
                    props.row.publishedAt
                "
                type="is-dark"
              >
                <b-taglist attached>
                  <b-tag type="is-warning">
                    <b-icon icon="clock-outline" size="is-small"></b-icon>
                  </b-tag>
                  <b-tag type="is-dark">
                    {{
                      props.row.publishedAt
                        ? $moment(props.row.publishedAt).format('DD.MM.YYYY')
                        : 'no date'
                    }}
                  </b-tag>
                </b-taglist>
              </b-tooltip>
              <b-tooltip
                v-if="props.row.publishState === 'published'"
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
                    {{
                      props.row.publishedAt
                        ? $moment(props.row.publishedAt).format('DD.MM.YYYY')
                        : 'no date'
                    }}
                  </b-tag>
                </b-taglist>
              </b-tooltip>
              <b-tooltip
                v-if="props.row.publishState === 'depublished'"
                :label="'Episode depublished'"
                type="is-dark"
              >
                <b-taglist attached>
                  <b-tag type="is-danger">
                    <b-icon
                      icon="alert-circle-outline"
                      size="is-small"
                    ></b-icon>
                  </b-tag>
                  <b-tag type="is-dark">
                    {{
                      props.row.publishedAt
                        ? $moment(props.row.publishedAt).format('DD.MM.YYYY')
                        : 'no date'
                    }}
                  </b-tag>
                </b-taglist>
              </b-tooltip>
            </b-table-column>
            <b-table-column width="100">
              <b-tooltip label="Edit episode" type="is-dark">
                <nuxt-link
                  :to="
                    '/network/' +
                      network.id +
                      '/podcast/' +
                      podcast.id +
                      '/episode/' +
                      props.row.id
                  "
                >
                  <b-button type="is-text">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                </nuxt-link>
              </b-tooltip>
              <b-tooltip label="Open episode page in new tab" type="is-dark">
                <a :href="props.row.publicPage" target="_blank">
                  <b-button type="is-text">
                    <b-icon icon="open-in-new"></b-icon>
                  </b-button>
                </a>
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
                      {{ props.row.duration || 'n/a' }}
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
</style>

<script>
export default {
  props: {
    episodes: {
      type: Array,
      required: true
    },
    network: {
      type: Object,
      required: true
    },
    podcast: {
      type: Object,
      required: true
    }
  }
}
</script>
