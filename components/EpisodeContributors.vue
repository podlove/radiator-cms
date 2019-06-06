<template>
  <div class="r_episode-contributors">
    <h2 class="title is-size-5 r_episode-contributors__headline">
      Contributors
    </h2>
    <ul class="r_episode-contributors__list">
      <li
        v-for="contributor in mockData.contributors"
        :key="contributor.name"
        class="r_episode-contributors__item"
      >
        <span
          class="r_episode-contributors__image"
          :style="{
            backgroundImage: `url(${contributor.image})`
          }"
        ></span>
        <p>
          <a :href="contributor.uri" target="_blank">
            {{ contributor.name }}
          </a>
        </p>
      </li>
    </ul>
  </div>
</template>

<style>
.r_episode-contributors {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  margin: 4rem 0 0 0;
}
.r_episode-contributors__headline {
  margin: 0 !important;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid lightgrey;
}
.r_episode-contributors__image {
  background-color: lightgrey;
  background-size: cover;
  border-radius: 50%;
  margin-right: 1rem;
  width: 2rem;
  height: 2rem;
}
.r_episode-contributors__item {
  align-items: center;
  display: flex;
  margin: 1rem 0;
  padding: 0 2rem;
}
.r_episode-contributors__list {
  padding: 1rem 0;
}
.r_episode-contributors__text {
  padding: 2rem;
}
</style>

<script>
export default {
  data() {
    return {
      mockData: {
        contributors: [
          {
            name: 'Tim Pritlove',
            uri: 'https://tim.pritlove.org/',
            image:
              'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
          },
          {
            name: 'Linus Neumann',
            uri: 'https://tim.pritlove.org/',
            image:
              'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
          },
          {
            name: '	Thomas Lohninger',
            uri: 'https://tim.pritlove.org/',
            image:
              'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
          },
          {
            name: '	Julia Reda',
            uri: 'https://tim.pritlove.org/',
            image:
              'https://logbuch-netzpolitik.de/wp-content/cache/podlove/d4/a975f973c6d6e64ee5fb0e07abe7ef/linus-neumann_50x50.jpg'
          }
        ]
      }
    }
  },
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>
