import { storiesOf } from '@storybook/vue'
import Upload from '../components/Upload'

storiesOf('Design Sytem|Molecule/Upload', module).add('default', () => {
  return {
    components: { Upload },
    template: '<upload></upload>'
  }
})
