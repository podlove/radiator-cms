<template>
  <!-- PODCAST PAGE -->
  <!-- path: `/network/[network_id]/podcast/[podcast_id]` -->
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body container r_podcast-hero">
        <div
          class="r_podcast-hero__cover has-background-light"
          :style="{
            backgroundImage: `url(${
              podcast && podcast.image ? podcast.image : ''
            })`
          }"
        ></div>
        <div class="r_podcast-hero__container">
          <h1 v-if="podcast" class="title is-size-3 r_podcast-hero__title">
            {{ podcast.title }}
          </h1>
          <h2 v-if="podcast" class="subtitle is-size-6">
            {{ podcast.subtitle }}
          </h2>
        </div>
      </div>
    </section>
    <section class="container">
      <b-tabs v-model="activeTab" class="r_podcast-tabs">
        <b-tab-item label="Episodes">
          <section class="r_episodes__header">
            <nuxt-link
              v-if="network && podcast"
              :to="`/network/${network.id}/podcast/${podcast.id}/new-episode`"
            >
              <b-button type="is-primary" outlined>
                <b-icon size="is-small" icon="plus-circle"></b-icon>
                <span> New Episode</span>
              </b-button>
            </nuxt-link>
          </section>
          <episodes-table
            v-if="podcast && podcast.episodes && podcast.episodes.length"
            :episodes="podcast.episodes"
          ></episodes-table>
        </b-tab-item>
        <b-tab-item label="Team">
          <section>
            <p v-if="network" class="r_podcast__contributor__new">
              <b-button
                outlined
                type="is-primary"
                icon-left="plus-circle"
                @click="isNewContributorModalActive = true"
              >
                <span>Add new team member</span>
              </b-button>
            </p>
            <h3 class="is-size-4">Podcast Team</h3>
            <p
              v-if="
                podcast &&
                  (!podcast.contributions || !podcast.contributions.length > 0)
              "
            >
              There are no contributions to your podcast yet.
            </p>
            <contributors-table
              v-if="
                podcast &&
                  podcast.contributions &&
                  podcast.contributions.length > 0
              "
              class="r_podcast__contributor__table"
              :contributors="podcast.contributions"
              @edit="id => handleEditContributor(id)"
            ></contributors-table>
          </section>
        </b-tab-item>
        <b-tab-item label="Analytics">
          <div class="tile">
            <article class="tile is-child notification is-warning">
              <p class="title">Placeholder...</p>
              <p class="subtitle">for podcast analytics</p>
            </article>
          </div>
        </b-tab-item>
        <b-tab-item label="Settings">
          <podcast-settings
            :is-disabled="isDisabled"
            :is-loading="isLoading"
            :podcast="podcast"
            @cancel="cancel()"
            @delete="deletePodcast()"
            @edit="edit()"
            @save="newPodcastSettings => save(newPodcastSettings)"
          ></podcast-settings>
        </b-tab-item>
      </b-tabs>
    </section>
    <edit-contributor-modal
      v-if="podcast && podcast.contributions"
      :contributionRoles="contributionRoles"
      :is-modal-active="isEditContributorModalActive"
      :contributor="activeContributor"
      @contributorUpdated="contributor => handleUpdateContributor(contributor)"
    ></edit-contributor-modal>
    <new-contributor-modal
      v-if="podcast"
      :contributionRoles="contributionRoles"
      :is-modal-active="isNewContributorModalActive"
      @contributorAdded="contributor => handleNewContributor(contributor)"
    ></new-contributor-modal>
  </section>
</template>

<style>
.r_episodes__header {
  text-align: right;
  padding: 0 0 1rem 0;
}
.r_podcast__contributor__new {
  float: right;
}
.r_podcast__contributor__table {
  margin-top: 1rem;
}
.r_podcast-hero {
  padding: 11.25rem 0 2.5rem 0 !important;
  position: relative;
}
.r_podcast-hero__container {
  margin-left: 12.5rem;
  min-height: 3.8125rem;
}
.r_podcast-hero__cover {
  background-size: cover;
  border-radius: 0.3125rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: absolute;
  bottom: -1.25rem;
  width: 11.25rem;
  height: 11.25rem;
}
.r_podcast-hero__title {
  font-weight: 400;
}
.r_podcast-tabs {
  margin: 3.75rem 0;
}
.r_settings__interaction {
  margin-top: 1rem;
  text-align: right;
}
</style>

<script>
import { mapState } from 'vuex'
import ContributorsTable from '~/components/ContributorsTable'
import EpisodesTable from '~/components/EpisodesTable'
import EditContributorModal from '~/components/EditContributorModal'
import NewContributorModal from '~/components/NewContributorModal'
import PodcastSettings from '~/components/PodcastSettings'

export default {
  components: {
    ContributorsTable,
    EpisodesTable,
    EditContributorModal,
    NewContributorModal,
    PodcastSettings
  },
  data() {
    return {
      activeContributor: null,
      activeTab: 0,
      editableContributor: null,
      isEditContributorModalActive: false,
      isNewContributorModalActive: false,
      isDisabled: true,
      isLoading: false
    }
  },
  computed: mapState({
    contributionRoles: state => state.contributions.contributionRoles,
    podcast: state => state.podcasts.activePodcast,
    network: state => state.networks.activeNetwork
  }),
  created() {
    this.$store
      .dispatch('podcasts/getPodcast', {
        id: this.$route.params.pid
      })
      .catch(error => {
        console.log(error)
        this.$router.push('/404')
      })
  },
  methods: {
    cancel() {
      this.isDisabled = true
    },
    deletePodcast() {
      this.$store
        .dispatch('podcasts/deletePodcast', {
          podcastId: this.podcast.id
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    },
    edit() {
      this.isDisabled = false
    },
    handleEditContributor(contributor) {
      console.log('edit contributor', contributor)
      this.activeContributor = contributor
      this.isEditContributorModalActive = true
    },
    handleUpdateContributor(contributor) {
      console.log('update contributor', contributor)
      this.isEditContributorModalActive = false
      this.$store
        .dispatch('people/update', {
          contributionId: this.activeContributor.id,
          contributionRoleId: contributor.contributionRoleId,
          displayName: contributor.displayName,
          email: contributor.email,
          image: contributor.image,
          link: contributor.link,
          name: contributor.name,
          networkId: this.network.id,
          nick: contributor.nick,
          personId: this.activeContributor.person.id,
          podcastId: this.podcast.id
        })
        .catch(error => {
          console.log(error)
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    handleNewContributor(contributor) {
      this.isNewContributorModalActive = false
      this.$store
        .dispatch('people/create', {
          contributionRoleId: contributor.contributionRoleId,
          displayName: contributor.displayName,
          email: contributor.email,
          image: contributor.image,
          link: contributor.link,
          name: contributor.name,
          networkId: this.network.id,
          nick: contributor.nick,
          podcastId: this.podcast.id
        })
        .catch(error => {
          console.log(error)
          this.alert = {
            type: 'is-danger',
            message: error
          }
        })
    },
    save(newPodcastSettings) {
      this.isLoading = true
      this.$store
        .dispatch('podcasts/update', {
          podcastId: this.podcast.id,
          author: newPodcastSettings.author,
          image: newPodcastSettings.cover,
          language: newPodcastSettings.language,
          owner: newPodcastSettings.owner,
          ownerEmail: newPodcastSettings.ownerEmail,
          summary: newPodcastSettings.summary,
          shortId: newPodcastSettings.shortId,
          subtitle: newPodcastSettings.subtitle,
          title: newPodcastSettings.title
        })
        .then(() => {
          this.isDisabled = true
        })
        .catch(error => {
          console.warn(error)
          this.$router.push('/404')
        })
    }
  }
}
</script>
