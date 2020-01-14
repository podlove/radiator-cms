import { storiesOf } from '@storybook/vue'
import WikidataInput from '../components/WikidataInput'

storiesOf('Design Sytem|Molecule/WikidataInput', module).add('default', () => {
  return {
    components: { WikidataInput },
    template: '<wikidata-input></wikidata-input>'
  }
})
