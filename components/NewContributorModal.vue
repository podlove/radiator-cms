<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <form action="">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">New Team Member</p>
        </header>
        <section class="modal-card-body">
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
                  {{ person.user.username }}
                </option>
              </b-select>
            </b-field>
          </section>
          <hr v-if="persons && persons.length" />
          <section>
            <h2 class="is-size-5">
              Add a new team member to contribute to your podcast
            </h2>
            <b-field label="Name">
              <b-input
                v-model="newContributor.name"
                type="text"
                placeholder="Name"
                required
              >
              </b-input>
            </b-field>
            <b-field label="Nick name">
              <b-input
                v-model="newContributor.nick"
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
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">
            Close
          </button>
          <button
            class="button is-primary"
            @click.prevent="handleAddContributor()"
          >
            Add new contributor
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
  components: {
    Upload
  },
  props: {
    isModalActive: {
      type: Boolean,
      required: true
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
      newContributor: {
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
      this.$emit('contributorAdded', {
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
