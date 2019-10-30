import Podcast from '../components/Podcast'

export default {
  title: 'Design Sytem|Molecule/Podcast',
  component: Podcast
}

export const blank = () => ({
  components: { Podcast },
  template: '<podcast></podcast>'
})
