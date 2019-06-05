import { mutations } from './podcasts'

describe('Test podcast mutations', () => {
  const podcast = {
    author: 'Tim Pritlove',
    title: 'Halt mal meinen Pflaumenschnaps'
  }

  const podcasts = [
    {
      author: 'Tim Pritlove',
      title: 'Halt mal meinen Pflaumenschnaps'
    },
    {
      author: 'Tim Pritlove & Linus Neumann',
      title: 'Wir wollen Euch nur ein bisschen abkühlen'
    },
    {
      author: 'Tim Pritlove',
      title: 'Unzureichende Beschallung'
    }
  ]

  let state = {
    podcast: {},
    podcasts: []
  }

  beforeEach(() => {
    state = {
      podcast: {},
      podcasts: []
    }
  })

  it('set a podcast to the state', () => {
    mutations.set_podcast(state, podcast)

    expect(state).toEqual({
      podcast: podcast,
      podcasts: []
    })
  })
  it('set multiple podcasts to the state', () => {
    mutations.set_podcasts(state, podcasts)

    expect(state).toEqual({
      podcast: {},
      podcasts: podcasts
    })
  })
})
