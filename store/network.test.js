import { mutations } from './networks'

describe('Test network mutations', () => {
  const network =  {
    id: 1,
    title: 'Metaebene'
  }

  const networks = [
    {
      id: 1,
      title: 'Metaebene'
    },
    {
      id: 2,
      title: 'Radiotopia'
    }
  ]

  let state = {
    network: {},
    networks: []
  }

  beforeEach(() => {
    state = {
      network: {},
      networks: []
    }
  })

  it('Add one network to the state', () => {
    mutations.set_network(state, network)

    expect(state).toEqual({
      network: network,
      networks: []
    })
  })

  it('Add multiple networks to the state', () => {
    mutations.set_networks(state, networks)

    expect(state).toEqual({
      network: {},
      networks: networks
    })
  })
})
