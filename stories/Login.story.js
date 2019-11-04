import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import Vuex from 'vuex'
import Login from '../components/Login'

storiesOf('Design Sytem|Molecule/Login', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { Login },
      template: '<login></login>',
      store: new Vuex.Store({
        state: {
          auth: {
            isLoggedIn: false
          }
        },
        mutations: {}
      })
    }
  })
