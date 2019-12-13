<template>
  <!-- Creates an upload field with tags for uploaded files. -->
  <section>
    <b-field :label="label">
      <b-upload
        v-if="!newDropFile"
        v-model="newDropFile"
        @input="handleFileDrop($event)"
        drag-drop
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Drop your file here or click to upload.</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="r_preview">
      <!-- TODO: show uploaded image as preview -->
      <span
        v-if="state === 'SUCCESS' && type === 'IMAGE'"
        :style="{
          backgroundImage: `url(${image ? image : ''})`
        }"
        class="r_peview__cover"
      >
        <b-icon v-if="!image" size="is-small" icon="image"></b-icon>
      </span>
      <span
        v-if="dropFile || newDropFile"
        :class="classObject"
        class="r_upload-progress"
      >
        <span class="r_upload-progress__left">
          <b-button
            v-if="state === 'SUCCESS' && audio"
            @click.prevent="handleFilePlay(audio)"
            type="is-text"
            class="r_upload-progress__left__button"
          >
            <b-icon size="is-small" icon="play"></b-icon>
          </b-button>
          <span v-if="dropFile">
            {{ dropFile.name || dropFile.title }}
          </span>
          <span v-if="newDropFile">
            {{ newDropFile.name || newDropFile.title }}
          </span>
        </span>
        <span class="r_upload-progress__right">
          {{ stateLabel }}
          <b-tooltip
            class="r_upload-progress__right__button"
            label="Delete your uploaded file."
            type="is-dark"
          >
            <b-button
              v-if="state === 'SUCCESS' && !isNotDeletable"
              @click="deleteDropFile()"
              type="is-text"
            >
              <b-icon size="is-small" icon="delete"></b-icon>
            </b-button>
          </b-tooltip>
          <b-tooltip
            class="r_upload-progress__right__button"
            label="Try again."
            type="is-dark"
          >
            <b-button
              v-if="state === 'ERROR'"
              @click="handleFileDrop($event)"
              type="is-text"
            >
              <b-icon size="is-small" icon="autorenew"></b-icon>
            </b-button>
          </b-tooltip>
        </span>
      </span>
    </div>
  </section>
</template>

<style lang="scss">
.upload-draggable {
  width: 400px;
}
.r_preview {
  display: flex;
}
.r_peview__cover {
  background-color: #e9e9e9;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: 3.5rem;
}
.r_upload-progress {
  background-color: #dbdbdb;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
  min-height: 3.25rem;
}
.r_upload-progress--loading {
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: moveIndeterminate;
  animation-timing-function: linear;
  background: linear-gradient(to right, #00d1b2 30%, #dbdbdb 30%);
  background-color: #dbdbdb;
  background-position: top left;
  background-size: 150% 150%;
  background-repeat: no-repeat;
}
.r_upload-progress--error {
  background-color: #ffa5a5;
}
.r_upload-progress--success {
  background-color: #b9dde4;
}
.r_upload-progress__left {
  display: flex;
  align-items: center;
}
.r_upload-progress__left__button {
  margin-right: 0.5rem;
}
.r_upload-progress__right {
  display: flex;
  align-items: center;
}
.r_upload-progress__right__button {
  margin-left: 0.5rem;
}
@keyframes moveIndeterminate {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>

<script>
export default {
  props: {
    audio: {
      type: String,
      required: false,
      default: null
    },
    dropFile: {
      type: Object,
      required: false,
      default: null
    },
    image: {
      type: String,
      required: false,
      default: null
    },
    isNotDeletable: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false,
      default: ''
    },
    state: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      newDropFile: null
    }
  },
  computed: {
    classObject: function() {
      return {
        'r_upload-progress--loading': this.state === 'LOADING',
        'r_upload-progress--success': this.state === 'SUCCESS',
        'r_upload-progress--error': this.state === 'ERROR'
      }
    },
    stateLabel: function() {
      let label = ''
      switch (this.state) {
        case 'LOADING':
          label = 'Uploading ...'
          break
        case 'SUCCESS':
          label = 'Successfully uploaded.'
          break
        case 'ERROR':
          label = 'Error while uploading.'
          break
        default:
          label = ''
      }
      return label
    }
  },
  methods: {
    deleteDropFile(event) {
      this.$emit('deleted', {
        type: this.type,
        file: this.dropFile
      })
    },
    handleFileDrop(event) {
      this.$emit('dropped', {
        type: this.type,
        file: this.newDropFile
      })
    },
    handleFilePlay(sound) {
      if (sound) {
        const audio = new Audio(sound)
        audio.play()
      }
    }
  }
}
</script>
