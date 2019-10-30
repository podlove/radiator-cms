import EpisodeContent from '../components/EpisodeContent'

export default {
  title: 'Design Sytem|Molecule/EpisodeContent',
  component: EpisodeContent
}

export const blank = () => ({
  components: { EpisodeContent },
  template: '<episode-content></episode-content>'
})
