<template>
  <div>
    {{ selected }}
    <b-field label="Wikidata">
      <b-autocomplete
        :data="response"
        placeholder="e.g. Fight Club"
        field="title"
        @typing="askWikidata"
        @select="option => (selected = option)"
      >
        <template slot-scope="props">
          <b>{{ props.option.title }}</b>
          <br />
          <small>
            {{ props.option.snippet }}
          </small>
        </template>
      </b-autocomplete>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      default: 'en'
    }
  },
  data() {
    return {
      selected: '',
      response: []
    }
  },
  methods: {
    constructURL: function(requestInput) {
      return `https://${
        this.language
      }.wikipedia.org/w/api.php?action=query&list=search&srsearch=${requestInput}&srlimit=5&utf8=&format=json&origin=*`
    },
    askWikidata: function(wiki) {
      fetch(this.constructURL(wiki), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(text => {
          const regex = /<[^>]*>/gm
          const tmp = text.query.search
          tmp.forEach(item => {
            item.snippet = item.snippet.replace(regex, '')
          })
          this.response = tmp
        })
        .catch(function(error) {
          console.log('Request failed', error)
        })
    }
  }
}
</script>

<style></style>
