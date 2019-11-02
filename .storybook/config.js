import { configure } from '@storybook/vue'
import Buefy from 'buefy'
import Vue from 'vue'
import Vuex from 'vuex'
var moment = require('moment');

import '!style-loader!css-loader!sass-loader!../assets/css/main.scss'

moment().format();
Vue.use(Buefy)
Vue.use(Vuex)
Vue.use(moment())

configure(require.context('../', true, /\.story\.js$/), module);
