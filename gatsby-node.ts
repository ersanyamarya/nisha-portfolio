import { CreatePagesArgs } from 'gatsby'
import path from 'path'

const ProjectsLookup = {
  watchAndBite: {
    name: 'Watch And Bite',
    description: 'An Online Platform for Convenient Snack and Beverage Delivery at the Movies',
    hiddenDescription: `"Watch and Bite is an online platform that allows movie-goers to easily order snacks and beverages from the comfort of their seats. With just a few clicks, users can have their favorite treats delivered right to their theater.
Watch and Bite also offers a convenient group ordering feature, allowing users to coordinate snack purchases with their friends and family. Users can even schedule their orders for the beginning or interval of their movie.
In addition to providing convenience, Watch and Bite also offers a range of filtering options to help users find exactly what they're looking for. Whether you're in the mood for a classic bag of popcorn or a refreshing beverage, Watch and Bite has you covered.`,
    keyWords: [
      'Online platform',
      'Snacks',
      'Beverages',
      'Movie',
      'Delivery',
      'Save time',
      'Budget constraints',
      'Filter settings',
      'Group orders',
      'Order together function',
      'Scheduling orders',
      'Cinemas',
      'Convenient',
      'Watch and bite',
      'Watch and bite app',
      'Watch and bite website',
      'Watch and bite mobile app',
      'Watch and bite mobile website',
      'Watch and bite online platform',
      'Watch and bite online app',
      'Movie theaters',
      'Snackpass',
      'Concessions on Demand',
      'Online ordering',
      'Theater snacks',
      'Theater drinks',
      'Group ordering',
      'Scheduling options',
      'Streamlined snack purchases',
      'Classic popcorn',
      'Refreshing beverages',
      'Concession stand',
      'Movie-goers',
    ],
    image: '/watchAndBiteThumbnail.png',
    prototypeLink:
      'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FadJbZIjy3sg1GEursehV33%2FDesigns%3Fnode-id%3D875%253A13025%26scaling%3Dscale-down%26page-id%3D304%253A3662%26starting-point-node-id%3D1061%253A17257',
  },
  iGuide: {
    name: 'I Guide',
    description:
      'I Guide is an online mentoring platform that helps college graduates choose a professional path and prepare for future education with the assistance of industry professionals.',
    hiddenDescription: `i Guide is an online mentoring service that helps college graduates to choose a professional path or prepare for future education.
Mentees can connect with mentors on our platform with the aspiration of a great career. Provide an online mentoring service through chat, voice and video calls for college grads. Provides a platform to explore the career opportunities available in a particular field Helps to choose a better professional path through mentoring By connecting college graduates with industry professionals from a variety of fields, assists them in selecting universities for their further education. Mentors can help to understand the admission process and exam patterns of a college Provides variety of sessions (weekly, monthly or once).`,
    keyWords: [
      'online mentoring',
      'college graduates',
      'professional path',
      'career opportunities',
      'industry professionals',
      'education',
      'admission process',
      'exam patterns',
      'sessions',
      'personalized guidance',
    ],
    image: '/iGuideThumbnail.png',
    prototypeLink:
      'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fz4vYxXoBLnA4qF7LZaxXbc%2FScreen-Designs%3Fnode-id%3D446%253A6392%26scaling%3Dscale-down%26page-id%3D32%253A789%26starting-point-node-id%3D446%253A6392%26show-proto-sidebar%3D1',
  },
  pawsAndClaws: {
    name: 'Paws and Claws',
    description:
      'Paws & Claws is a responsive web design for a service that helps connect animals in shelters with potential adopters. Visitors can arrange appointments to meet adoptable cats and dogs and give them a loving home.',
    hiddenDescription:
      'Every year, millions of animals enter shelters. Many of them are in good health, would make wonderful pets, and need a home. Paws & Claws is a fictitious responsive website designed for an animal shelter that offers a platform for visitors to arrange appointments to meet cats and dogs up for adoption.',
    keyWords: [
      'pet adoption service',
      'animal rescue',
      'foster care',
      'pet matching',
      'adoptable pets',
      'homeless animals',
      'animal welfare',
      'pet care',
    ],
    image: '/pawsAndClawsThumbnail.png',
    prototypeLink:
      'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FAMM7qmLT3MqWohK0T45Vt0%2FPaws-N-Claws--Responsive-Web-Design%3Fnode-id%3D202%253A3669%26scaling%3Dscale-down%26page-id%3D29%253A714%26starting-point-node-id%3D202%253A3669%26show-proto-sidebar%3D1',
  },
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs): Promise<void> => {
  const { createPage } = actions

  const projectsResult = await graphql<Queries.Query>(`
    query AllDetailsDirectories {
      allFile(filter: { absolutePath: { regex: "/details/" } }, sort: { name: ASC }) {
        group(field: { relativeDirectory: SELECT }) {
          nodes {
            name
            id
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 4200)
            }
          }
          fieldValue
        }
      }
    }
  `)

  const iconsResult = await graphql<Queries.Query>(`
    query AllIcons {
      allFile(filter: { absolutePath: { regex: "/contextIcons/" } }) {
        nodes {
          name
          id
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 4200)
          }
        }
      }
    }
  `)

  if (projectsResult.errors) {
    throw projectsResult.errors
  }

  if (iconsResult.errors) {
    throw iconsResult.errors
  }

  const groups = projectsResult.data?.allFile.group ?? []
  const icons = iconsResult.data?.allFile.nodes ?? []

  groups.forEach(group => {
    const name = group?.fieldValue?.split('/')[1] ?? ''
    const projectDetails = ProjectsLookup[name as keyof typeof ProjectsLookup] ?? {}
    const icon = icons.find(icon => icon.name === name)

    createPage({
      path: `/projects/${name}`,
      component: path.resolve('./src/templates/details.tsx'),
      context: {
        images: group.nodes,
        icon,
        ...projectDetails,
      },
    })
  })
}
