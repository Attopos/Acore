import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { projects, stackNotes } from './data/projects'
import ProjectCard from './components/ProjectCard'

function Header() {
  return (
    <header className="mb-12 border-b border-[#d81927]/25 pb-8">
      <div className="max-w-3xl">
        <h1 className="font-cinzel text-4xl font-semibold tracking-calm text-[#f5f5f5] sm:text-5xl">
          Project Stacks
        </h1>
      </div>
    </header>
  )
}

function StackChip({ label, isActive, onClick, inverted = false }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium tracking-[0.04em] transition ${
        inverted
          ? 'border-[#2f2f2f] bg-[#111111] text-[#d0d0d0] hover:border-[#4b4b4b] hover:bg-[#181818]'
          : 'border-[#3a3a3a] bg-[#1a1a1a] text-[#e5e5e5] hover:border-[#575757] hover:bg-[#232323]'
      }`}
      aria-pressed={isActive}
    >
      <span className="h-2.5 w-2.5 rounded-sm bg-[#a0a0a0]" />
      <span>{label}</span>
    </button>
  )
}

function ProjectDetailModal({ project, activeStack, onSelectStack, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) {
    return null
  }

  const selectedStack = activeStack ?? project.stacks[0]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/64 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-[30px] border border-[#2e2e2e] bg-[#f3f3f3] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a4a4a]">
              Project Page
            </p>
            <h3 className="font-cinzel mt-3 text-3xl font-semibold tracking-calm text-[#121212]">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#121212]/14 bg-[#121212]/6 p-2 text-[#121212] transition hover:border-[#121212]/24 hover:bg-[#121212]/10"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <section className="mt-8 rounded-[26px] border border-[#2a2a2a] bg-[#ebebeb] p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#4a4a4a]">
              Stack
            </p>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#666666]">
              {project.stacks.length} items
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {project.stacks.map((stack) => (
              <StackChip
                key={stack}
                label={stack}
                isActive={selectedStack === stack}
                onClick={() => onSelectStack(project.id, stack)}
                inverted
              />
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[#d5d5d5] bg-white px-4 py-4 text-sm leading-7 text-[#242424]">
            <span className="font-semibold text-[#d81927]">{selectedStack}</span>
            {' · '}
            {stackNotes[selectedStack]}
          </div>
        </section>

        <section className="mt-6 rounded-[26px] border border-[#1f1f1f] bg-[#121212] p-5 text-[#f5f5f5]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#b0b0b0]">
              Dev Log
            </p>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#8d8d8d]">
              Notes & history
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {project.devLog.map((entry) => (
              <div
                key={entry}
                className="rounded-2xl border border-[#2c2c2c] bg-[#1a1a1a] px-4 py-4 text-sm leading-7 text-[#e8e8e8]"
              >
                {entry}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function App() {
  const [selectedStack, setSelectedStack] = useState({
    projectId: projects[0].id,
    stack: projects[0].stacks[0],
  })
  const [activeProject, setActiveProject] = useState(null)

  const handleSelectStack = (projectId, stack) => {
    setSelectedStack({ projectId, stack })
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5]">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <Header />

        <main className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={selectedStack}
              onSelect={handleSelectStack}
              onOpenDetail={setActiveProject}
              StackChip={StackChip}
            />
          ))}
        </main>
      </div>

      <ProjectDetailModal
        project={activeProject}
        activeStack={
          activeProject?.id === selectedStack.projectId ? selectedStack.stack : null
        }
        onSelectStack={handleSelectStack}
        onClose={() => setActiveProject(null)}
      />
    </div>
  )
}
