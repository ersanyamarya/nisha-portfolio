import { getImage, IGatsbyImageData, GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
export type SocialLink = {
  id: string
  name: string
  link: string
  logo: IGatsbyImageData
}
export type Project = {
  id: string
  name: string
  shortDescription: string
  slug: string
  cardCover: IGatsbyImageData
}
export type ContentfulBaseData = {
  socialLinks: SocialLink[]
  // projects: Project[]
}
export function contentfulBaseData(query: Queries.Query): ContentfulBaseData {
  const { allContentfulSocialLinks } = query
  return {
    socialLinks: allContentfulSocialLinks.nodes.map(social => {
      const image = getImage(social.logo?.gatsbyImageData as IGatsbyImageData) as IGatsbyImageData
      return {
        id: social.id,
        name: social.name,
        link: social.link,
        logo: image,
      }
    }) as SocialLink[],
    // projects: allContentfulProject.nodes.map(project => {
    //   const image = getImage(project.cardCover?.gatsbyImageData as IGatsbyImageData) as IGatsbyImageData
    //   return {
    //     id: project.id,
    //     name: project.name,
    //     shortDescription: project.shortDescription,
    //     slug: project.slug,
    //     cardCover: image,
    //   }
    // }) as Project[],
  }
}
