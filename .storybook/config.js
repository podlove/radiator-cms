import { configure } from '@storybook/vue'
import Buefy from 'buefy'
import Vue from 'vue'

import '!style-loader!css-loader!sass-loader!../assets/css/main.scss'

Vue.use(Buefy)

configure(require.context('../', true, /\.story\.js$/), module);
