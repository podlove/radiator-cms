import { storiesOf } from '@storybook/vue'
import EpisodeContributors from '../components/EpisodeContributors'

storiesOf('Design Sytem|Molecule/EpisodeContributors', module).add(
  'default',
  () => {
    return {
      components: { EpisodeContributors },
      template: '<episode-contributors></episode-contributors>'
    }
  }
)
