import EpisodeContributors from '../components/EpisodeContributors'

export default {
  title: 'Design Sytem|Molecule/EpisodeContributors',
  component: EpisodeContributors
}

export const blank = () => ({
  components: { EpisodeContributors },
  template: '<episode-contributors></episode-contributors>'
})
