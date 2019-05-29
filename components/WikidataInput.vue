<template>
  <div>
    <b-field label="Wikidata">
      <b-input v-model="wikidata" @input="askWikidata()"></b-input>
    </b-field>
    <div>
      <div v-for="r in response" :key="r.pageid">
        <b>{{ r.title }}</b> - {{ r.snippet }}
      </div>
    </div>
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
      wikidata: '',
      response: []
    }
  },
  methods: {
    askWikidata: function() {
      if (this.wikidata.length > 3) {
        fetch(
          `https://${
            this.language
          }.wikipedia.org/w/api.php?action=query&list=search&srsearch=${
            this.wikidata
          }&srlimit=5&utf8=&format=json&origin=*`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(response => response.json())
          .then(text => {
            console.log('Request successful', text.query.search)
            this.response = text.query.search
          })
          .catch(function(error) {
            console.log('Request failed', error)
          })
      }
    }
  }
}
</script>

<style></style>
