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
    },
    {
      id: 2,
      title: 'Example 2',
      publishState: 'unpublished',
      audio: {
        id: 2,
        image:
          'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914'
      }
    },
    {
      id: 3,
      title: 'Example 3',
      publishState: 'unpublished',
      audio: {
        id: 3,
        image:
          'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914'
      }
    },
    {
      id: 4,
      title: 'Example 4',
      publishState: 'unpublished',
      audio: {
        id: 4,
        image:
          'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914'
      }
    },
    {
      id: 5,
      title: 'Example 5',
      publishState: 'unpublished',
      audio: {
        id: 5,
        image:
          'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914'
      }
    },
    {
      id: 6,
      title: 'Example 6',
      publishState: 'unpublished',
      audio: {
        id: 6,
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
