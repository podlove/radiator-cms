import { storiesOf } from '@storybook/vue'
// import moment from '@nuxtjs/moment'
import EpisodeTags from '../components/EpisodeTags'

// TODO: mock momentjs

export const episode = {
  publicPage: 'https://Some url',
  publishState: 'scheduled'
  // publishedAt: new Date()
}

storiesOf('Design Sytem|Molecule/EpisodeTags', module)
  // .addDecorator(moment)
  .add('default', () => {
    return {
      components: { EpisodeTags },
      template: '<episode-tags :episode="episode"></episode-transcripts>',
      data: () => ({ episode })
    }
  })
