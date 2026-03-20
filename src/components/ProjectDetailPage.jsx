import { ArrowLeft } from 'lucide-react'
import ProjectIcon from './ProjectIcon'
import StackIcon from './StackIcon'

export default function ProjectDetailPage({
  project,
  projectNote,
  onBack,
  onOpenStack,
  onProjectNoteChange,
}) {
  if (!project) {
    return (
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-[#7b7076] bg-[#403d46] px-4 py-2 text-sm text-[#dfd3cd] transition hover:border-[#94868d] hover:bg-[#49454f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="mt-10 rounded-[28px] border border-[#595158] bg-[#403d46] p-8 text-[#ece6e1]">
          <h2 className="font-cinzel text-4xl font-semibold tracking-calm">
            Project not found
          </h2>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-full border border-[#7b7076] bg-[#403d46] px-4 py-2 text-sm text-[#dfd3cd] transition hover:border-[#94868d] hover:bg-[#49454f]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </button>

      <div className="mt-8 flex flex-col gap-5 border-b border-[#5d565c] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <ProjectIcon project={project} className="h-16 w-16" imageClassName="h-10 w-10" />
          <div className="min-w-0">
            <h1 className="font-cinzel text-4xl font-semibold tracking-calm text-[#f0e8e2] sm:text-5xl">
              {project.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stacks.map((stack) => (
            <button
              key={stack}
              type="button"
              onClick={() => onOpenStack(stack)}
              className="rounded-xl transition hover:opacity-90"
              aria-label={stack}
              title={stack}
            >
              <StackIcon label={stack} className="h-12 w-12" />
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#b7aaa4]">
            Dev Log
          </p>
        </div>

        <div className="mt-4 rounded-[26px] border border-[#655d64] bg-[#4a4750] p-4 sm:p-5">
          <textarea
            value={projectNote}
            onChange={(event) => onProjectNoteChange(project.id, event.target.value)}
            className="min-h-[440px] w-full resize-y border-0 bg-transparent text-[15px] leading-8 text-[#e6ddd7] outline-none placeholder:text-[#a79892]"
            placeholder="Add notes, history, or implementation details here..."
          />
        </div>
      </section>
    </div>
  )
}
