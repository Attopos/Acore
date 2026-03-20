export const projects = [
  {
    id: 'portfolio-tracker',
    name: 'Portfolio Tracker',
    iconLabel: 'PT',
    stacks: ['React', 'Vite', 'Express', 'JavaScript', 'CSS', 'SQLite'],
    devLog: [
      'Reshaping the interface so portfolio views feel calmer and easier to scan.',
      'Clarifying how data moves between local storage, requests, and UI state.',
      'Watching for places where structure can be simplified before more features land.',
    ],
  },
  {
    id: 'ac-site',
    name: 'AC Site',
    iconLabel: 'AC',
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
  React: 'Interface layer and component structure.',
  Vite: 'Fast local build tooling and page iteration.',
  Express: 'Server routes and lightweight backend glue.',
  JavaScript: 'Primary implementation language across the app.',
  CSS: 'Surface refinement, layout rhythm, and visual control.',
  SQLite: 'Compact local data storage for the first system shape.',
  'Node.js': 'Runtime for local tooling and service logic.',
  PlatformIO: 'Embedded project orchestration and build workflow.',
  ESP32: 'Microcontroller target for experiments and device testing.',
  'C++': 'Firmware-level implementation for hardware behavior.',
  VSCode: 'Primary editing and embedded workflow environment.',
}
