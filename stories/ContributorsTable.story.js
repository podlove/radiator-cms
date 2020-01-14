import { storiesOf } from '@storybook/vue'
import ContributorsTable from '../components/ContributorsTable'

export const contributors = [
  {
    person: {
      name: 'Tim Pritlove',
      displayName: 'Tim',
      uri: 'https://tim.pritlove.org/',
      image:
        'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
    },
    contributionRole: {
      id: 2,
      title: 'Katzenlord'
    }
  },
  {
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
  },
  {
    person: {
      name: 'Thomas Lohninger',
      displayName: 'Tim',
      uri: 'https://tim.pritlove.org/',
      image:
        'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
    },
    contributionRole: {
      id: 2,
      title: 'Katzenlord'
    }
  },
  {
    person: {
      name: 'Julia Reda',
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
]

storiesOf('Design Sytem|Molecule/ContributorsTable', module).add(
  'default',
  () => {
    return {
      components: { ContributorsTable },
      template: '<contributors-table :contributors="contributors"></contributors-table>',
      data: () => ({ contributors })
    }
  }
)
