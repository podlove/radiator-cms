import ContributorsTable from '../components/ContributorsTable'

export default {
  title: 'Design Sytem|Molecule/ContributorsTable',
  component: ContributorsTable
}

export const blank = () => ({
  components: { ContributorsTable },
  template: '<contributors-table></contributors-table>'
})
