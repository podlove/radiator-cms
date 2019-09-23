import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import Index from '../pages/index'

import Login from '../components/Login'
import WikidataInput from '../components/WikidataInput'

describe('pages-index.vue', () => {
  let wrapper

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Buefy)

    wrapper = shallowMount(Index, {
      localVue
    })
  })

  it('renders a vue instance', () => {
    expect(shallowMount(Index).isVueInstance()).toBe(true)
  })

  it('check if login component exists', () => {
    expect(wrapper.contains(Login)).toBe(true)
  })
})
