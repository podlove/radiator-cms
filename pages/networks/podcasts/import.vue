<template>
  <section class="r_podcasts">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container r_podcasts__header">
          <h1 class="title">Import Podcast</h1>
        </div>
      </div>
    </section>
    <section class="container podcasts__main podcast__import">
      <b-steps v-model="activeStep" :animated="true" :has-navigation="false">
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
                required
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
            <b-button class="is-primary" @click.stop.prevent="navigateTo(1)">
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
            <b-button class="is-primary" @click.stop.prevent="navigateTo(0)">
              Back
            </b-button>
            <b-button class="is-primary" @click.stop.prevent="navigateTo(2)">
              Import Podcast
            </b-button>
          </section>
        </b-step-item>
        <b-step-item label="Import Episodes">
          <section>
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
            <p>{{ episodes.loaded }} / {{ episodes.total }} Episodes loaded</p>
            <p>LADEBALKENPLATZHALTER</p>

            <b-table :data="podcastFeedEpisode" :striped="true">
              <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                  {{ props.row.id }}
                </b-table-column>
                <b-table-column field="title" label="Title">
                  {{ props.row.title }}
                </b-table-column>
                <b-table-column
                  field="mp3"
                  label="mp3"
                  :class="checkField(props.row.mp3)"
                >
                  {{ props.row.mp3 }}
                </b-table-column>
                <b-table-column
                  field="m4a"
                  label="m4a"
                  :class="checkField(props.row.m4a)"
                >
                  {{ props.row.m4a }}
                </b-table-column>
                <b-table-column
                  field="ogg"
                  label="ogg"
                  :class="checkField(props.row.ogg)"
                >
                  {{ props.row.ogg }}
                </b-table-column>
                <b-table-column
                  field="transcripts"
                  label="Transcripts"
                  :class="checkField(props.row.transcripts)"
                >
                  {{ props.row.transcripts }}
                </b-table-column>
                <b-table-column
                  field="chapter_marks"
                  label="Chapter Marks"
                  :class="checkField(props.row.chapter_marks)"
                >
                  {{ props.row.chapter_marks }}
                </b-table-column>
              </template>
            </b-table>
            <b-button class="is-primary" @click.stop.prevent="navigateTo(1)"
              >Back
            </b-button>
            <b-button class="is-primary">Finish Export</b-button>
          </section>
        </b-step-item>
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
      episodes: {
        loaded: 123,
        total: 321
      },
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
      podcastFeedEpisode: [
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: false,
          ogg: false,
          transcripts: true,
          chapter_marks: false
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: false,
          ogg: true,
          transcripts: true,
          chapter_marks: false
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: false,
          ogg: true,
          transcripts: true,
          chapter_marks: true
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: false,
          ogg: true,
          transcripts: true,
          chapter_marks: true
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: true,
          ogg: true,
          transcripts: true,
          chapter_marks: false
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: false,
          m4a: false,
          ogg: true,
          transcripts: false,
          chapter_marks: true
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: true,
          ogg: false,
          transcripts: true,
          chapter_marks: false
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: false,
          m4a: true,
          ogg: true,
          transcripts: true,
          chapter_marks: false
        },
        {
          id: 197,
          title:
            'ZS197: Das kurzlebige Königreich Finnland – und ein deutscher Adliger auf dem Thron',
          mp3: true,
          m4a: false,
          ogg: true,
          transcripts: true,
          chapter_marks: true
        }
      ],
      shortID: 'zeitsprung-zsfm-2342',
      url: 'https://www.zeitsprung.fm/feed/mp4/'
    }
  },
  computed: mapState({
    networks: state => state.networks.networks
  }),
  methods: {
    checkField(value) {
      return value ? 'is-success' : 'is-danger'
    },
    navigateTo(step) {
      this.activeStep = step
    }
  }
}
</script>

<style lang="scss">
.podcasts__main {
  margin: 40px auto;
}
.podcast__import {
  text-align: center;
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
