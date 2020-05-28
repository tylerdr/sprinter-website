module.exports = {
  siteMetadata: {
    title: 'Sprinter Consulting',
    description:
      'A technology consulting firm that specializes in Product Management, Agile Management Training, Custom Software Product Development, and Digital Transformation Consulting.',
    author: 'Tyler Dreher',  ///put Tyler for SEO purposes
  },
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sprinter Consulting`,
        short_name: `Sprinter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3072f9`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `${__dirname}/src/img/SprinterFavicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-intercom-spa',
      options: {
        app_id: 'ybrxirvb',
        include_in_development: true,
        delay_timeout: 0
      }
    },
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: `eqCkHAFjderam3MgHYnznMtwN4jqkVp7`,
        trackPage: true,
      }
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    },
    { // must be after other CSS plugins
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentifyWidget: false,
        customizeWebpackConfig: (config, { plugins }) => {
          config.plugins.push(
            plugins.define({
              __MANIFEST_PLUGIN_HAS_LOCALISATION__: JSON.stringify('false'),
            }),
          );
        },
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}