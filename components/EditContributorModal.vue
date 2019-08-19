<template>
  <b-modal :active.sync="isActive" has-modal-card>
    <form v-if="contributor">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Contributor</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Name">
            <b-input
              v-model="newContributor.name"
              type="text"
              :placeholder="contributor.person.name"
              required
            >
            </b-input>
          </b-field>
          <b-field v-if="contributionRoles" label="Role">
            <b-select
              v-model="newContributor.contributionRoleId"
              placeholder="Select a contribution role"
              required
            >
              <option
                v-for="role in contributionRoles"
                :key="role.id"
                :value="role.id"
              >
                {{ role.title }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Nick name">
            <b-input
              v-model="newContributor.nick"
              :placeholder="contributor.person.nick"
              type="text"
            >
            </b-input>
          </b-field>
          <b-field label="Display name">
            <b-input
              v-model="newContributor.displayName"
              type="text"
              :placeholder="contributor.person.displayName"
            >
            </b-input>
          </b-field>
          <b-field label="Email">
            <b-input
              v-model="newContributor.email"
              type="email"
              :placeholder="contributor.person.email"
            >
            </b-input>
          </b-field>
          <b-field label="Link">
            <b-input
              v-model="newContributor.link"
              type="text"
              :placeholder="contributor.person.link"
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
            @click.prevent="handleEditContributor()"
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
      required: false,
      default: null
    },
    contributionRoles: {
      type: Array,
      required: false,
      default: null
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
        contributionRoleId: null,
        displayName: null,
        email: null,
        image: null,
        link: null,
        name: null,
        nick: null
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
    handleEditContributor() {
      this.$emit('contributorUpdated', {
        contributionRoleId: this.newContributor.contributionRoleId,
        displayName: this.newContributor.displayName,
        email: this.newContributor.email,
        image: this.newContributor.image,
        link: this.newContributor.link,
        name: this.newContributor.name,
        nick: this.newContributor.nick
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
