import Login from '../components/Login'

export default {
  title: 'Design Sytem|Molecule/Login',
  component: Login
}

export const blank = () => ({
  components: { Login },
  template: '<login></login>'
})
