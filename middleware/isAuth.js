/**
 * Use Apollo to check if user has a valid token.
 * If not logout user,
 * if token is valid, update store.
 */
export default function({ app, store, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken) {
    store.dispatch('auth/setSession')
  } else {
    store.dispatch('auth/logout')
  }
}
