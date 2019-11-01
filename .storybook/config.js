import { configure } from '@storybook/vue'
import Buefy from 'buefy'
import Vue from 'vue'
import Vuex from 'vuex'

import '!style-loader!css-loader!sass-loader!../assets/css/main.scss'

Vue.use(Buefy)
Vue.use(Vuex)

configure(require.context('../', true, /\.story\.js$/), module);
