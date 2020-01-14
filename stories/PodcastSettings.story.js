import { storiesOf } from '@storybook/vue'
import PodcastSettings from '../components/PodcastSettings'

// TODO Edge cases

export const podcast = {
  image:
    'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914',
  title: 'Title',
  subtitle: 'Subtitle'
}

storiesOf('Design Sytem|Molecule/PodcastSettings', module).add(
  'default',
  () => {
    return {
      components: { PodcastSettings },
      template:
        '<podcast-settings :podcast="podcast" :is-disabled="false" :is-loading="false"></podcast-settings>',
      data: () => ({
        podcast
      })
    }
  }
)
