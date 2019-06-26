export default function({ app, store, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken) {
    store.dispatch('auth/setSession')
  } else {
    store.dispatch('auth/logout')
  }
}
