import { storiesOf } from '@storybook/vue'
import NewContributorModal from '../components/NewContributorModal'

storiesOf('Design Sytem|Molecule/NewContributorModal', module).add(
  'default',
  () => {
    return {
      components: { NewContributorModal },
      template: '<new-contributor-modal></new-contributor-modal>'
    }
  }
)
