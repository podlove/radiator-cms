import { configure } from '@storybook/vue'
import WikidataInput from '../components/WikidataInput'
import Buefy from 'buefy'
import Vue from 'vue'

Vue.use(Buefy)
// Vue.component('wikidata-input', WikidataInput)

configure(require.context('../components', true, /\.story\.js$/), module)
