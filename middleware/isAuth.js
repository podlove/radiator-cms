import jwtDecode from 'jwt-decode'
/**
 * Use Apollo to check if user has a valid token.
 * If not logout user,
 * if token is valid, update store.
 */
export default async function({ app, store, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (hasToken) {
    const datenow = new Date()
    const decoded = jwtDecode(app.$apolloHelpers.getToken())
    const expDate = new Date(decoded.exp * 1000)
    const timeRemaining = (expDate - datenow) / 1000 / 60
    if (timeRemaining > 20) {
      store.dispatch('auth/setSession')
    } else if (timeRemaining < 20 && timeRemaining > 0) {
      await store.dispatch('auth/renewToken')
    } else {
      store.dispatch('auth/logout')
    }
  } else {
    store.dispatch('auth/logout')
  }
}
