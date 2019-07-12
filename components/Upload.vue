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
      <span v-if="dropFile" class="r_upload-progress">
        <span>{{ dropFile.name }}</span>
        <span class="r_upload-progress__right">
          {{ state }}
          <b-button
            v-if="state === 'Successfully uploaded'"
            class=""
            type="button"
            @click="deleteDropFile()"
          >
            <b-icon size="is-small" icon="delete"></b-icon>
          </b-button>
          <b-button
            v-if="state === 'Error while uploading'"
            class=""
            type="button"
            @click="handleFileDrop($event)"
          >
            <b-icon size="is-small" icon="delete"></b-icon>
          </b-button>
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
  background: linear-gradient(to right, #00d1b2 30%, #dbdbdb 30%);
  background-position: top left;
  background-size: 150% 150%;
  background-repeat: no-repeat;
  background-color: #dbdbdb;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  animation-name: moveIndeterminate;
  animation-timing-function: linear;
  border-radius: 0.25rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.25rem;
  padding: 0.5rem;
}
.r_upload-progress__right {
  display: flex;
  align-items: center;
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
  methods: {
    deleteDropFile() {
      this.dropFile = null
    },
    handleFileDrop(event) {
      console.log(this.dropFile)
      this.$emit('dropped', this.dropFile)
    }
  }
}
</script>
