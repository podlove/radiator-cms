<template>
  <!-- AUDIO PUBLICATION PAGE -->
  <!-- path: `/networks/[network_id]/audio-publications/[audio_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_audio-pub-hero">
        <div
          :style="{
            backgroundImage: `url(${
              activeAudio && activeAudio.image ? activeAudio.image : ''
            })`
          }"
          class="r_audio-pub-hero__cover has-background-light"
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
            @click.prevent="handlePublishAudioPublication()"
            class="r_audio-pub-highlights__button"
            type="is-primary"
          >
            <b-icon size="is-small" icon="cloud-upload"></b-icon>
            <span> Publish Audio Publication</span>
          </b-button>
          <b-button
            v-if="
              activeAudio.audioPublication.publishState === 'published' ||
                activeAudio.audioPublication.publishState === 'scheduled'
            "
            @click.prevent="handleDepublishAudioPublication()"
            class="r_audio-pub-highlights__button"
            type="is-danger"
            outlined
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
      <b-field label="Title">
        <!-- <p v-if="!activeAudio.audioPublication.title">
          No title set.
        </p>
        <b-input
          v-if="activeAudio.audioPublication.title"
          v-model="activeAudio.audioPublication.title"
          disabled
        ></b-input>
        <b-input
          v-model="title"
          :placeholder="activeAudio.audioPublication.title"
          :is-loading="isLoading"
        ></b-input> -->
        <p class="r_inactive-input">
          <b-input
            v-if="editable.title"
            v-model="currentContent.title"
            :placeholder="activeAudio.audioPublication.title"
            type="text"
            class="r_inactive-input__input"
          ></b-input>
          <span v-if="!editable.title" class="r_inactive-input__text">
            {{ activeAudio.audioPublication.title }}
          </span>
          <b-button
            v-if="!editable.title"
            @click.stop.prevent="editable.title = true"
            type="is-text"
          >
            <b-icon icon="pencil"></b-icon>
          </b-button>
          <b-button
            v-if="editable.title"
            @click.stop.prevent="editable.title = false"
            type="is-text"
          >
            <b-icon icon="cancel"></b-icon>
          </b-button>
          <b-button
            v-if="editable.title"
            @click.stop.prevent="
              handleUpdateAudioPublication('title', {
                title: currentContent.title
              })
            "
            type="is-text"
          >
            <b-icon icon="check"></b-icon>
          </b-button>
        </p>
      </b-field>
      <b-field label="Audio Files">
        <div
          v-for="file in activeAudio.audioFiles"
          :key="file.id"
          class="r_inactive-input__audiofile"
        >
          <div class="r_inactive-input__audiofile__container">
            <p class="r_inactive-input__audiofile__url">
              {{ file.title }}
            </p>
            <b-tag
              v-if="file.mimeType"
              class="r_inactive-input__audiofile__type"
              type="is-primary"
              rounded
            >
              {{ file.mimeType }}
            </b-tag>
            <span class="r_inactive-input__audiofile__duration">
              {{ activeAudio.durationString }}
            </span>
          </div>
          <b-button
            @click.prevent="handleAudioFileDelete({ id: file.id })"
            type="is-text"
          >
            <b-icon icon="delete"></b-icon>
          </b-button>
        </div>
        <div
          v-if="!activeAudio.audioFiles || activeAudio.audioFiles.length <= 0"
        >
          <upload
            :state="audioFileState"
            :type="'AUDIO'"
            :audio="
              audioUploadResult && audioUploadResult.public_url
                ? audioUploadResult.public_url
                : null
            "
            @dropped="params => handleAudioFileDrop(params)"
            @deleted="params => handleAudioFileDelete(params)"
            class="field"
          />
        </div>
      </b-field>
      <b-field label="Audio Publication Cover">
        <div class="r_inactive-input__cover">
          <div
            v-if="!editable.image"
            :style="{
              backgroundImage: `url(${
                activeAudio.image ? activeAudio.image : ''
              })`
            }"
            class="r_inactive-input__cover__image"
          ></div>
          <upload
            v-if="editable.image"
            :state="coverFileState"
            :type="'IMAGE'"
            :image="currentContent.image"
            @dropped="
              params =>
                handleUpdateAudio('image', {
                  image: params.file
                })
            "
            class="field"
          />
          <b-button
            v-if="!editable.image"
            @click.stop.prevent="editable.image = true"
            type="is-text"
          >
            <b-icon icon="pencil"></b-icon>
          </b-button>
        </div>
      </b-field>
      <b-field label="Contributions">
        <ContributionsField
          :contributions="activeAudio.contributions"
          @addContributionModalOpen="() => (isNewContributorModalActive = true)"
          @delete="id => handleDeleteContributor(id)"
          @edit="contributor => handleEditContributor(contributor)"
        ></ContributionsField>
      </b-field>
      <b-button
        v-if="activeAudio.audioPublication"
        @click.prevent="deleteAudioPublication()"
        class="r_audio-pub-highlights__button"
        type="is-danger"
        outlined
      >
        <b-icon size="is-small" icon="delete"></b-icon>
        <span> Delete Audio Publication</span>
      </b-button>
    </section>
    <NewContributorModal
      :active="isNewContributorModalActive"
      :contribution-roles="contributionRoles"
      :persons="activeNetwork ? activeNetwork.people : null"
      @close="() => (isNewContributorModalActive = false)"
      @contributorAdded="contributor => handleNewContributor(contributor)"
      @contributorSelected="
        contributor => handleContributorSelected(contributor)
      "
    ></NewContributorModal>
    <EditContributorModal
      :active="isEditContributorModalActive"
      :contribution-roles="contributionRoles"
      :contributor="activeContributor"
      @close="() => (isEditContributorModalActive = false)"
      @contributorUpdated="contributor => handleUpdateContributor(contributor)"
    ></EditContributorModal>
    <EpisodeChapters
      :editable="activeAudioChapters.length === 0"
    ></EpisodeChapters>
  </section>
</template>

<style>
/* Overwrite Bulma */
.field:not(:last-child) {
  margin-bottom: 1.5rem !important;
}
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
.r_empty-contributions {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.r_inactive-input {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0.5rem 0;
}
.r_inactive-input__audiofile {
  display: flex;
}
.r_inactive-input__audiofile__container {
  background-color: #e8e8e8;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 0.5rem;
  padding: 0.425rem 1rem;
  min-height: 2.375rem;
}
.r_inactive-input__audiofile__url {
  flex-grow: 1;
}
.r_inactive-input__audiofile__type {
  margin: 0 1rem;
}
.r_inactive-input__cover {
  display: flex;
  align-items: flex-start;
}
.r_inactive-input__cover__image {
  background-color: #e8e8e8;
  background-size: cover;
  border-radius: 50%;
  margin-right: 1rem;
  width: 6rem;
  height: 6rem;
}
.r_inactive-input__input {
  background-color: #e8e8e8;
  border-radius: 0.25rem;
  flex-grow: 1;
  margin-right: 0.5rem;
}
.r_inactive-input__text--textarea {
  min-height: 6.75rem;
}
.r_inactive-input__text {
  background-color: #e8e8e8;
  border-radius: 0.25rem;
  flex-grow: 1;
  margin-right: 0.5rem;
  padding: 0.425rem 1rem;
  min-height: 2.375rem;
}
</style>

<script>
import { mapState } from 'vuex'
import ContributionsField from '~/components/ContributionsField'
import EditContributorModal from '~/components/EditContributorModal'
import NewContributorModal from '~/components/NewContributorModal'
import Upload from '~/components/Upload'
import EpisodeChapters from '~/components/EpisodeChapters'

export default {
  components: {
    ContributionsField,
    EditContributorModal,
    EpisodeChapters,
    NewContributorModal,
    Upload
  },
  data() {
    return {
      activeContributor: null,
      audioFileState: null,
      audioUploadResult: null,
      currentContent: {
        audio: null,
        image: null,
        title: ''
      },
      editable: {
        audio: false,
        image: false,
        title: false
      },
      isEditContributorModalActive: false,
      isNewContributorModalActive: false,
      isLoading: false,
      title: this.activeAudio ? this.activeAudio.audioPublication.title : ''
    }
  },
  computed: mapState({
    activeAudio: state => state.audio.activeAudio,
    activeNetwork: state => state.networks.activeNetwork,
    contributionRoles: state => state.contributions.contributionRoles,
    activeAudioChapters: state => state.audio.activeAudioChapters
  }),
  methods: {
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
      } else if (params && params.id) {
        this.$store
          .dispatch('audio/deleteAudioFile', {
            id: params.id
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
    handleContributorSelected(contributor) {
      this.$store
        .dispatch('contributions/create', {
          audioId: this.activeAudio.id,
          contributionRoleId: contributor.contributionRoleId,
          personId: contributor.id
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleDeleteContributor(id) {
      this.$store
        .dispatch('contributions/deleteContribution', {
          contributionId: id,
          audioId: this.activeAudio.id
        })
        .then(() => {
          this.alert = {
            type: 'is-success',
            message: 'Contributor successfully removed.'
          }
        })
        .catch(error => {
          console.log(error)
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    handleDepublishAudioPublication() {
      this.$store
        .dispatch('audio/depublishAudioPublication', {
          id: this.activeAudio.audioPublication.id,
          audioId: this.activeAudio.id
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleEditContributor(contributor) {
      this.activeContributor = contributor
      this.isEditContributorModalActive = true
    },
    handleNewContributor(contributor) {
      this.isNewContributorModalActive = false
      this.$store
        .dispatch('people/create', {
          displayName: contributor.displayName || null,
          image: contributor.image || null,
          name: contributor.name || null,
          networkId: this.activeNetwork.id,
          nick: contributor.nick || null,
          audioId: this.activeAudio.id
        })
        .then(result => {
          this.$store
            .dispatch('contributions/create', {
              audioId: this.activeAudio.id,
              contributionRoleId: contributor.contributionRoleId,
              personId: result.id
            })
            .catch(error => {
              console.warn(error)
              this.$router.push('/404')
            })
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handlePublishAudioPublication() {
      this.$store
        .dispatch('audio/publishAudioPublication', {
          id: this.activeAudio.audioPublication.id,
          audioId: this.activeAudio.id
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleUpdateAudio(propertyToSetToEditableFalse, data) {
      data.audioId = this.activeAudio.id
      this.$store
        .dispatch('audio/updateAudio', data)
        .then(() => {
          this.editable[propertyToSetToEditableFalse] = false
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleUpdateAudioPublication(propertyToSetToEditableFalse, data) {
      this.isLoading = true
      this.$store
        .dispatch('audio/updateAudioPublication', {
          id: this.activeAudio.audioPublication.id,
          audioId: this.activeAudio.id,
          title: data.title
        })
        .then(() => {
          this.editable[propertyToSetToEditableFalse] = false
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    handleUpdateContributor(contributor) {
      this.isEditContributorModalActive = false
      this.$store
        .dispatch('people/update', {
          contributionId: this.activeContributor.id,
          contributionRoleId: contributor.contributionRoleId,
          displayName: contributor.displayName,
          email: contributor.email,
          image: contributor.image,
          link: contributor.link,
          name: contributor.name,
          networkId: this.activeNetwork.id,
          nick: contributor.nick,
          personId: this.activeContributor.person.id,
          audioId: this.activeAudio.id
        })
        .catch(error => {
          console.log(error)
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    }
  }
}
</script>
