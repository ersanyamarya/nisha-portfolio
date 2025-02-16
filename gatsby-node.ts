import { CreatePagesArgs } from 'gatsby';
import path from 'path';

const ProjectsLookup = {
  mqtizerApp: {
    name: 'Mqtizer App',
    description: 'MQTIZER: Cross-platform MQTT client for industry grade IoT Solutions.',
    hiddenDescription: `MQTIZER: Elevate your Industry 4.0 projects with our cutting-edge MQTT mobile client.
Seamlessly monitor real-time data, collaborate effortlessly, and simulate sensor values with the intuitive Sensor Keyboard.
Revolutionize your IoT journey with the ultimate MQTT solution!`,
    keyWords: [
      'MQTIZER',
      'Mobile MQTT client',
      'IoT connectivity',
      'Industry 4.0',
      'Real-time data monitoring',
      'Sensor Keyboard',
      'Collaborative workspaces',
      'User experience design',
      'Enhanced UI/UX',
      'User-centric design',
      'Intuitive interface',
      'Innovative solutions',
      'Seamless configuration',
      'User feedback incorporation',
      'Enhanced IoT experience',
    ],
    image: '/mqtizerAppThumbnail.png',
    prototypeLink: 'https://www.youtube.com/embed/Kw5PtbWzuNk?si=RGj7QaefEDB02iSm',
  },
  spektrum: {
    name: 'Spektrum Akademie',
    description: 'Spektrum Akademie: A digital platform for academic resource management and real-time progress tracking.',
    hiddenDescription: `Spektrum Akademie is a digital platform designed to streamline academic resource management and real-time progress tracking. Our platform offers a comprehensive toolkit for educators, students, and administrators, enabling seamless collaboration and efficient resource allocation.
With a user-centric design and AI-driven insights, Spektrum Akademie empowers educators to optimize their teaching strategies and enhance student learning outcomes. Dive into a realm where academic excellence thrives, guided by the pulse of real-time progress and the unwavering vision of educators.`,
    keyWords: [
      'Spektrum Akademie',
      'Digital platform',
      'Academic resource management',
      'Real-time progress tracking',
      'Education technology',
      'EdTech',
      'User-centric design',
      'AI-driven insights',
      'Optimized teaching strategies',
      'Enhanced student learning outcomes',
      'Academic excellence',
      'Real-time progress',
      'Collaboration',
      'Resource allocation',
      'Efficient',
      'User experience design',
      'Innovative solutions',
      'Empowerment',
      'Education',
      'Academic',
      'Learning outcomes',
      'Optimized teaching',
      'AI insights',
      'User-centric',
      'Efficient resource allocation',],
    image: '/spektrumThumbnail.png'
  },
},
  mqtizerWeb: {
    name: 'Mqtizer Website',
    description: 'MQTIZER: Cross-platform MQTT client for industry grade IoT Solutions.',
    hiddenDescription: `MQTIZER: Elevate your Industry 4.0 projects with our cutting-edge MQTT mobile client.
Seamlessly monitor real-time data, collaborate effortlessly, and simulate sensor values with the intuitive Sensor Keyboard.
Revolutionize your IoT journey with the ultimate MQTT solution!`,
    keyWords: [
      'MQTIZER',
      'Mobile MQTT client',
      'IoT connectivity',
      'Industry 4.0',
      'Real-time data monitoring',
      'Sensor Keyboard',
      'Collaborative workspaces',
      'User experience design',
      'Enhanced UI/UX',
      'User-centric design',
      'Intuitive interface',
      'Innovative solutions',
      'Seamless configuration',
      'User feedback incorporation',
      'Enhanced IoT experience',
    ],
    image: '/mqtizerWebsiteThumbnail.png',
    prototypeLink: 'https://www.mqtizer.com',
  },
  visionari: {
    name: 'Visionar.AI',
    description: 'Empowering Innovation with VisionarAI: Where Ideas Flourish and Future Unfolds.',
    hiddenDescription: `"At VisionarAI, we are the pioneers of a transformative journey where innovation takes center stage.
Our platform, VisionarAI, is the catalyst for visionary entrepreneurs, offering a comprehensive toolkit to nurture and elevate ideas into impactful realities.
With a powerful blend of AI-driven insights and user-centric design, we bring ideas to life while ensuring compliance with a changing landscape.
Dive into a realm where creativity thrives, guided by the pulse of market dynamics and the unwavering vision of entrepreneurs.`,
    keyWords: [
      'VisionarAI',
      'Innovation',
      'Empowerment',
      'Entrepreneurship',
      'Ideation',
      'AI-driven Insights',
      'User-Centric Design',
      'Ideas to Reality',
      'Compliance',
      'Creative Transformation',
      'Market Dynamics',
      'Visionaries',
      'Unleashing Potential',
      'Future Shaping',
      'Nurturing Ideas',
    ],
    image: '/visionarAiThumbnail.png',
    prototypeLink:
    'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FOEJMoWhUcHxO7yTrskLKT5%2FVisionarAI_Designs%3Ftype%3Ddesign%26node-id%3D348-12724%26t%3DeYxqN6aLN6z5Dlzk-1%26scaling%3Dscale-down%26page-id%3D1%253A2%26starting-point-node-id%3D348%253A12724%26mode%3Ddesign',
  },
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
  rollingAhead: {
    name: 'Rolling Ahead',
    description: `Rolling Ahead is an HMI dashboard designed specifically for the tire manufacturing industry. This dashboard is focused on providing an intuitive and user-friendly interface for operators, allowing them to easily monitor and control production processes.`,
    hiddenDescription: `Rolling Ahead is an HMI dashboard designed specifically for the tire manufacturing industry. This dashboard is focused on providing an intuitive and user-friendly interface for operators, allowing them to easily monitor and control production processes. Rolling Ahead integrates with the Manufacturing Execution System (MES) to provide real-time information on production progress, inventory, and quality control. it acts as a bridge between the shop floor and the manufacturing execution system (MES) by providing real-time data on production progress and performance, allowing for efficient monitoring and decision-making. It also allows shop floor engineers to easily monitor and troubleshoot the machine's performance, issues related to services and error logs.`,
    keyWords: [
      'Rolling Ahead',
      'Human Machine Interface (HMI) dashboard',
      'Industry 4.0',
      'Internet of Things (IoT)',
      'tire manufacturing',
      'Manufacturing Execution System (MES)',
      'production process',
      'real-time information',
      'inventory',
      'quality control',
      'shop floor',
      'production progress',
      'performance',
      'monitoring',
      'decision-making',
      'troubleshoot',
      'machine performance',
      'error logs',
      'user-friendly interface',
      'small screen size',
      'data prioritization',
      'intuitive navigation',
      'challenge',
      'limited space',
      'design',
      'testing',
      'tire industry',
    ],
    image: '/rollingAheadThumbnail.png',
    prototypeLink:
    'https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FHxm3IZE6FgHQNZmI09ufQz%2FHMI%3Fnode-id%3D41%253A9%26scaling%3Dcontain%26page-id%3D0%253A1%26starting-point-node-id%3D41%253A9',
  },
};

export const createPages = async ({ graphql, actions }: CreatePagesArgs): Promise<void> => {
  const { createPage } = actions;

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
  `);

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
  `);

  if (projectsResult.errors) {
    throw projectsResult.errors;
  }

  if (iconsResult.errors) {
    throw iconsResult.errors;
  }

  const groups = projectsResult.data?.allFile.group ?? [];
  const icons = iconsResult.data?.allFile.nodes ?? [];

  groups.forEach(group => {
    const name = group?.fieldValue?.split('/')[1] ?? '';
    const projectDetails = ProjectsLookup[name as keyof typeof ProjectsLookup] ?? {};
    const icon = icons.find(icon => icon.name === name);

    createPage({
      path: `/projects/${name}`,
      component: path.resolve('./src/templates/details.tsx'),
      context: {
        images: group.nodes,
        icon,
        ...projectDetails,
      },
    });
  });
};
