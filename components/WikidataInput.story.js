import WikidataInput from './WikidataInput'

export default {
  title: 'WikidataInput',
  component: WikidataInput
}

export const input = () => ({
  components: { WikidataInput },
  template: '<wikidata-input></wikidata-input>'
})
