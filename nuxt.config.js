module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#'
    },
    titleTemplate: 'Json Diff Checker',
    title: 'Json Diff Checker',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Json Diff Checker'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Json Diff Checker'
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://json-diff-checker.fooqoo56.com/'
      },
      { hid: 'og:title', property: 'og:title', content: 'Json Diff Cheker' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Json Diff Checker'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content:
          'https://json-diff-checker.fooqoo56.com/image/v1590927728/Icon_dimtxx.png'
      },
      {
        property: 'article:publisher',
        content: 'https://www.facebook.com/fooqoo56'
      },
      { property: 'fb:app_id', content: '1340095216196658' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: 'Json Diff Checker' },
      {
        name: 'twitter:url',
        content: 'https://json-diff-checker.fooqoo56.com/'
      },
      { name: 'twitter:title', content: 'Json Diff Checker' },
      {
        name: 'twitter:description',
        content: 'To detect differrence of two json files'
      },
      {
        name: 'twitter:image',
        content:
          'https://json-diff-checker.fooqoo56.com/image/v1590927728/Icon_dimtxx.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
        integrity:
          'sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/utils.ts', { src: '~/plugins/ga.js', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'vue-social-sharing/nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss']
  },
  build: {
    parallel: true,
    cache: true,
    hardsource: true
  }
};
