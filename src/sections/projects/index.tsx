import React from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';

import { getImage } from 'gatsby-plugin-image';
import MqtizerGraphic from '../../images/projects/mqtizer/moc.gif';
import MqtizerWebGraphic from '../../images/projects/mqtizerWeb/moc.png';
import SpektrumGraphic from '../../images/projects/spektrum/moc.png';

const projects = [
  {
    name: 'MQTIZER',
    link: '/projects/mqtizerApp',
    description: 'Overcoming Configuration Challenges in MQTT for Industry 4.0',
    brand: {
      primary: '#353D69',
      secondary: '#FFDEA2',
      bg: '#FFFCF6',
    },
    tags: ['iOS/Android Mobile App', 'IoT', 'UX Research & Design Case Study'],
    bullets: {
      'Key Role': 'User research, ideation workshops, A/B testing and End-to-End visual design.',
      Impact: 'Boosted navigation efficiency by 60%',
    },
    // backDrop: 'projects/mqtizer/backdrop.png',
    graphic: MqtizerGraphic,
  },
  {
    name: 'Spektrum',
    link: '/projects/spektrum',
    description: 'Inability to track real-time progress of academic resources, leading to planning inefficiencies',
    brand: {
      primary: '#2A2244',
      secondary: '#674EB4',
      bg: '#F1F1FC',
    },
    tags: ['Web App', 'EdTech', 'UX Research & Design Case Study'],
    bullets: {
      'Key Role': 'UX Research, Information Architecture, End-to-End visual design, Usability Testing',
      Impact: '90% scheduling accuracy, 90% reduction in manual tracking, and 75% faster timetable creation',
    },
    // // backDrop: 'projects/mqtizer/backdrop.png',
    graphic: SpektrumGraphic,
  },
  {
    name: 'MQTIZER Web',
    link: '/projects/mqtizerWeb',
    description: 'Increase Conversion Rate + Brand Awareness of App Through Website Design',
    brand: {
      primary: '#353D69',
      secondary: '#DEE0FF',
      bg: '#FCFCFF',
    },

    tags: ['Web Design', 'IoT', 'Marketing Strategy & Design Case Study'],
    bullets: {
      'Key Role': 'Data-driven design strategy, site map and End-to-End visual design.',
      Impact: 'Achieved a 4% conversion rate and 100% accessibility and SEO scores.',
    },
    // // backDrop: 'projects/mqtizer/backdrop.png',
    graphic: MqtizerWebGraphic,
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
      className="gap-10vh flex w-full flex-col gap-16 font-light">
      <h2 className="text-4xl font-medium">Selected Work</h2>
      {projects.map((project, index) => {
        const placeholderImage = allFile.nodes.find(node => node.relativePath === project.backDrop);
        const image = getImage(placeholderImage);

        const order = index % 2 !== 0 ? 0 : 1;

        return (
          <Link
            to={project.link}
            className="grid h-full grid-cols-1 gap-8 rounded-lg border-2 border-primary p-16 md:p-0 md:px-16 transition hover:shadow-xl md:h-[32rem] md:grid-cols-5"
            style={{
              color: project.brand.primary,

              // backgroundColor: project.brand.bg,
            }}>
            {/* <GatsbyImage
              image={image}
              alt={project.name}
              className="absolute inset-0 z-0 h-full w-full rounded-lg"
              imgClassName="h-full w-full rounded-lg object-cover"
            /> */}

            <div className='col-span-1 md:col-span-2 flex items-center justify-center'
            style ={{
              order
            }}
            >
           
              <img
                className=""
                style={{
                  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
              
                }}
                src={project.graphic}
                alt={project.name}
              />
            </div>

            <div className="col-span-1 flex flex-col justify-center gap-6 md:col-span-3">
              {/* <h3 className="text-4xl">{project.name}</h3> */}
              <p className="text-3xl">{project.description}</p>
              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <li
                    key={index}
                    className="rounded-md px-3 py-2 text-lg"
                    style={{
                      backgroundColor: project.brand.secondary,
                      color: contrastColor(project.brand.secondary),
                    }}>
                    {tag}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 text-lg">
                {Object.entries(project.bullets).map(([key, value], index) => (
                  <li key={index}>
                    <span className="text-xl font-normal">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
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
