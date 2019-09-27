<template>
  <section>
    <b-field label="Title">
      <b-input v-if="isDisabled" v-model="podcast.title"></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="title"
        :placeholder="podcast.title"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Subtitle">
      <b-input v-if="isDisabled" v-model="podcast.subtitle"></b-input>
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
      <b-input v-model="podcast.slug"></b-input>
    </b-field>
    <b-field label="Short Id">
      <b-input v-if="isDisabled" v-model="podcast.shortId"></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="shortId"
        :placeholder="podcast.shortId"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Author">
      <b-input v-if="isDisabled" v-model="podcast.author"></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="author"
        :placeholder="podcast.author"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Owner">
      <b-input v-if="isDisabled" v-model="podcast.ownerName"></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="ownerName"
        :placeholder="podcast.ownerName"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Owner Email">
      <b-input v-if="isDisabled" v-model="podcast.ownerEmail"></b-input>
      <b-input
        v-if="!isDisabled"
        v-model="ownerEmail"
        :placeholder="podcast.ownerEmail"
        :is-loading="isLoading"
      ></b-input>
    </b-field>
    <b-field label="Language">
      <b-input v-if="isDisabled" v-model="podcast.language"></b-input>
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
  </section>
</template>

<style>
.r_settings__cover {
  background-size: cover;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
}
</style>

<script>
import Upload from '~/components/Upload'

export default {
  components: {
    Upload
  },
  props: {
    isDisabled: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    podcast: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      author: '',
      cover: null,
      coverFileState: null,
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
    handleCoverFileDrop(params) {
      this.cover = params.file
      this.coverFileState = 'SUCCESS'
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
    }
  }
}
</script>
