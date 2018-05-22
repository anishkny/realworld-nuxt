module.exports = {

  mode: 'spa',

  head: {
    title: 'Conduit',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic' },
      { rel: 'stylesheet', href: '//demo.productionready.io/main.css' },
    ],
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/markdownit',
  ],

  plugins: [
    '~/plugins/axios',
  ],

  markdownit: {
    injected: true
  },

}
