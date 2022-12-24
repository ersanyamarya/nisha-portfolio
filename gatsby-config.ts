import dotenv from 'dotenv'
import type { GatsbyConfig } from 'gatsby'

dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nisha Kumari | UI/UX Designer`,
    siteUrl: `https://nisha-kumari-portfolio.netlify.app`,
    description: `Nisha Kumari is a UI/UX Designer based in Berlin. She is passionate about designing and creating beautiful user interfaces.`,
    linkedinUsername: `nisha-kumari-de/`,
    twitterUsername: `nishakumari_de`,
    image: '/seoThumbnail.png',
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Montserrat`,
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
  ],
}

export default config
