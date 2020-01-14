<template>
  <section class="r_audio-pubs">
    <client-only>
      <section class="r_audio-pubs__main">
        <b-table
          :data="network.audioPublications"
          :mobile-cards="true"
          :paginated="true"
          :per-page="10"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
          <template slot-scope="props">
            <b-table-column width="50" field="image" label="Image" sortable>
              <div
                :style="{
                  backgroundImage: `url(${
                    props.row.audio && props.row.audio.image
                      ? props.row.audio.image
                      : ''
                  })`
                }"
                class="r_audio-pub__cover has-background-light"
              ></div>
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
            <b-table-column width="50">
              <b-tooltip label="Edit audio" type="is-dark">
                <nuxt-link
                  :to="
                    '/network/' +
                      network.id +
                      '/audio-publications/' +
                      props.row.audio.id
                  "
                >
                  <b-button type="is-text">
                    <b-icon icon="pencil"></b-icon>
                  </b-button>
                </nuxt-link>
              </b-tooltip>
            </b-table-column>
          </template>
        </b-table>
      </section>
    </client-only>
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
.r_audio-pubs {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  clear: both;
  padding: 0.25rem 0 0 0;
}
.r_audio-pub__cover {
  background-size: cover;
  border-radius: 0.2125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 2.25rem;
  height: 2.25rem;
}
</style>

<script>
export default {
  props: {
    network: {
      type: Object,
      required: true
    }
  }
}
</script>
