import { mutations } from './navigation'
import { isTSAnyKeyword } from '@babel/types';

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
