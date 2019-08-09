<template>
  <!-- Shows the collaborators of a network. -->
  <b-table
    :data="network.collaborators"
    :mobile-cards="true"
    :paginated="true"
    :per-page="5"
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
              props.row.user && props.row.user.image ? props.row.user.image : ''
            })`
          }"
        ></div>
      </b-table-column>
      <b-table-column field="username" label="Username" sortable>
        {{ props.row.user.username }}
      </b-table-column>
      <b-table-column field="displayName" label="Display name" sortable>
        {{ props.row.user.displayName }}
      </b-table-column>
      <b-table-column field="permission" label="Permission" sortable>
        {{ props.row.permission }}
      </b-table-column>
      <b-table-column width="50">
        <b-tooltip label="Edit collaborator" type="is-dark">
          <b-button type="is-text">
            <b-icon icon="pencil"></b-icon>
          </b-button>
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
