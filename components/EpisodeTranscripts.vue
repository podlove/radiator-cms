<template>
  <div class="r_episode-transcripts">
    <section class="r_episode-transcripts__header">
      <h2 class="title is-size-5 r_episode-transcripts__headline">
        Transcripts
      </h2>
      <div v-if="transcripts">
        <b-button>
          <b-icon size="is-small" icon="upload"></b-icon>
          <a>Assign speaker</a>
        </b-button>
        <b-button>
          <b-icon size="is-small" icon="upload"></b-icon>
          <a>Update transcripts</a>
        </b-button>
        <b-button>
          <b-icon size="is-small" icon="upload"></b-icon>
          <a>Export transcripts</a>
        </b-button>
      </div>
    </section>
    <!-- <p>{{ transcripts }}</p> -->
    <section class="r_episode-transcripts__content">
      <div
        v-for="(sentence, index) in transcripts"
        :key="index"
        class="r_episode-transcripts__content__line"
      >
        <div v-if="!sentence.speaker">
          <h2>{{ sentence.text }}</h2>
        </div>
        <div v-else>
          <div class="r_episode-transcripts__speaker">
            <b-icon icon="account" size="is-small"></b-icon>
            {{ sentence.speaker }}
          </div>
          <p>&nbsp; {{ sentence.text }}</p>
        </div>
        <!-- <span v-if="sentence.speaker" class="r_episode-transcripts__speaker">
          <b-icon icon="account" size="is-small"></b-icon>
          {{ sentence.speaker }}
        </span>
        <h2 v-if="!sentence.speaker">{{ sentence.text }}</h2>
        <span v-else>&nbsp; {{ sentence.text }}</span> -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transcripts: [
        {
          track: 2,
          start: 0.018,
          newpara: true,
          end: 51.468,
          text: 'Intro'
        },
        {
          confidence: 1.0,
          end: 27.039,
          track: 0,
          text:
            'Na wie habt ihr diese historische Woche erlebt. Was für eine historische Woche fragt ihr als diese jungen Menschen mal wieder im Fernsehen waren. Na wie habt ihr diese historische Woche erlebt. Was für eine historische Woche fragt ihr als diese jungen Menschen mal wieder im Fernsehen waren.',
          newpara: true,
          start: 17.919,
          speaker: 'Ich',
          timestamps: [
            ['Na', 17.920000000000002, 18.18, 0.97],
            ['wie', 18.18, 18.309999999999999, 0.97],
            ['habt', 18.309999999999999, 18.489999999999998, 1.0],
            ['ihr', 18.489999999999998, 18.640000000000001, 1.0],
            ['diese', 18.640000000000001, 18.91, 1.0],
            ['historische', 18.91, 19.66, 1.0],
            ['Woche', 19.66, 19.989999999999998, 1.0],
            ['erlebt.', 19.989999999999998, 20.620000000000001, 1.0],
            ['Was', 20.710000000000001, 20.890000000000001, 1.0],
            ['für', 20.890000000000001, 20.98, 1.0],
            ['eine', 20.98, 21.129999999999999, 1.0],
            ['historische', 21.129999999999999, 21.73, 1.0],
            ['Woche', 21.73, 22.059999999999999, 1.0],
            ['fragt', 22.059999999999999, 22.449999999999999, 0.99],
            ['ihr', 22.449999999999999, 22.719999999999999, 1.0],
            ['als', 23.98, 24.25, 1.0],
            ['diese', 24.25, 24.609999999999999, 1.0],
            ['jungen', 24.609999999999999, 25.059999999999999, 1.0],
            ['Menschen', 25.059999999999999, 25.48, 1.0],
            ['mal', 25.48, 25.629999999999999, 1.0],
            ['wieder', 25.629999999999999, 25.870000000000001, 1.0],
            ['im', 25.870000000000001, 25.989999999999998, 1.0],
            ['Fernsehen', 25.989999999999998, 26.5, 1.0],
            ['waren.', 26.5, 27.039999999999999, 1.0]
          ]
        },
        {
          confidence: 1.0,
          end: 29.859,
          track: 0,
          text: 'Ja wir reden heute mal über diesen historischen Moment.',
          start: 27.159,
          speaker: 'Ich',
          timestamps: [
            ['Ja', 27.16, 27.43, 1.0],
            ['wir', 27.43, 27.550000000000001, 1.0],
            ['reden', 27.550000000000001, 27.760000000000002, 1.0],
            ['heute', 27.760000000000002, 27.91, 0.99],
            ['mal', 27.91, 28.059999999999999, 0.99],
            ['über', 28.059999999999999, 28.27, 1.0],
            ['diesen', 28.27, 28.539999999999999, 1.0],
            ['historischen', 28.539999999999999, 29.32, 1.0],
            ['Moment.', 29.32, 29.859999999999999, 1.0]
          ]
        },
        {
          confidence: 0.95,
          end: 43.539,
          track: 0,
          text:
            'Diese kleine Zäsur zwischen Rhee so und Nahles um dann ein Buch über die Rentner Republik zu schreiben das ist heute das 26. Der Talk Radio Rentner Republique.',
          start: 30.009,
          speaker: 'Ich',
          timestamps: [
            ['Diese', 30.010000000000002, 30.219999999999999, 1.0],
            ['kleine', 30.219999999999999, 30.609999999999999, 1.0],
            ['Zäsur', 30.609999999999999, 31.210000000000001, 1.0],
            ['zwischen', 31.84, 32.259999999999998, 1.0],
            ['Rhee', 32.259999999999998, 32.5, 0.25],
            ['so', 32.5, 32.799999999999997, 1.0],
            ['und', 32.799999999999997, 33.07, 1.0],
            ['Nahles', 33.07, 33.789999999999999, 1.0],
            ['um', 34.450000000000003, 34.93, 1.0],
            ['dann', 34.93, 35.119999999999997, 0.92],
            ['ein', 35.140000000000001, 35.259999999999998, 1.0],
            ['Buch', 35.259999999999998, 35.439999999999998, 1.0],
            ['über', 35.439999999999998, 35.590000000000003, 1.0],
            ['die', 35.590000000000003, 35.68, 1.0],
            ['Rentner', 35.68, 36.060000000000002, 0.8],
            ['Republik', 36.060000000000002, 36.490000000000002, 0.98],
            ['zu', 36.490000000000002, 36.640000000000001, 1.0],
            ['schreiben', 36.640000000000001, 37.119999999999997, 1.0],
            ['das', 38.159999999999997, 38.350000000000001, 0.99],
            ['ist', 38.350000000000001, 38.530000000000001, 1.0],
            ['heute', 38.530000000000001, 38.770000000000003, 1.0],
            ['das', 38.770000000000003, 39.009999999999998, 0.97],
            ['26.', 39.130000000000003, 40.020000000000003, 0.81],
            ['Der', 40.020000000000003, 40.170000000000002, 0.98],
            ['Talk', 40.18, 40.600000000000001, 1.0],
            ['Radio', 40.600000000000001, 41.200000000000003, 1.0],
            ['Rentner', 42.539999999999999, 42.93, 1.0],
            ['Republique.', 42.960000000000001, 43.539999999999999, 0.81]
          ]
        },
        {
          confidence: 0.97,
          end: 57.539,
          track: 0,
          text:
            'Zu Beginn aber wie immer eine kleine Danksagungen Runde beim letzten Mal hatte ich mich bei Dirk bedankt.',
          newpara: true,
          start: 51.839,
          speaker: 'Ich',
          timestamps: [
            ['Zu', 51.840000000000003, 52.049999999999997, 0.99],
            ['Beginn', 52.049999999999997, 52.469999999999999, 0.69],
            ['aber', 52.469999999999999, 52.68, 0.98],
            ['wie', 52.68, 52.859999999999999, 0.93],
            ['immer', 52.859999999999999, 53.130000000000003, 1.0],
            ['eine', 53.130000000000003, 53.369999999999997, 1.0],
            ['kleine', 53.369999999999997, 53.729999999999997, 1.0],
            ['Danksagungen', 53.729999999999997, 54.530000000000001, 0.82],
            ['Runde', 54.539999999999999, 54.899999999999999, 1.0],
            ['beim', 54.899999999999999, 55.079999999999998, 1.0],
            ['letzten', 55.079999999999998, 55.380000000000003, 1.0],
            ['Mal', 55.380000000000003, 55.590000000000003, 1.0],
            ['hatte', 55.590000000000003, 55.710000000000001, 0.99],
            ['ich', 55.710000000000001, 55.799999999999997, 1.0],
            ['mich', 55.799999999999997, 55.979999999999997, 1.0],
            ['bei', 55.979999999999997, 56.189999999999998, 1.0],
            ['Dirk', 56.43, 56.880000000000003, 1.0],
            ['bedankt.', 56.880000000000003, 57.539999999999999, 1.0]
          ]
        },
        {
          confidence: 0.99,
          end: 60.149,
          track: 0,
          text: 'Ich wollte aber Dietmar sagen sorry dafür.',
          start: 57.749,
          speaker: 'Ich',
          timestamps: [
            ['Ich', 57.75, 57.869999999999997, 1.0],
            ['wollte', 57.869999999999997, 58.079999999999998, 1.0],
            ['aber', 58.079999999999998, 58.259999999999998, 0.96],
            ['Dietmar', 58.259999999999998, 58.710000000000001, 1.0],
            ['sagen', 58.710000000000001, 59.189999999999998, 1.0],
            ['sorry', 59.219999999999999, 59.640000000000001, 1.0],
            ['dafür.', 59.640000000000001, 60.149999999999999, 1.0]
          ]
        },
        {
          confidence: 0.95,
          end: 73.079,
          track: 0,
          text:
            'Und wir holen auf mit Ralf. Der hat 30 Euro geschickt und sagt Super Idee und super Podcast Malo schickt 110 und beendet seine schwarze Hörerschaft Das ist sehr gut in der Podcast Landschaft.',
          start: 61.339,
          speaker: 'Ich',
          timestamps: [
            ['Und', 61.340000000000003, 61.859999999999999, 0.97],
            ['wir', 62.43, 62.609999999999999, 1.0],
            ['holen', 62.609999999999999, 62.82, 1.0],
            ['auf', 62.82, 63.060000000000002, 0.99],
            ['mit', 63.060000000000002, 63.240000000000002, 1.0],
            ['Ralf.', 63.240000000000002, 63.549999999999997, 0.79],
            ['Der', 63.619999999999997, 63.75, 0.78],
            ['hat', 63.75, 63.93, 0.99],
            ['30', 63.93, 64.349999999999994, 0.99],
            ['Euro', 64.349999999999994, 64.560000000000002, 1.0],
            ['geschickt', 64.560000000000002, 64.890000000000001, 0.64],
            ['und', 64.890000000000001, 65.010000000000005, 1.0],
            ['sagt', 65.010000000000005, 65.219999999999999, 1.0],
            ['Super', 65.219999999999999, 65.579999999999998, 1.0],
            ['Idee', 65.579999999999998, 65.879999999999995, 1.0],
            ['und', 65.879999999999995, 66.25, 0.96],
            ['super', 66.269999999999996, 66.629999999999995, 1.0],
            ['Podcast', 66.629999999999995, 67.200000000000003, 1.0],
            ['Malo', 67.769999999999996, 68.310000000000002, 0.67],
            ['schickt', 68.340000000000003, 68.609999999999999, 0.98],
            ['110', 68.609999999999999, 69.25, 0.93],
            ['und', 69.269999999999996, 69.510000000000005, 0.99],
            ['beendet', 69.510000000000005, 69.900000000000006, 0.97],
            ['seine', 69.900000000000006, 70.140000000000001, 0.99],
            ['schwarze', 70.140000000000001, 70.620000000000005, 0.97],
            ['Hörerschaft', 70.620000000000005, 71.159999999999997, 1.0],
            ['Das', 71.170000000000002, 71.340000000000003, 0.98],
            ['ist', 71.340000000000003, 71.459999999999994, 0.99],
            ['sehr', 71.459999999999994, 71.609999999999999, 1.0],
            ['gut', 71.609999999999999, 71.890000000000001, 1.0],
            ['in', 71.900000000000006, 72.010000000000005, 0.62],
            ['der', 72.030000000000001, 72.120000000000005, 0.99],
            ['Podcast', 72.120000000000005, 72.540000000000006, 1.0],
            ['Landschaft.', 72.540000000000006, 73.079999999999998, 1.0]
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/css/main.scss';
h2 {
  font-size: 1.25em;
  font-weight: bold;
}
p {
  margin-left: 30px;
  hyphens: auto;
  word-break: break-word;
}
.r_episode-transcripts {
  margin: 4rem 0 0 0;
}
.r_episode-transcripts {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.r_episode-transcripts__headline {
  margin: 0 !important;
}
.r_episode-transcripts__header {
  align-items: center;
  border-bottom: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 2rem;
}
.r_episode-transcripts__speaker {
  padding-left: 3px;
  padding-right: 5px;
  background: $primary;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  float: left;
}
.r_episode-transcripts__content {
  padding: 1em 1.5em;
}
.r_episode-transcripts__content__line {
  margin: 0.75em 0;
}
</style>
