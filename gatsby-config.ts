import dotenv from 'dotenv';
import type { GatsbyConfig } from 'gatsby';

dotenv.config();

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Nisha Kumari | Senior Product Designer`,
    siteUrl: `https://nishakumari.art/`,
    description: `Precision in the process, delight in the details. Nisha Kumari is a Berlin-based Senior Product Designer blending rigorous UX strategy with an artist's touch, across climate-tech, cloud FinOps and security products.`,
    linkedinUsername: `nisha-kumari-de/`,
    twitterUsername: `nishakumari_de`,
    image: '/seoThumbnail.png',
    copyWrite: 'Nisha Kumari',
    keyWords: [
      'Senior Product Designer',
      'Senior UX designer',
      'product design Berlin',
      'user-centric design',
      'Berlin',
      'design systems',
      'fine art painting',
      'user interface design',
      'user experience design',
      'user-friendly products',
      'user research',
      'usability testing',
      'interaction design',
      'wireframing',
      'prototyping',
      'visual design',
      'graphic design',
      'user flow',
      'usability',
      'accessibility',
      'Figma',
      'Adobe XD',
      'design tools',
      'Cloud Cost Anomaly Management',
      'FinOps',
    ],
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
        name: 'Nisha Kumari | Senior Product Designer',
        short_name: 'Nisha Kumari',
        start_url: '/',
        display: 'standalone',
        background_color: '#fdfbf7',
        theme_color: '#c2785b',
        lang: 'en',
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `./src/content`,
      },
      __key: 'content',
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
              quality: 100,
            },
          },
        ],
      },
    },

    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: `Inter`,
            file: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap`,
          },
          {
            name: `Playfair Display`,
            // Regular (400) is the H2 weight in docs/Brand.md, and italic 400 is used
            // for the small serif accents on the hero cards.
            file: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-clarity`,
      options: {
        clarity_project_id: 'ldwc685yke',
        enable_on_dev_env: true,
      },
    },
    'gatsby-plugin-postcss',
  ],
};

export default config;
