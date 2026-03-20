import { useEffect, useState } from 'react'
import { ArrowUpRight, FolderKanban, X } from 'lucide-react'
import { projects, stackNotes } from './data/projects'

function Header() {
  return (
    <header className="mb-12 border-b border-[#FDAC16]/25 pb-8">
      <div className="max-w-3xl">
        <h1 className="font-cinzel text-4xl font-semibold tracking-calm text-[#FDAC16] sm:text-5xl">
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
        onClick(label)
      }}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium tracking-[0.04em] transition ${
        inverted
          ? isActive
            ? 'border-[#14124B] bg-[#14124B] text-[#FDAC16]'
            : 'border-[#14124B]/20 bg-[#14124B]/8 text-[#14124B] hover:border-[#14124B]/35 hover:bg-[#14124B]/12'
          : isActive
            ? 'border-[#FDAC16] bg-[#FDAC16] text-[#14124B]'
            : 'border-[#FDAC16]/18 bg-[#FDAC16]/8 text-[#FDAC16] hover:border-[#FDAC16]/30 hover:bg-[#FDAC16]/12'
      }`}
      aria-pressed={isActive}
    >
      <span
        className={`h-2.5 w-2.5 rounded-sm ${
          inverted
            ? isActive
              ? 'bg-[#FDAC16]'
              : 'bg-[#14124B]/70'
            : isActive
              ? 'bg-[#14124B]'
              : 'bg-[#FDAC16]/80'
        }`}
      />
      <span>{label}</span>
    </button>
  )
}

function ProjectCard({ project, selected, onSelect, onOpenDetail }) {
  const activeStack = selected?.projectId === project.id ? selected.stack : null

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#FDAC16]/18 bg-[#FDAC16] shadow-[0_22px_54px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4 px-6 pb-6 pt-6">
        <h2 className="font-cinzel text-[1.45rem] font-semibold tracking-[0.015em] text-[#14124B]">
          {project.name}
        </h2>
        <FolderKanban className="mt-1 h-5 w-5 shrink-0 text-[#14124B]/65" />
      </div>

      <div className="border-t border-[#14124B]/10 bg-[#14124B] px-6 py-6">
        <div className="flex flex-wrap gap-2.5">
          {project.stacks.map((stack) => (
            <StackChip
              key={stack}
              label={stack}
              isActive={activeStack === stack}
              onClick={() => onSelect(project.id, stack)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenDetail(project)}
          className="mt-6 inline-flex w-full items-center justify-between rounded-2xl border border-[#FDAC16] bg-[#FDAC16] px-4 py-3 text-sm font-medium tracking-[0.08em] text-[#14124B] transition hover:bg-[#f2a000]"
        >
          <span>Open Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090722]/58 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-[30px] border border-[#FDAC16]/18 bg-[#FDAC16] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.36)] sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#14124B]/65">
              Project Page
            </p>
            <h3 className="font-cinzel mt-3 text-3xl font-semibold tracking-calm text-[#14124B]">
              {project.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#14124B]/14 bg-[#14124B]/6 p-2 text-[#14124B] transition hover:border-[#14124B]/24 hover:bg-[#14124B]/10"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <section className="mt-8 rounded-[26px] border border-[#14124B]/14 bg-[#14124B]/6 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#14124B]/62">
              Stack
            </p>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#14124B]/55">
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

          <div className="mt-4 rounded-2xl border border-[#14124B]/12 bg-[#FDAC16]/38 px-4 py-4 text-sm leading-7 text-[#14124B]/88">
            <span className="font-semibold text-[#14124B]">{selectedStack}</span>
            {' · '}
            {stackNotes[selectedStack]}
          </div>
        </section>

        <section className="mt-6 rounded-[26px] border border-[#14124B]/14 bg-[#14124B] p-5 text-[#FDAC16]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#FDAC16]/68">
              Dev Log
            </p>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#FDAC16]/52">
              Notes & history
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {project.devLog.map((entry) => (
              <div
                key={entry}
                className="rounded-2xl border border-[#FDAC16]/12 bg-[#FDAC16]/6 px-4 py-4 text-sm leading-7 text-[#FDAC16]/88"
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
    <div className="min-h-screen bg-[#14124B] text-[#FDAC16]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <Header />

        <main className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={selectedStack}
              onSelect={handleSelectStack}
              onOpenDetail={setActiveProject}
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
