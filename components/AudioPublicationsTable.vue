<template>
  <b-table
    :data="network.audioPublications"
    :mobile-cards="true"
    :paginated="true"
    :per-page="5"
    aria-next-label="Next page"
    aria-previous-label="Previous page"
    aria-page-label="Page"
    aria-current-label="Current page"
  >
    <template slot-scope="props">
      <b-table-column field="title" label="Title" sortable>
        {{ props.row.title }}
      </b-table-column>
      <b-table-column field="publishState" label="State" sortable>
        {{ props.row.publishState }}
      </b-table-column>
      <b-table-column field="publishedAt" label="Published At" sortable>
        {{ props.row.publishedAt }}
      </b-table-column>
      <b-table-column field="durationString" label="Duration" sortable>
        {{ props.row.audio.durationString }}
      </b-table-column>
      <b-table-column width="100">
        <b-tooltip label="Edit audio" type="is-dark">
          <nuxt-link
            :to="
              '/network/' + network.id + '/audio-publications/' + props.row.id
            "
          >
            <b-button type="is-text">
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </nuxt-link>
        </b-tooltip>
        <b-tooltip label="Open audio page in new tab" type="is-dark">
          <nuxt-link
            :to="
              '/network/' + network.id + '/audio-publications/' + props.row.id
            "
          >
            <b-button type="is-text">
              <b-icon icon="open-in-new"></b-icon>
            </b-button>
          </nuxt-link>
        </b-tooltip>
      </b-table-column>
    </template>
  </b-table>
</template>

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
