import ResetPassword from '../components/ResetPassword'

export default {
  title: 'Design Sytem|Molecule/ResetPassword',
  component: ResetPassword
}

export const blank = () => ({
  components: { ResetPassword },
  template: '<reset-password></reset-password>'
})
