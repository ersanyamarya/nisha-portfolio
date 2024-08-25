import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import MqtizerGraphic from '../../images/projects/mqtizer/iphone.png';

const projects = [
  {
    name: 'MQTIZER',
    description: 'Overcoming Configuration Challenges in MQTT for Industry 4.0',
    brand: {
      primary: '#353D69',
      secondary: '#FFDEA2',
    },
    tags: ['iOS/Android Mobile App', 'IoT', 'UX Research & Design Case Study'],
    bullets: {
      'Key Role': 'User research, ideation sessions, rigorous A/B testing and End-to-End visual design.',
      Impact: 'Boosted navigation efficiency by 60%',
    },
    backDrop: 'projects/mqtizer/backdrop.png',
    graphic: MqtizerGraphic,
  },
];

export default function ProjectsSection() {
  const { allFile } = useStaticQuery(graphql`
    query AllProjectImages {
      allFile(filter: { relativeDirectory: { regex: "/projects/" } }) {
        nodes {
          relativePath
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG, quality: 100)
          }
        }
      }
    }
  `);

  return (
    <section
      id="projects"
      className="gap-10vh flex w-full flex-col gap-16">
      <h2 className="text-4xl text-primary-950">Projects</h2>
      {projects.map((project, index) => {
        const placeholderImage = allFile.nodes.find(node => node.relativePath === project.backDrop);
        const image = getImage(placeholderImage);

        return (
          <div
            className="relative grid min-h-96 grid-cols-1 rounded-lg shadow-lg md:grid-cols-2"
            style={{
              color: project.brand.primary,
            }}>
            <GatsbyImage
              image={image}
              alt={project.name}
              className="absolute inset-0 z-0 h-full w-full rounded-lg"
            />
            <div className={index % 2 !== 0 ? 'col-span-1' : 'order-2 col-span-1' + ' relative flex items-center justify-center'}>
              <img
                src={project.graphic}
                alt={project.name}
              />
            </div>

            <div className="relative col-span-1 flex flex-col justify-center gap-6 p-8 md:col-span-1">
              <h3 className="text-4xl">{project.name}</h3>
              <p className="text-2xl">{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="rounded-md px-2 py-1 text-sm"
                    style={{
                      backgroundColor: project.brand.secondary,
                      color: contrastColor(project.brand.secondary),
                    }}>
                    {tag}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 text-base">
                {Object.entries(project.bullets).map(([key, value], index) => (
                  <li key={index}>
                    <span className="font-semibold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}

const contrastColor = (hex: string) => {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 128 ? '#222' : '#fafafa';
};
