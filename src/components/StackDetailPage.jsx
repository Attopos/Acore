import { ArrowLeft } from 'lucide-react'
import ProjectIcon from './ProjectIcon'
import StackIcon from './StackIcon'

export default function StackDetailPage({
  stack,
  stackNote,
  relatedProjects,
  onBack,
  onOpenProject,
  onStackNoteChange,
}) {
  if (!stack) {
    return (
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-[#7b7076] bg-[#403d46] px-4 py-2 text-[14px] text-[#dfd3cd] transition hover:border-[#94868d] hover:bg-[#49454f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="mt-10 rounded-[28px] border border-[#595158] bg-[#403d46] p-8 text-[#ece6e1]">
          <h2 className="font-cinzel text-4xl font-semibold tracking-calm">
            Stack not found
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
        className="inline-flex items-center gap-2 rounded-full border border-[#7b7076] bg-[#403d46] px-4 py-2 text-[14px] text-[#dfd3cd] transition hover:border-[#94868d] hover:bg-[#49454f]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </button>

      <div className="mt-8 flex flex-col gap-5 border-b border-[#5d565c] pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#b3a8a2] bg-[#ddd3cc] shadow-[inset_0_1px_0_rgba(255,255,255,0.42)]">
            <StackIcon label={stack} className="h-9 w-9" chrome={false} />
          </div>
          <div className="min-w-0">
            <h1 className="font-cinzel text-4xl font-semibold tracking-calm text-[#f0e8e2] sm:text-5xl">
              {stack}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {relatedProjects.length > 0 ? (
            relatedProjects.slice(0, 3).map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => onOpenProject(project)}
                className="rounded-2xl transition hover:opacity-90"
                aria-label={project.name}
                title={project.name}
              >
                <ProjectIcon
                  project={project}
                  className="h-12 w-12"
                  imageClassName="h-7 w-7"
                />
              </button>
            ))
          ) : (
            <StackIcon label={stack} className="h-12 w-12" />
          )}
        </div>
      </div>

      <section className="mt-6">
        <div>
          <p className="text-[16px] uppercase tracking-[0.23em] text-[#b7aaa4]">
            Stack Notes
          </p>
        </div>

        <div className="mt-4 rounded-[26px] border border-[#655d64] bg-[#4a4750] p-4 sm:p-5">
          <textarea
            value={stackNote}
            onChange={(event) => onStackNoteChange(stack, event.target.value)}
            ref={(element) => {
              if (!element) {
                return
              }

              element.style.height = '0px'
              element.style.height = `${Math.max(element.scrollHeight, 180)}px`
            }}
            onInput={(event) => {
              event.currentTarget.style.height = '0px'
              event.currentTarget.style.height = `${Math.max(
                event.currentTarget.scrollHeight,
                180,
              )}px`
            }}
            className="min-h-0 w-full resize-none overflow-hidden border-0 bg-transparent text-[16px] leading-8 text-[#e6ddd7] outline-none placeholder:text-[#a79892]"
            placeholder="Add notes here..."
          />
        </div>
      </section>
    </div>
  )
}
