<template>
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
      <b-table-column field="image" label="Image" sortable>
        <div
          class="r_audio-pub__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              props.row.audio && props.row.audio.image
                ? props.row.audio.image
                : ''
            })`
          }"
        ></div>
      </b-table-column>
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
      <b-table-column width="50">
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
      </b-table-column>
    </template>
  </b-table>
</template>

<style>
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
