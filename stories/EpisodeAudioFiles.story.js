import EpisodeAudioFiles from '../components/EpisodeAudioFiles'

export default {
  title: 'Design Sytem|Molecule/EpisodeAudioFiles',
  component: EpisodeAudioFiles
}

export const blank = () => ({
  components: { EpisodeAudioFiles },
  template: '<episode-audio-files></episode-audio-files>'
})
