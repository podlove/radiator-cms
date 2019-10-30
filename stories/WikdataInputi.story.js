import WikidataInput from '../components/WikidataInput'

export default {
  title: 'Design Sytem|Molecule/WikidataInput',
  component: WikidataInput
}

export const input = () => ({
  components: { WikidataInput },
  template: '<wikidata-input></wikidata-input>'
})
