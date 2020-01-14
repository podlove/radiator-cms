import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs'
import Vuex from 'vuex'
import EpisodeChapters from '../components/EpisodeChapters'

storiesOf('Design Sytem|Molecule/EpisodeChapters', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return {
      components: { EpisodeChapters },
      template: '<episode-chapters></episode-chapters>',
      store: new Vuex.Store({
        state: {
          episodes: {
            episodeChapters: [
              {
                start: 0,
                startString: '00:00:00.000',
                title: 'Moinsen',
                image: null,
                link: null
              },
              {
                start: 53100,
                startString: '00:00:53.100',
                title: 'Unterstützerdank',
                image: null,
                link: null
              },
              {
                start: 139000,
                startString: '00:02:19.000',
                title: 'Amt und Alter: Überzeugungstäter Trump',
                image: null,
                link: null
              },
              {
                start: 1595050,
                startString: '00:26:35.050',
                title: 'Was die Kandidaten erfolgreich macht',
                image: null,
                link: null
              }
            ]
          }
        },
        mutations: {}
      })
    }
  })
