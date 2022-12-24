import { CreatePagesArgs } from 'gatsby'
import path from 'path'

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
    const name = group?.fieldValue?.split('/')[1]
    createPage({
      path: `/details/${name}`,
      component: path.resolve('./src/templates/details.tsx'),
      context: {
        name,
        images: group.nodes,
      },
    })
  })
}
