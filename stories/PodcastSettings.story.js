import PodcastSettings from '../components/PodcastSettings'

export default {
  title: 'Design Sytem|Molecule/PodcastSettings',
  component: PodcastSettings
}

export const blank = () => ({
  components: { PodcastSettings },
  template: '<podcast-settings></podcast-settings>'
})
