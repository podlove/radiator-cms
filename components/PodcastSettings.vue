<template>
  <section>
    <b-field label="Title">
      <b-input v-if="isDisabled" v-model="podcast.title" disabled></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="title"
        :placeholder="podcast.title"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Subtitle">
      <b-input v-if="isDisabled" v-model="podcast.subtitle" disabled></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="subtitle"
        :placeholder="podcast.subtitle"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Summary">
      <b-input
        v-if="isDisabled"
        v-model="podcast.summary"
        disabled
        type="textarea"
      ></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="summary"
        :placeholder="podcast.summary"
        :is-loading="isLoading"
        type="textarea"
      ></b-input>
    </b-field>
    <b-field label="Slug">
      <b-input v-model="podcast.slug" disabled></b-input>
    </b-field>
    <b-field label="Short Id">
      <b-input v-if="isDisabled" v-model="podcast.shortId" disabled></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="shortId"
        :placeholder="podcast.shortId"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Author">
      <b-input v-if="isDisabled" v-model="podcast.author" disabled></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="author"
        :placeholder="podcast.author"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Owner">
      <b-input v-if="isDisabled" v-model="podcast.ownerName" disabled></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="ownerName"
        :placeholder="podcast.ownerName"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Owner Email">
      <b-input
        v-if="isDisabled"
        v-model="podcast.ownerEmail"
        disabled
      ></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="ownerEmail"
        :placeholder="podcast.ownerEmail"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Language">
      <b-input v-if="isDisabled" v-model="podcast.language" disabled></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="language"
        :placeholder="podcast.language"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Cover">
      <div
        v-if="isDisabled"
        class="r_settings__cover"
        :style="{
          backgroundImage: `url(${podcast.image ? podcast.image : ''})`
        }"
      ></div>
      <upload
        v-if="!isDisabled"
        class="field"
        :state="coverFileState"
        :type="'IMAGE'"
        :image="cover"
        @dropped="params => handleCoverFileDrop(params)"
      />
    </b-field>
    <b-field label="Contributions">
      <ContributionsField
        :contributions="podcast.contributions"
        @addContributionModalOpen="() => (isNewContributorModalActive = true)"
        @delete="contributor => handleDeleteContributor(contributor)"
        @edit="contributor => handleEditContributor(contributor)"
      ></ContributionsField>
    </b-field>
    <div class="r_settings__interaction">
      <b-button
        v-if="isDisabled"
        type="is-primary"
        outlined
        @click.stop.prevent="$emit('edit')"
      >
        Edit Details
      </b-button>
      <b-button
        v-if="!isDisabled"
        type="is-danger"
        outlined
        @click.stop.prevent="$emit('delete')"
      >
        Delete Podcast
      </b-button>
      <b-button
        v-if="!isDisabled"
        type="is-dark"
        outlined
        @click.stop.prevent="$emit('cancel')"
      >
        Cancel
      </b-button>
      <b-button
        v-if="!isDisabled"
        type="is-primary"
        @click.stop.prevent="handlePodcastSave()"
      >
        Save
      </b-button>
    </div>
    <NewContributorModal
      v-if="contributionRoles && network"
      :active="isNewContributorModalActive"
      :contribution-roles="contributionRoles"
      :persons="network ? network.people : null"
      @close="() => (isNewContributorModalActive = false)"
      @contributorAdded="contributor => handleNewContributor(contributor)"
      @contributorSelected="
        contributor => handleContributorSelected(contributor)
      "
    ></NewContributorModal>
    <EditContributorModal
      :active="isEditContributorModalActive"
      :contributor="activeContributor"
      :contribution-roles="contributionRoles"
      @close="() => (isEditContributorModalActive = false)"
      @contributorUpdated="contributor => handleUpdateContributor(contributor)"
    ></EditContributorModal>
  </section>
</template>

<style>
/* Overwrite Bulma */
.field:not(:last-child) {
  margin-bottom: 1.5rem !important;
}
.r_settings__cover {
  background-size: cover;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
}
.r_settings__interaction {
  clear: both;
  margin-top: 4rem;
  text-align: right;
}
</style>

<script>
import ContributionsField from '~/components/ContributionsField'
import EditContributorModal from '~/components/EditContributorModal'
import NewContributorModal from '~/components/NewContributorModal'
import Upload from './Upload'

export default {
  components: {
    ContributionsField,
    EditContributorModal,
    NewContributorModal,
    Upload
  },
  props: {
    contributionRoles: {
      type: Array,
      required: false,
      default: null
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    network: {
      type: Object,
      required: false,
      default: null
    },
    podcast: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeContributor: null,
      author: '',
      cover: null,
      coverFileState: null,
      isEditContributorModalActive: false,
      isNewContributorModalActive: false,
      language: '',
      ownerName: '',
      ownerEmail: '',
      shortId: '',
      subtitle: '',
      summary: '',
      title: ''
    }
  },
  methods: {
    handleContributorSelected(contributor) {
      this.$emit('contributorSelected', contributor)
    },
    handleCoverFileDrop(params) {
      this.cover = params.file
      this.coverFileState = 'SUCCESS'
    },
    handleDeleteContributor(contributor) {
      this.$emit('deleteContributor', contributor)
    },
    handleEditContributor(contributor) {
      console.log('edit contributor', contributor)
      this.activeContributor = contributor
      this.isEditContributorModalActive = true
    },
    handleNewContributor(contributor) {
      this.$emit('newContributor', contributor)
    },
    handlePodcastSave() {
      const newPodcastSettings = {
        author: this.author,
        cover: this.cover,
        language: this.language,
        ownerName: this.ownerName,
        ownerEmail: this.ownerEmail,
        shortId: this.shortId,
        subtitle: this.subtitle,
        summary: this.summary,
        title: this.title
      }
      this.$emit('save', newPodcastSettings)
    },
    handleUpdateContributor(contributor) {
      this.$emit('updateContributor', contributor, this.activeContributor)
    }
  }
}
</script>
