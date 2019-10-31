import { storiesOf } from '@storybook/vue'
import AudioPublicationsTable from '../components/AudioPublicationsTable'

export const network = {
  id: 1,
  audioPublications: [
    {
      id: 1,
      title: 'Example 1',
      publishState: 'unpublished',
      audio: {
        id: 1,
        image:
          'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914'
      }
    }
  ]
}

storiesOf('Design Sytem|Molecule/AudioPublicationsTable', module).add(
  'default',
  () => {
    return {
      components: { AudioPublicationsTable },
      template:
        '<audio-publications-table :network="network"></audio-publications-table>',
      data: () => ({ network })
    }
  }
)
