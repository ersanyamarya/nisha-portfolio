import { CreatePagesArgs } from 'gatsby'
import path from 'path'

const ProjectsLookup = {
  watchAndBite: {
    name: 'Watch And Bite',
    description: 'An Online Platform for Convenient Snack and Beverage Delivery at the Movies',
    hiddenDescription: `Watch and Bite is an online platform that allows movie-goers to easily order snacks and beverages from the comfort of their seats. With just a few clicks, users can have their favorite treats delivered right to their theater.
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
  },
}

export const createPages = async ({ graphql, actions }: CreatePagesArgs): Promise<void> => {
  const { createPage } = actions

  const result = await graphql<Queries.Query>(`
    query AllDetailsDirectories {
      allFile(filter: { absolutePath: { regex: "/details/" } }, sort: { name: ASC }) {
        group(field: { relativeDirectory: SELECT }) {
          nodes {
            name
            id
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 1400)
            }
          }
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const groups = result.data?.allFile.group ?? []

  groups.forEach(group => {
    const name = group?.fieldValue?.split('/')[1] ?? ''
    const projectDetails = ProjectsLookup[name as keyof typeof ProjectsLookup] ?? {}

    createPage({
      path: `/projects/${name}`,
      component: path.resolve('./src/templates/details.tsx'),
      context: {
        images: group.nodes,
        ...projectDetails,
      },
    })
  })
}
