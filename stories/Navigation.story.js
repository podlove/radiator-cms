import { storiesOf } from '@storybook/vue'
import Navigation from '../components/Navigation'

storiesOf('Design Sytem|Molecule/Navigation', module).add('default', () => {
  return {
    components: { Navigation },
    template: '<navigation></navigation>'
  }
})

// TODO further stories like user is logged in
