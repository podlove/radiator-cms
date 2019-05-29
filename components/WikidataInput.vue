<template>
  <div>
    <b-field label="Wikidata">
      <b-input v-model="wikidata" @input="askWikidata()"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wikidata: ''
    }
  },
  methods: {
    askWikidata: function() {
      if (this.wikidata.length > 3) {
        fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${
            this.wikidata
          }&utf8=&format=json&origin=*`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
          .then(function(response) {
            console.log(response.status)
            return response.json()
          })
          .then(function(text) {
            console.log('Request successful', text)
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
