module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: "nuxt-strapi",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://unpkg.com/ionicons@4.1.2/dist/css/ionicons.min.css"
      }
    ],
    script: [{ src: "https://js.stripe.com/v3" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },

  /*
   ** Global CSS
   */
  css: ["element-ui/lib/theme-chalk/index.css"],
  /*
   ** Build configuration
   */

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "@/plugins/element-ui", ssr: true },
    { src: "@/plugins/strapi", ssr: true },
    { src: "@/plugins/filter", ssr: true }
  ],

  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ["element-ui"]
  }
};
