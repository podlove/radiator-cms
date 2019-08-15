<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Collaborator</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            v-model="newCollaborator.name"
            type="text"
            placeholder="Name"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Nick name">
          <b-input
            v-model="newCollaborator.nickName"
            type="text"
            placeholder="Nick name"
          >
          </b-input>
        </b-field>
        <b-field label="Display name">
          <b-input
            v-model="newCollaborator.displayName"
            type="text"
            placeholder="Display name"
          >
          </b-input>
        </b-field>
        <b-field label="Email">
          <b-input
            v-model="newCollaborator.email"
            type="email"
            placeholder="Email adress"
          >
          </b-input>
        </b-field>
        <b-field label="Link">
          <b-input
            v-model="newCollaborator.link"
            type="text"
            placeholder="Link"
          >
          </b-input>
        </b-field>
        <b-field label="Avatar">
          <upload
            class="field"
            :state="avatarFileState"
            :type="'IMAGE'"
            :image="newCollaborator.image"
            @dropped="params => handleAvatarFileDrop(params)"
          />
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">
          Close
        </button>
        <button
          class="button is-primary"
          @click.prevent="handleAddCollaborator()"
        >
          Add new collaborator
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import Upload from '~/components/Upload'

export default {
  data() {
    return {
      avatarFileState: null,
      newCollaborator: {
        displayName: '',
        email: '',
        image: null,
        link: '',
        name: '',
        nick: ''
      }
    }
  },
  components: {
    Upload
  },
  methods: {
    handleAddCollaborator() {
      console.log('AddCollaborator', this.newCollaborator)
      this.$emit('collaboratorAdded', {
        collaborator: this.newCollaborator
      })
      this.$parent.close()
    },
    handleAvatarFileDrop(params) {
      this.newCollaborator.image = params.file
    }
  }
}
</script>
