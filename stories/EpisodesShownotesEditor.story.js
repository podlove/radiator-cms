import EpisodesShownotesEditor from '../components/EpisodesShownotesEditor'

export default {
  title: 'Design Sytem|Molecule/EpisodesShownotesEditor',
  component: EpisodesShownotesEditor
}

export const blank = () => ({
  components: { EpisodesShownotesEditor },
  template: '<episodes-shownotes-editor></episodes-shownotes-editor>'
})
