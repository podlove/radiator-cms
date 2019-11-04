import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import Vuex from 'vuex'
import Signup from '../components/Signup'

storiesOf('Design Sytem|Molecule/Signup', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { Signup },
      template: '<signup></signup>',
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
