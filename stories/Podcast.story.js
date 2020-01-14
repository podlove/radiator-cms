import { storiesOf } from '@storybook/vue'
import Podcast from '../components/Podcast'

// TODO: moment js mocken
// Todo welche edge cases gibts?
// [ ] keine Episoden
// [ ] ein paar Episoden
// [ ] sehr viele Episoden

export const podcast = {
  image:
    'http://localhost:9000/radiator/podcast/2/cover_original.jpg?v=63739563914',
  title: 'Title',
  subtitle: 'Subtitle'
  // episodes: [
  //   {
  //     number: 1,
  //     title: 'Some title',
  //     publishState: 'drafted'
  //   },
  //   {
  //     number: 2,
  //     title: 'Some title',
  //     publishState: 'drafted'
  //   },
  //   {
  //     number: 3,
  //     title: 'Some title',
  //     publishState: 'drafted'
  //   }
  // ]
}

export const network = {
  id: 1
}

storiesOf('Design Sytem|Molecule/Podcast', module).add('default', () => {
  return {
    components: { Podcast },
    template: '<podcast :network="network" :podcast="podcast"></podcast>',
    data: () => ({
      podcast,
      network
    })
  }
})
