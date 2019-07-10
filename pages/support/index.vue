<template>
  <section>
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Support
          </h1>
        </div>
      </div>
    </section>
    <section class="container">
      <h1>Contact a humanoid robot</h1>
      <section>
        <b-field horizontal label="Subject">
          <b-input
            name="subject"
            placeholder="Please enter a subject"
            expanded
          ></b-input>
        </b-field>

        <b-field horizontal label="Topic">
          <b-select placeholder="Select a topic">
            <option value="1">Network</option>
            <option value="2">Podcast</option>
            <option value="3">Episode</option>
            <option value="4">Payment</option>
          </b-select>
        </b-field>

        <b-field horizontal label="Message">
          <b-input type="textarea"></b-input>
        </b-field>

        <b-field horizontal>
          <p class="control">
            <button class="button is-primary">
              Send message
            </button>
          </p>
        </b-field>
      </section>
    </section>
  </section>
</template>

<script>
export default {}
</script>

<style></style>
