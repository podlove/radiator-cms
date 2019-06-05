import { mutations } from './episodes'

describe('Test episode mutations', () => {
  const episode = {
    id: 42,
    title: 'Halt mal meinen Pflaumenschnaps'
  }
  const state = {
    episode: {}
  }

  it('Test set episode', () => {
    mutations.set_episode(state, episode)

    expect(state).toEqual({
      episode: episode
    })
  })
})
