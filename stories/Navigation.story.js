import Navigation from '../components/Navigation'

export default {
  title: 'Design Sytem|Molecule/Navigation',
  component: Navigation
}

export const blank = () => ({
  components: { Navigation },
  template: '<navigation></navigation>'
})
