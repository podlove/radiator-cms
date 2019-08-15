<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Collaborator</p>
      </header>
      <section class="modal-card-body">
        <section>
          <h2>Select existing user as collaborator</h2>
          <b-field>
            <b-dropdown>
              <button class="button is-primary" type="button" slot="trigger">
                <template v-if="isPublic">
                  <b-icon icon="earth"></b-icon>
                  <span>Public</span>
                </template>
                <template v-else>
                  <b-icon icon="account-multiple"></b-icon>
                  <span>Friends</span>
                </template>
                <b-icon icon="menu-down"></b-icon>
              </button>
              <b-dropdown-item
                v-for="person in persons"
                :key="person.id"
                :value="true"
                aria-role="listitem"
              >
                <div class="media">
                  <!-- TODO: avatar -->
                  <p>{{ person.user.username }}</p>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </b-field>
        </section>
        <section>
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
      this.avatarFileState = 'SUCCESS'
      console.log('image', params)
    }
  }
}
</script>
