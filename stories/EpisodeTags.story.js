import EpisodeTags from '../components/EpisodeTags'

export default {
  title: 'Design Sytem|Molecule/EpisodeTags',
  component: EpisodeTags
}

export const blank = () => ({
  components: { EpisodeTags },
  template: '<episode-tags></episode-transcripts>'
})
