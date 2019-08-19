<template>
  <!-- Shows the contributors in a table. -->
  <b-table
    :data="contributors"
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
          class="r_contributor__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              props.row.person && props.row.person.image
                ? props.row.person.image
                : ''
            })`
          }"
        ></div>
      </b-table-column>
      <b-table-column field="username" label="Name" sortable>
        {{ props.row.person.name }}
      </b-table-column>
      <b-table-column field="displayName" label="Display name" sortable>
        {{ props.row.person.displayName }}
      </b-table-column>
      <b-table-column field="contributionRole" label="Role" sortable>
        {{ props.row.contributionRole.title }}
      </b-table-column>
      <b-table-column width="50">
        <b-tooltip label="Edit contributor" type="is-dark">
          <b-button
            @click.prevent="handleEditContributor(props.row.id)"
            type="is-text"
          >
            <b-icon icon="pencil"></b-icon>
          </b-button>
        </b-tooltip>
      </b-table-column>
    </template>
  </b-table>
</template>

<style>
.r_contributor__cover {
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
    contributors: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log('contributors', this.contributors)
  },
  methods: {
    handleEditContributor(id) {
      console.log('id', id)
      this.$emit('edit', {
        id: id
      })
    }
  }
}
</script>
