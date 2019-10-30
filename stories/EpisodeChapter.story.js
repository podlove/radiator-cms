import EpisodeChapters from '../components/EpisodeChapters'

export default {
  title: 'Design Sytem|Molecule/EpisodeChapters',
  component: EpisodeChapters
}

export const blank = () => ({
  components: { EpisodeChapters },
  template: '<episode-chapters></episode-chapters>'
})
