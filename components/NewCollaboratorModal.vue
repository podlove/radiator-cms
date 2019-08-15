<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Collaborator</p>
      </header>
      <section class="modal-card-body">
        <section>
          <h2 class="is-size-5">
            Select existing user as collaborator
          </h2>
          <b-field>
            <b-select ref="select" placeholder="Select a name">
              <option
                v-for="person in persons"
                :value="person.id"
                :key="person.id"
              >
                {{ person.user.username }}
              </option>
            </b-select>
          </b-field>
        </section>
        <hr />
        <section>
          <h2 class="is-size-5">
            Add new user as collaborator
          </h2>
          <b-field label="Name">
            <b-input
              v-model="newCollaborator.name"
              type="text"
              placeholder="Name"
              required
            >
            </b-input>
          </b-field>
          <b-field label="Permission">
            <div>
              <b-radio
                v-model="newCollaborator.role"
                name="name"
                native-value="OWN"
              >
                Own
              </b-radio>
              <b-radio
                v-model="newCollaborator.role"
                name="name"
                native-value="MANAGE"
              >
                Manage
              </b-radio>
              <b-radio
                v-model="newCollaborator.role"
                name="name"
                native-value="EDIT"
              >
                Edit
              </b-radio>
              <b-radio
                v-model="newCollaborator.role"
                name="name"
                native-value="READONLY"
              >
                Readonly
              </b-radio>
            </div>
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

<style>
.r_collaborator__cover {
  background-size: cover;
  border-radius: 0.2125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 2.25rem;
  height: 2.25rem;
}
</style>

<script>
import Upload from '~/components/Upload'

export default {
  props: {
    persons: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
    return {
      avatarFileState: null,
      existingSelectedCollaborator: null,
      newCollaborator: {
        displayName: '',
        email: '',
        image: null,
        link: '',
        name: '',
        nick: '',
        role: 'READONLY'
      }
    }
  },
  components: {
    Upload
  },
  mounted() {
    console.log(this.$refs.select)
  },
  methods: {
    handleAddCollaborator() {
      console.log(this.$refs.select)
      console.log('AddCollaborator', this.existingSelectedCollaborator)
      this.$emit('collaboratorAdded', {
        collaborator: this.newCollaborator
      })
      this.$parent.close()
    },
    handleAvatarFileDrop(params) {
      this.newCollaborator.image = params.file
      this.avatarFileState = 'SUCCESS'
      console.log('image', params)
    }
  }
}
</script>
