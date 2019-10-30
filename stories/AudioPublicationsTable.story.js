import AudioPublicationsTable from '../components/AudioPublicationsTable'

export default {
  title: 'Design Sytem|Molecule/AudioPublicationsTable',
  component: AudioPublicationsTable
}

export const blank = () => ({
  components: { AudioPublicationsTable },
  template: '<audio-publications-table></audio-publications-table>'
})
