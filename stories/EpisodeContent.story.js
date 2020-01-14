import { storiesOf } from '@storybook/vue'
import EpisodeContent from '../components/EpisodeContent'

export const episode = {
  summary:
    'Some text for an episode <br /><a>Link Example</a> <p>HTML tags can be inside Shownotes.</p>'
}

storiesOf('Design Sytem|Molecule/EpisodeContent', module).add('default', () => {
  return {
    components: { EpisodeContent },
    template: '<episode-content :episode="episode"></episode-content>',
    data: () => ({ episode })
  }
})
