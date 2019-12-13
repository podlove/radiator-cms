<template>
  <b-modal :active.sync="active" has-modal-card :width="900" :can-cancel="[]">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">New Contribution</p>
      </header>
      <div class="modal-card-body">
        <section v-if="persons && persons.length">
          <h2 class="is-size-5">
            Select existing user as contributor
          </h2>
          <b-field>
            <b-select
              ref="select"
              v-model="existingSelectedContributor"
              placeholder="Select a name"
              @input="handleSelectContributor()"
            >
              <option :value="null">
                Select a name
              </option>
              <option
                v-for="person in persons"
                :key="person.id"
                :value="person.id"
              >
                {{ person.name }}
              </option>
            </b-select>
          </b-field>
          <b-field
            v-if="hasContributorSelected && contributionRoles"
            label="Role"
          >
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
        </section>
        <hr v-if="persons && persons.length" />
        <section v-if="!hasContributorSelected">
          <h2 class="is-size-5">
            Add a new team member to contribute to your podcast
          </h2>
          <form action="">
            <b-field label="Name">
              <b-input
                v-model="newContributor.name"
                type="text"
                placeholder="Name"
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
                type="text"
                placeholder="Nick name"
                required
              >
              </b-input>
            </b-field>
            <b-field label="Display name">
              <b-input
                v-model="newContributor.displayName"
                type="text"
                placeholder="Display name"
                required
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
                :image="newContributor.image ? newContributor.image : null"
                required
                @dropped="params => handleAvatarFileDrop(params)"
              />
            </b-field>
          </form>
        </section>
      </div>
    </div>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click.prevent="handleCloseModal()">
        Close
      </button>
      <button class="button is-primary" @click.prevent="handleAddContributor()">
        Add new contributor
      </button>
    </footer>
  </b-modal>
</template>

<style>
.modal-card {
  max-height: calc(100vh - 140px);
}
.r_contributor__cover {
  background-size: cover;
  border-radius: 0.2125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 2.25rem;
  height: 2.25rem;
}
</style>

<script>
import Upload from './Upload'

export default {
  components: {
    Upload
  },
  props: {
    active: {
      type: Boolean,
      required: true
    },
    contributionRoles: {
      type: Array,
      required: false,
      default: null
    },
    persons: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
    return {
      avatarFileState: null,
      existingSelectedContributor: null,
      hasContributorSelected: false,
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
  methods: {
    handleAddContributor() {
      if (this.hasContributorSelected) {
        this.$emit('contributorSelected', {
          contributionRoleId: this.newContributor.contributionRoleId,
          id: this.existingSelectedContributor
        })
      } else {
        this.$emit('contributorAdded', {
          contributionRoleId: this.newContributor.contributionRoleId,
          displayName: this.newContributor.displayName,
          email: this.newContributor.email,
          image: this.newContributor.image,
          link: this.newContributor.link,
          name: this.newContributor.name,
          nick: this.newContributor.nick
        })
      }
      this.hasContributorSelected = false
      this.existingSelectedContributor = null
      this.$emit('close')
    },
    handleAvatarFileDrop(params) {
      this.newContributor.image = params.file
      this.avatarFileState = 'SUCCESS'
    },
    handleCloseModal() {
      this.existingSelectedContributor = null
      this.$emit('close')
    },
    handleSelectContributor() {
      this.hasContributorSelected = true
    }
  }
}
</script>
