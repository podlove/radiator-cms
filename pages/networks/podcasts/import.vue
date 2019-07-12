<template>
  <section class="r_podcasts">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_podcasts__header">
          <h1 class="title">Import Podcast</h1>
        </div>
      </div>
    </section>
    <section class="container podcasts__main">
      <b-steps v-model="activeStep" animated="true" has-navigation="false">
        <b-step-item label="Enter Url">
          <section>
            <b-field horizontal label="Import from Url">
              <b-input v-model="url" placeholder="Enter RSS Feed or Website">
              </b-input>
            </b-field>
            <b-field horizontal label="Network">
              <b-select
                v-model="networkId"
                placeholder="Select a podcast network"
              >
                <option
                  v-for="network in networks"
                  :key="network.id"
                  :value="network.id"
                >
                  {{ network.title }}
                </option>
              </b-select>
            </b-field>
            <b-button class="is-primary">
              Check Podcast
            </b-button>
          </section>
        </b-step-item>
        <b-step-item label="Check Podcast">
          <section>
            <b-field horizontal label="Feed Url">
              <b-input v-model="url" disabled></b-input>
            </b-field>
            <div class="podcast-name">
              <div
                class="r_podcast__cover has-background-dark"
                :style="{
                  backgroundImage: `url(${
                    podcast && podcast.image ? podcast.image : ''
                  })`
                }"
              ></div>
              <div class="r_podcast__title">
                <h1 class="is-size-5">{{ podcast.title }}</h1>
                <h2 class="is-size-7">{{ podcast.subtitle }}</h2>
              </div>
            </div>
            <b-field horizontal label="Short ID">
              <b-input v-model="shortID" disabled></b-input>
            </b-field>
            <b-field horizontal label="Podcast Url">
              <b-input v-model="podcast.url" disabled></b-input>
            </b-field>
            <div class="field import-switch">
              <b-switch v-model="importMetaData">Import Meta Data</b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importAudioFiles">Import Audio Files</b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importMedia.mp3" :disabled="!importAudioFiles">
                mp3
              </b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importMedia.m4a" :disabled="!importAudioFiles">
                m4a
              </b-switch>
            </div>
            <div class="field import-switch">
              <b-switch v-model="importMedia.ogg" :disabled="!importAudioFiles">
                ogg
              </b-switch>
            </div>
          </section>
        </b-step-item>
        <b-step-item label="Import Episodes"></b-step-item>
      </b-steps>
    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeStep: 0,
      importAudioFiles: false,
      importMedia: {
        mp3: false,
        m4a: false,
        ogg: false
      },
      importMetaData: true,
      networkId: null,
      podcast: {
        image: null,
        subtitle:
          'Seit über drei Jahren erzählen sich die Historiker Daniel Meßner und Richard Hemmer Woche für Woche eine Geschichte aus der Geschichte: Das ist Zeitsprung',
        title: 'Zeitsprung',
        url: 'https://www.zeitsprung.fm'
      },
      shortID: 'zeitsprung-zsfm-2342',
      url: 'https://www.zeitsprung.fm/feed/mp4/'
    }
  },
  computed: mapState({
    networks: state => state.networks.networks,
    podcast: state => state.podcasts.podcast
  })
}
</script>

<style lang="scss">
.podcasts__main {
  margin: 40px auto;
}
.podcast-name {
  display: flex;
  direction: row;
}
.r_podcast__cover {
  background-size: cover;
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
  margin-right: 10px;
  width: 100px;
  height: 100px;
}
.import-switch {
  label.switch {
    flex-direction: row-reverse;

    .control-label {
      padding-left: 0px;
      padding-right: 0.5em;
    }
  }
}
</style>
