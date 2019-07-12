<template>
  <!-- Creates an upload field with tags for uploaded files. -->
  <section>
    <b-field :label="label">
      <b-upload
        v-if="!dropFile"
        v-model="dropFile"
        drag-drop
        @input="handleFileDrop($event)"
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
    <div class="field">
      <span v-if="dropFile" class="r_upload-progress" :class="classObject">
        <span>{{ dropFile.name }}</span>
        <span class="r_upload-progress__right">
          {{ state }}
          <b-tooltip
            class="r_upload-progress__right__button"
            label="Delete your uploaded file."
            type="is-dark"
          >
            <b-button
              v-if="state === 'Successfully uploaded'"
              type="is-text"
              @click="deleteDropFile()"
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
              v-if="state === 'Error while uploading'"
              type="is-text"
              @click="handleFileDrop($event)"
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
    label: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      dropFile: null
    }
  },
  computed: {
    classObject: function() {
      return {
        'r_upload-progress--loading': this.state === 'Uploading ...',
        'r_upload-progress--success': this.state === 'Successfully uploaded',
        'r_upload-progress--error': this.state === 'Error while uploading'
      }
    }
  },
  methods: {
    deleteDropFile() {
      // TODO: Delete file from DB
      this.dropFile = null
    },
    handleFileDrop(event) {
      this.$emit('dropped', this.dropFile)
    }
  }
}
</script>
