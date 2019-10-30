import { configure } from '@storybook/vue'
import Buefy from 'buefy'
import Vue from 'vue'

Vue.use(Buefy)

// function requireAll (requireContext) {
//   return requireContext.keys().map(requireContext)
// }

// function loadStories () {
//   requireAll(require.context('..', true, /^((?![\\/]node_modules|vendor[\\/]).)*\.story\.js?$/))
// }

// configure(loadStories, module)

configure(require.context('../stories', true, /\.story\.js$/), module);
