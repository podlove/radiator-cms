import { storiesOf } from '@storybook/vue'
import EditContributorModal from '../components/EditContributorModal'

export const contributor = {
  person: {
    name: 'Linus Neumann',
    displayName: 'Tim',
    uri: 'https://tim.pritlove.org/',
    image:
      'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
  },
  contributionRole: {
    id: 2,
    title: 'Katzenlord'
  }
}

export const contributionRole = {
  id: 2,
  title: 'Katzenlord'
}

export const isActive = true

storiesOf('Design Sytem|Molecule/EditContributorModal', module).add(
  'default',
  () => {
    return {
      components: { EditContributorModal },
      template:
        '<edit-contributor-modal :contributor="contributor" :contribution-roles="contributionRole" :is-active="isActive"></edit-contributor-modal>',
      data: () => ({ contributor })
    }
  }
)
