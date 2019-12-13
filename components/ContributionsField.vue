<template>
  <section>
    <div
      v-if="contributions && contributions.length && contributions.length > 0"
    >
      <ContributorsTable
        :contributors="contributions"
        @delete="contributor => handleDeleteContributor(contributor)"
        @edit="contributor => handleEditContributor(contributor)"
      ></ContributorsTable>
      <b-button
        class="r_add-button"
        icon-left="plus-circle"
        @click.stop.prevent="handleAddContributionModalOpen()"
      >
        Add contribution
      </b-button>
    </div>
    <div
      v-if="
        !contributions || !contributions.length || !contributions.length > 0
      "
      class="r_empty-contributions"
    >
      <p>No contributions in this episode yet.</p>
      <b-button
        icon-left="plus-circle"
        @click.stop.prevent="handleAddContributionModalOpen()"
      >
        Add contribution
      </b-button>
    </div>
  </section>
</template>

<style>
.r_add-button {
  float: right;
  margin-top: 0.5rem;
}
</style>

<script>
import ContributorsTable from '~/components/ContributorsTable'

export default {
  components: {
    ContributorsTable
  },
  props: {
    contributions: {
      type: Array,
      required: false,
      default: null
    }
  },
  methods: {
    handleAddContributionModalOpen() {
      this.$emit('addContributionModalOpen')
    },
    handleEditContributor(contributor) {
      this.$emit('edit', contributor)
    },
    handleDeleteContributor(contributor) {
      this.$emit('delete', contributor)
    }
  }
}
</script>
