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
            v-if="activeAudio && activeAudio.audioPublication"
            class="title is-size-3 r_audio-pub-hero__title"
          >
            {{ activeAudio.audioPublication.title }}
          </h1>
        </div>
      </div>
    </section>
    <section
      v-if="activeAudio && activeAudio.audioPublication"
      class="r_audio-pub-highlights"
    >
      <div
        v-if="activeAudio.audioPublication.publishState"
        class="container r_audio-pub-highlights__info columns"
      >
        <div class="column">
          <p class="is-size-7 has-text-weight-bold">
            Publishing:
          </p>
          <b-taglist class="r_audio-pub-highlights__state" attached>
            <b-tag type="is-dark">Publishing state:</b-tag>
            <b-tag
              v-if="activeAudio.audioPublication.publishState === 'drafted'"
              type="is-info"
            >
              Drafted
            </b-tag>
            <b-tag
              v-if="activeAudio.audioPublication.publishState === 'scheduled'"
              type="is-warning"
            >
              Scheduled
            </b-tag>
            <b-tag
              v-if="activeAudio.audioPublication.publishState === 'published'"
              type="is-success"
            >
              Published
            </b-tag>
            <b-tag
              v-if="activeAudio.audioPublication.publishState === 'depublished'"
              type="is-danger"
            >
              Depublished
            </b-tag>
          </b-taglist>
          <b-taglist attached>
            <b-tag type="is-dark">Publishing date:</b-tag>
            <b-tag
              v-if="activeAudio.audioPublication.publishedAt"
              type="is-light"
            >
              {{
                $moment(activeAudio.audioPublication.publishedAt).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )
              }}
            </b-tag>
            <b-tag
              v-if="!activeAudio.audioPublication.publishedAt"
              type="is-warning"
            >
              not published yet
            </b-tag>
          </b-taglist>
          <b-button
            v-if="
              activeAudio.audioPublication.publishState === 'drafted' ||
                activeAudio.audioPublication.publishState === 'depublished'
            "
            class="r_audio-pub-highlights__button"
            type="is-primary"
            @click.prevent="handlePublishPodcast()"
          >
            <b-icon size="is-small" icon="cloud-upload"></b-icon>
            <span> Publish Audio Publication</span>
          </b-button>
          <b-button
            v-if="
              activeAudio.audioPublication.publishState === 'published' ||
                activeAudio.audioPublication.publishState === 'scheduled'
            "
            class="r_audio-pub-highlights__button"
            type="is-danger"
            outlined
            @click.prevent="handleDepublishPodcast()"
          >
            <b-icon size="is-small" icon="cloud-upload"></b-icon>
            <span> Depublish Audio Publication</span>
          </b-button>
        </div>
      </div>
    </section>
    <section
      v-if="activeAudio && activeAudio.audioPublication"
      class="container r_audio-pub-main"
    >
      <section class="r_audio-pub-main__container r_audio-pub__info">
        <b-field label="Title">
          <p v-if="isDisabled && !activeAudio.audioPublication.title">
            No title set.
          </p>
          <b-input
            v-if="isDisabled && activeAudio.audioPublication.title"
            v-model="activeAudio.audioPublication.title"
            disabled
          ></b-input>
          <b-input
            v-if="!isDisabled"
            v-model="title"
            :placeholder="activeAudio.audioPublication.title"
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
          <upload
            class="field"
            :state="'SUCCESS'"
            :type="'AUDIO'"
            :drop-file="file"
            :audio="file.file"
            @deleted="params => handleAudioFileDelete(params)"
          />
        </div>
        <div v-if="!isDisabled">
          <upload
            class="field"
            :state="audioFileState"
            :type="'AUDIO'"
            :audio="
              audioUploadResult && audioUploadResult.public_url
                ? audioUploadResult.public_url
                : null
            "
            @dropped="params => handleAudioFileDrop(params)"
            @deleted="params => handleAudioFileDelete(params)"
          />
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
/* Overwrite Bulma */
.tags,
.tag {
  margin-bottom: 0 !important;
  margin-top: 0.25rem;
}
.r_audio-pub__audio-file {
  margin-bottom: 1rem;
}
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
  width: 100%;
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
  padding: 2rem 0 4rem 0;
}
.r_audio-pub-highlights__button {
  margin-top: 2rem;
}
.r_audio-pub-highlights__info {
  margin: 1rem auto;
}
.r_audio-pub-highlights__state {
  margin-right: 1rem;
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
import Upload from '~/components/Upload'

export default {
  components: { Upload },
  data() {
    return {
      audioFileState: null,
      audioUploadResult: null,
      isDisabled: true,
      isLoading: false,
      title: this.activeAudio ? this.activeAudio.audioPublication.title : ''
    }
  },
  computed: mapState({
    activeAudio: state => state.audio.activeAudio,
    activeNetwork: state => state.networks.activeNetwork
  }),
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
    handleAudioFileDelete(params) {
      if (params && params.file && params.file.id) {
        this.$store
          .dispatch('audio/deleteAudioFile', {
            id: params.file.id
          })
          .then(() => {
            this.$store.dispatch('audio/getAudio', {
              id: this.activeAudio.id
            })
          })
          .catch(error => {
            console.warn(error)
          })
      }
    },
    handleAudioFileDrop(params) {
      this.audioFileState = 'LOADING'
      this.$store
        .dispatch('audio/createAudioFile', {
          file: params.file,
          title: params.file.name,
          byteSize: params.file.size,
          mimeType: params.file.type,
          audioId: this.activeAudio.id
        })
        .then(() => {
          this.audioUploadResult = this.activeAudio
          this.audioFileState = 'SUCCESS'
        })
        .catch(error => {
          this.audioFileState = 'ERROR'
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    save() {
      this.isLoading = true
      this.$store
        .dispatch('audio/updateAudioPublication', {
          audioId: 1,
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
