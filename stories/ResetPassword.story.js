import { storiesOf } from '@storybook/vue'
import ResetPassword from '../components/ResetPassword'

storiesOf('Design Sytem|Molecule/ResetPassword', module).add('default', () => {
  return {
    components: { ResetPassword },
    template: '<reset-password></reset-password>'
  }
})
