module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "factory-host",
  },
  pathPrefix: "/factory-host",
  plugins: [
    {    
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require("tailwindcss"),
          require("./tailwind.config.js"), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'material icons',
          'roboto:300,400,500,700',
          'Orbitron:400'
        ],
      },
    },
  ],
};
