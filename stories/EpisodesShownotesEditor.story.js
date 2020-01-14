import { storiesOf } from '@storybook/vue'
import EpisodesShownotesEditor from '../components/EpisodesShownotesEditor'

storiesOf('Design Sytem|Molecule/EpisodesShownotesEditor', module).add(
  'default',
  () => {
    return {
      components: { EpisodesShownotesEditor },
      template: '<episodes-shownotes-editor></episodes-shownotes-editor>'
    }
  }
)
