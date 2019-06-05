import { actions, mutations } from './navigation'

describe('Test navigation mutations', () => {
  let state = {
    activeNetworkId: null,
    activePodcastId: null,
    activeEpisodeId: null
  }

  beforeEach(() => {
    state = {
      activeNetworkId: null,
      activePodcastId: null,
      activeEpisodeId: null
    }
  })

  it('Test active network id', () => {
    mutations.set_active_network(state, 23)

    expect(state.activeNetworkId).toEqual(23)
  })

  it('Test active podcast id', () => {
    mutations.set_active_podcast(state, 42)

    expect(state.activePodcastId).toEqual(42)
  })

  it('Test active episode id', () => {
    mutations.set_active_episode(state, 13)

    expect(state.activeEpisodeId).toEqual(13)
  })
})

describe('Test navigation actions', () => {
  it('Test active network', () => {
    const data = { activeNetworkId: 42 }
    const commit = jest.fn()

    actions.setActiveNetwork({ commit }, data)
    expect(commit).toHaveBeenCalledWith('set_active_network', data)
  })

  it('Test active episode', () => {
    const data = { activeEpisodeId: 23 }
    const commit = jest.fn()

    actions.setActiveEpisode({ commit }, data)
    expect(commit).toHaveBeenCalledWith('set_active_episode', data)
  })
  it('Test active podcast', () => {
    const data = { activePodcastId: 13 }
    const commit = jest.fn()

    actions.setActivePodcast({ commit }, data)
    expect(commit).toHaveBeenCalledWith('set_active_podcast', data)
  })
})
