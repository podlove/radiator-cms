<template>
  <!-- AUDIO PUBLICATION PAGE -->
  <!-- path: `/networks/[network_id]/audio-publications/[audio_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_audio-pub-hero">
        <div
          class="r_audio-pub-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              activeAudio && activeAudio.image ? activeAudio.image : ''
            })`
          }"
        ></div>
        <div class="r_audio-pub-hero__container">
          <h1
            v-if="activeAudio"
            class="title is-size-3 r_audio-pub-hero__title"
          >
            {{ activeAudio.audioPublication.title }}
          </h1>
        </div>
      </div>
    </section>
    <section v-if="activeAudio" class="r_audio-pub-highlights">
      <div class="tile r_audio-pub-highlights__tile">
        <div class="tile">
          <b-taglist attached>
            <b-tag type="is-dark">State:</b-tag>
            <b-tag type="is-success">
              {{ activeAudio.audioPublication.publishState }}
            </b-tag>
          </b-taglist>
        </div>
        <div class="tile">
          <b-taglist attached>
            <b-tag type="is-dark">Published at:</b-tag>
            <b-tag type="is-success">
              {{ activeAudio.audioPublication.publishedAt }}
            </b-tag>
          </b-taglist>
        </div>
        <div class="tile">
          <b-taglist attached>
            <b-tag type="is-dark">Duration:</b-tag>
            <b-tag type="is-primary">
              {{ activeAudio.durationString }}
            </b-tag>
          </b-taglist>
        </div>
      </div>
    </section>
    <section v-if="activeAudio" class="container r_audio-pub-main">
      <section class="r_audio-pub-main__container r_audio-pub__info">
        <b-field label="Title">
          <p v-if="isDisabled && !activeAudio.title">
            No title set.
          </p>
          <b-input
            v-if="isDisabled && activeAudio.title"
            v-model="activeAudio.title"
            disabled
          ></b-input>
          <b-input
            v-if="!isDisabled"
            v-model="title"
            :placeholder="activeAudio.title"
            :is-loading="isLoading"
          ></b-input>
        </b-field>
      </section>
      <section class="r_audio-pub-main__container r_audio-pub__files">
        <h3 class="is-size-4">Audio Files:</h3>
        <div
          v-for="file in activeAudio.audioFiles"
          :key="file.id"
          class="r_audio-pub__audio-file"
        >
          <div id="podlove-webplayer" class="r_audio-pub__player"></div>
        </div>
      </section>
      <section class="r_audio-pub-main__container r_audio-pub__contributions">
        <h3 class="is-size-4">Contributions:</h3>
        <div
          v-if="
            !activeAudio.contributions || activeAudio.contributions.length === 0
          "
        >
          <p class="r_audio-pub__info-text">
            There are no contributions.
          </p>
          <!-- TODO: Add button/link and upload field when button/link was pressed, to upload contributions. -->
        </div>
        <div
          v-for="contribution in activeAudio.contributions"
          :key="contribution.id"
          class="r_audio-pub__contribution"
        >
          {{ contribution.title }}
        </div>
      </section>
      <section class="r_audio-pub-main__container r_audio-pub__files">
        <h3 class="is-size-4">Chapter Marks:</h3>
        <div v-if="!activeAudio.chapters || activeAudio.chapters.length === 0">
          <p class="r_audio-pub__info-text">
            There are no chapter marks.
          </p>
          <!-- TODO: Add button/link and upload field when button/link was pressed, to upload chapter marks. -->
        </div>
        <div
          v-for="chapter in activeAudio.chapters"
          :key="chapter.id"
          class="r_audio-pub__chapter"
        >
          {{ chapter.title }}
        </div>
      </section>
      <section class="r_audio-pub__interaction">
        <b-button
          v-if="isDisabled"
          type="is-primary"
          outlined
          @click.stop.prevent="edit()"
        >
          Edit Audio
        </b-button>
        <b-button
          v-if="!isDisabled"
          type="is-danger"
          outlined
          @click.stop.prevent="deleteAudioPublication()"
        >
          Delete Audio
        </b-button>
        <b-button
          v-if="!isDisabled"
          type="is-dark"
          outlined
          @click.stop.prevent="cancel()"
        >
          Cancel
        </b-button>
        <b-button
          v-if="!isDisabled"
          type="is-primary"
          @click.stop.prevent="save()"
        >
          Save
        </b-button>
      </section>
    </section>
  </section>
</template>

<style>
.r_audio-pub__interaction {
  margin-top: 1rem;
  text-align: right;
}
.r_audio-pub__player {
  text-align: center;
  margin-top: 3rem;
}
.r_audio-pub-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
}
.r_audio-pub-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_audio-pub-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_audio-pub-hero__title {
  font-weight: 400;
}
.r_audio-pub-highlights {
  background-color: #e8e8e8;
  padding: 3.5rem 0 2rem 0;
}
.r_audio-pub-highlights__tile {
  margin: 1rem auto;
  padding: 1rem 0;
  max-width: 960px;
}
.r_audio-pub-main {
  padding: 1rem 0 3rem 0;
}
.r_audio-pub-main__container {
  padding: 2rem 0 0 0;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isDisabled: true,
      isLoading: false,
      title: ''
    }
  },
  computed: mapState({
    activeAudio: state => state.audio.activeAudio,
    activeNetwork: state => state.networks.activeNetwork
  }),
  updated() {
    if (
      typeof this.activeAudio === 'object' &&
      this.activeAudio.audioFiles &&
      this.activeAudio.audioFiles.length > 0
    ) {
      // TODO: add chapter marks and transcript to player
      const playerConfig = {
        title: this.activeAudio.audioPublication.title,
        audio: [],
        duration: this.activeAudio.durationString,
        publicationDate: this.activeAudio.publishedAt,
        poster: this.activeAudio.image,
        chapters:
          this.activeAudio.audio && this.activeAudio.audio.chapters
            ? this.activeAudio.audio.chapters
            : null
      }
      for (const file of this.activeAudio.audioFiles) {
        playerConfig.audio.push({
          url: file.file,
          mimeType: file.mimeType,
          size: file.byteLength,
          title: file.title
        })
      }
      window.podlovePlayer('#podlove-webplayer', playerConfig)
    }
  },
  methods: {
    cancel() {
      this.isDisabled = true
    },
    deleteAudioPublication() {
      this.$store
        .dispatch('audio/deleteAudioPublication', {
          id: this.activeAudio.audioPublication.id
        })
        .then(() => {
          this.$router.push('/network/' + this.activeNetwork.id)
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    edit() {
      this.isDisabled = false
    },
    save() {
      this.isLoading = true
      this.$store
        .dispatch('audio/updateAudioPublication', {
          id: 1,
          title: this.title
        })
        .then(() => {
          this.isDisabled = true
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    }
  }
}
</script>
