import { storiesOf } from '@storybook/vue'
import EpisodeAudioFiles from '../components/EpisodeAudioFiles'

export const audioFiles = [
  {
    title: 'Episode 123',
    mimeType: 'mp3'
  },
  {
    title: 'Episode 123',
    mimeType: 'ogg'
  },
  {
    title: 'Episode 123',
    mimeType: 'mp4'
  }
]

storiesOf('Design Sytem|Molecule/EpisodeAudioFiles', module).add(
  'default',
  () => {
    return {
      components: { EpisodeAudioFiles },
      template:
        '<episode-audio-files :audio-files="audioFiles"></episode-audio-files>',
      data: () => ({ audioFiles })
    }
  }
)
