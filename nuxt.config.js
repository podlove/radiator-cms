import pkg from './package'

// Do some local enving so we can reuse it in this file already
const localenv = {
  apiBaseUrl: process.env.RADIATOR_BASE_URL || 'http://localhost:4000'
}

export default {
  mode: 'universal',

  env: {
    apiBaseUrl: localenv.apiBaseUrl,
    backendVersion: 'v1'
  },

  // potentially run in a subfolder (e.g. /manage/ in the default radiator installation)
  // just in preparation for full support, see https://github.com/podlove/radiator-cms/issues/114
  router: {
    base: process.env.NUXT_ROOT || '/'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [{ src: 'http://cdn.podlove.org/web-player/embed.js' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // https://github.com/nuxt-community/apollo-module
    '@nuxtjs/apollo',
    // https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /**
   * Apollo module configuration
   */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `${localenv.apiBaseUrl}/api/graphql`
      }
    }
  },
  /**
   * Moment module configuration
   */
  moment: {
    locales: ['de']
  },

  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/main.scss',
    '@/assets/mdi/css/materialdesignicons.min.css'
  ],
  buefy: {
    materialDesignIcons: true,
    materialDesignIconsHRef: '/'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
