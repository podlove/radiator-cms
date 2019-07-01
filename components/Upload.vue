<template>
  <!-- Creates an upload field with tags for uploaded files. -->
  <section>
    <b-field :label="label">
      <b-upload v-model="dropFiles" multiple drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Drop your files here or click to upload.</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags field">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<style>
.upload-draggable {
  width: 400px;
}
</style>

<script>
export default {
  props: {
    dropFiles: {
      type: Array,
      required: true
    },
    isMultiple: {
      type: Boolean,
      required: false
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1)
    }
  }
}
</script>
