import { mutations } from './auth'

describe('Test auth mutations', () => {
  const state = {
    isLoggedIn: null,
    username: null,
    token: null
  }

  const data = {
    username: 'letty',
    token: 'supergeheimestokendingsieinsÖLF'
  }

  it('Test reset session', () => {
    mutations.set_session(state, data)

    expect(state).toEqual({
      isLoggedIn: true,
      username: data.username,
      token: data.token
    })
  })

  // it('Test reset session', () => {
  //   state = {
  //     isLoggedIn: true,
  //     ...data.data
  //   }

  //   mutations.reset_session(state)

  //   expect(state).toEqual({
  //     isLoggedIn: null,
  //     username: null,
  //     token: null
  //   })
  // })
})
