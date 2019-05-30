import { mount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import WikidataInput from '../components/WikidataInput'

const localVue = createLocalVue()
localVue.use(Buefy)

describe('WikidataInput.test.js - default values', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(WikidataInput, {
      localVue
    })
  })

  it('has recivied no language property, it should use the default property en', () => {
    expect(cmp.vm.language).toEqual('en')
  })
})

describe('WikidataInput.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = mount(WikidataInput, {
      localVue,
      propsData: {
        language: 'de'
      }
    })
  })

  it('has recivied de as a property', () => {
    expect(cmp.vm.language).toEqual('de')
  })
})
