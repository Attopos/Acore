import portfolioIcon from '../assets/project-icons/portfolio-icon.svg'

const acoreIcon = '/acore-icon.png'

export const projects = [
  {
    id: 'portfolio-tracker',
    name: 'Portfolio Tracker',
    iconLabel: 'PT',
    iconSrc: portfolioIcon,
    stacks: ['React', 'Vite', 'Express', 'JavaScript', 'CSS', 'SQLite'],
    devLog: [
      'Reshaping the interface so portfolio views feel calmer and easier to scan.',
      'Clarifying how data moves between local storage, requests, and UI state.',
      'Watching for places where structure can be simplified before more features land.',
    ],
  },
  {
    id: 'acore',
    name: 'Acore',
    iconLabel: 'AC',
    iconSrc: acoreIcon,
    stacks: ['React', 'Vite', 'JavaScript', 'CSS'],
    devLog: [
      'Exploring homepage directions that feel more intentional and less like a generic portfolio.',
      'Testing visual language choices before locking the broader site system.',
      'Using this phase to establish tone, rhythm, and recognizability.',
    ],
  },
  {
    id: 'openclaw-console',
    name: 'OpenClaw Console',
    iconLabel: 'OC',
    stacks: ['React', 'Node.js', 'JavaScript'],
    devLog: [
      'Mapping how local tooling and infra touchpoints should surface in one place.',
      'Looking for a cleaner way to expose workflows without creating noise.',
      'Treating this as a working console concept rather than a feature-heavy product.',
    ],
  },
  {
    id: 'esp32-playground',
    name: 'ESP32 Playground',
    iconLabel: 'E32',
    stacks: ['PlatformIO', 'ESP32', 'C++', 'VSCode'],
    devLog: [
      'Stabilizing the development toolchain so device iteration becomes predictable.',
      'Using early experiments to confirm a reliable first hardware workflow.',
      'Capturing lessons that will make future embedded projects easier to start.',
    ],
  },
]

export const stackNotes = {
  React: {
    summary: 'Interface layer and component structure.',
    usages: ['Front-end'],
  },
  Vite: {
    summary: 'Fast local build tooling and page iteration.',
    usages: ['Build', 'Tooling'],
  },
  Express: {
    summary: 'Server routes and lightweight backend glue.',
    usages: ['Back-end', 'API'],
  },
  JavaScript: {
    summary: 'Primary implementation language across the app.',
    usages: ['Language', 'Front-end', 'Back-end'],
  },
  CSS: {
    summary: 'Surface refinement, layout rhythm, and visual control.',
    usages: ['Front-end', 'Styling'],
  },
  SQLite: {
    summary: 'Compact local data storage for the first system shape.',
    usages: ['Database', 'Storage'],
  },
  'Node.js': {
    summary: 'Runtime for local tooling and service logic.',
    usages: ['Back-end', 'Runtime', 'Tooling'],
  },
  PlatformIO: {
    summary: 'Embedded project orchestration and build workflow.',
    usages: ['Embedded', 'Build', 'Tooling'],
  },
  ESP32: {
    summary: 'Microcontroller target for experiments and device testing.',
    usages: ['Embedded', 'Hardware'],
  },
  'C++': {
    summary: 'Firmware-level implementation for hardware behavior.',
    usages: ['Language', 'Embedded'],
  },
  VSCode: {
    summary: 'Primary editing and embedded workflow environment.',
    usages: ['Tooling', 'Editor'],
  },
}
