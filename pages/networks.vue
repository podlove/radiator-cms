<template>
  <section class="section">
    <b-button @click.stop.prevent="createNetwork()">
      Create A Network
    </b-button>
  </section>
</template>

<script>
export default {
  methods: {
    createNetwork() {
      console.log('0')
    }
  }
}
</script>
