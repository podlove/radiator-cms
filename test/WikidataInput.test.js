import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import WikidataInput from '../components/WikidataInput'

const localVue = createLocalVue()
localVue.use(Buefy)

const data = {
  query: {
    search: [
      {
        title: 'Kleid',
        snippet: 'Das <span class="searchmatch">Kleid</span> und so weiter'
      },
      {
        title: 'Kleider',
        snippet: 'Das Kleid und so weiter'
      },
      {
        title: 'Kleiderschrank',
        snippet: 'Das Kleid und so <span>weiter</span>'
      },
      {
        title: 'Kleidung',
        snippet: 'Das <span class="searchmatch">Kleid</span> und so weiter'
      },
      {
        title: 'Kleiderbügel',
        snippet: 'Das <span class="searchmatch">Kleid</span> und so weiter'
      }
    ]
  }
}

const init = { status: 200, statusText: 'SuperSmashingGreat!' }
const response = new Response(data, init)

const data_clean = [
  {
    title: 'Kleid',
    snippet: 'Das Kleid und so weiter'
  },
  {
    title: 'Kleider',
    snippet: 'Das Kleid und so weiter'
  },
  {
    title: 'Kleiderschrank',
    snippet: 'Das Kleid und so weiter'
  },
  {
    title: 'Kleidung',
    snippet: 'Das Kleid und so weiter'
  },
  {
    title: 'Kleiderbügel',
    snippet: 'Das Kleid und so weiter'
  }
]

describe('WikidataInput.test.js - default values', () => {
  let cmp

  beforeEach(() => {
    cmp = shallowMount(WikidataInput, {
      localVue
    })
  })

  test('has recivied no language property, it should use the default property en', () => {
    expect(cmp.vm.language).toEqual('en')
  })
})

describe('WikidataInput.test.js', () => {
  let cmp

  beforeEach(() => {
    cmp = shallowMount(WikidataInput, {
      localVue,
      propsData: {
        language: 'de'
      }
    })
    fetch.resetMocks()
  })

  test('has recivied de as a property', () => {
    expect(cmp.vm.language).toEqual('de')
  })

  test('Test url construction with input Kleid', () => {
    expect(cmp.vm.constructURL('Kleid')).toEqual(
      'https://de.wikipedia.org/w/api.php?action=query&list=search&srsearch=Kleid&srlimit=5&utf8=&format=json&origin=*'
    )
  })

  test('check if response from wikidata is free of html tags inside snippets', () => {
    expect(cmp.vm.removeHTML(data.query.search)).toEqual(data_clean)
  })

  // test('Mock the fetch', () => {
  //   fetch.mockResponse(response)
  //   expect(cmp.vm.askWikidata('Kleid')).toEqual(data_clean)
  // })
})
