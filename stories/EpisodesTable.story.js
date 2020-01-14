import { storiesOf } from '@storybook/vue'
import EpisodesTable from '../components/EpisodesTable'

export const episodes = [
  {
    number: 1,
    title: 'Some title',
    publishState: 'drafted'
  },
  {
    number: 2,
    title: 'Some title',
    publishState: 'drafted'
  },
  {
    number: 3,
    title: 'Some title',
    publishState: 'drafted'
  }
]

storiesOf('Design Sytem|Molecule/EpisodesTable', module).add('default', () => {
  return {
    components: { EpisodesTable },
    template:
      '<episodes-table :episodes="episodes" :network="{id: 2}" :podcast="{id: 2}"></episodes-table>',
    data: () => ({ episodes })
  }
})
