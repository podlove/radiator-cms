import EpisodesTable from '../components/EpisodesTable'

export default {
  title: 'Design Sytem|Molecule/EpisodesTable',
  component: EpisodesTable
}

export const blank = () => ({
  components: { EpisodesTable },
  template: '<episodes-table></episodes-table>'
})
