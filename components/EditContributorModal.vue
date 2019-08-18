<template>
  <b-modal :active.sync="isActive" has-modal-card>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Contributor</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Name">
            <b-input
              v-model="newContributor.username"
              type="text"
              :value="contributor.user.username"
              placeholder="Name"
              required
            >
            </b-input>
          </b-field>
          <b-field label="Permission" :value="contributor.permission">
            <div>
              <b-radio
                v-model="newContributor.permisssion"
                name="name"
                native-value="own"
              >
                Own
              </b-radio>
              <b-radio
                v-model="newContributor.permisssion"
                name="name"
                native-value="manage"
              >
                Manage
              </b-radio>
              <b-radio
                v-model="newContributor.permisssion"
                name="name"
                native-value="edit"
              >
                Edit
              </b-radio>
              <b-radio
                v-model="newContributor.permisssion"
                name="name"
                native-value="readonly"
              >
                Readonly
              </b-radio>
            </div>
          </b-field>
          <b-field label="Nick name">
            <b-input
              v-model="newContributor.nickName"
              type="text"
              placeholder="Nick name"
            >
            </b-input>
          </b-field>
          <b-field label="Display name">
            <b-input
              v-model="newContributor.displayName"
              type="text"
              placeholder="Display name"
            >
            </b-input>
          </b-field>
          <b-field label="Email">
            <b-input
              v-model="newContributor.email"
              type="email"
              placeholder="Email adress"
            >
            </b-input>
          </b-field>
          <b-field label="Link">
            <b-input
              v-model="newContributor.link"
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
              :image="newContributor.image"
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
            @click.prevent="handleAddContributor()"
          >
            Save
          </button>
        </footer>
      </div>
    </form>
  </b-modal>
</template>

<style>
.r_contributor__cover {
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
    contributor: {
      type: Object,
      required: true
    },
    isModalActive: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isActive() {
      return this.isModalActive
    }
  },
  data() {
    return {
      avatarFileState: null,
      existingSelectedContributor: null,
      newContributor: {
        displayName: '',
        email: '',
        image: null,
        link: '',
        name: '',
        nick: '',
        permisssion: 'readonly'
      }
    }
  },
  components: {
    Upload
  },
  mounted() {
    console.log(this.contributor)
  },
  methods: {
    handleAddContributor() {
      this.$emit('contributorAdded', {
        name: this.newContributor.name,
        permisssion: this.newContributor.permisssion
      })
      // this.$parent.close()
    },
    handleAvatarFileDrop(params) {
      this.newContributor.image = params.file
      this.avatarFileState = 'SUCCESS'
    },
    handleSelectContributor() {
      console.log('handleSelectContributor', this.existingSelectedContributor)
    }
  }
}
</script>
