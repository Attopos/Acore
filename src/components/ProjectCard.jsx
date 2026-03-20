import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({
  project,
  selected,
  onSelect,
  onOpenDetail,
  StackChip,
}) {
  const activeStack = selected?.projectId === project.id ? selected.stack : null

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#2a2a2a] bg-[#0f0f0f] shadow-[0_22px_54px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-6 border-b border-[#d8d8d8] bg-[#f3f3f3] px-6 pb-5 pt-6">
        <div className="min-w-0 flex-1 pr-2">
          <h2 className="font-cinzel text-[1.45rem] font-semibold tracking-[0.015em] text-[#111111]">
            {project.name}
          </h2>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#d6d6d6] bg-white text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
          {project.iconLabel}
        </div>
      </div>

      <div className="bg-[#111111] px-6 py-6">
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
          className="mt-6 inline-flex w-full items-center justify-between rounded-2xl border border-[#d81927] bg-[#d81927] px-4 py-3 text-sm font-medium tracking-[0.08em] text-[#f5f5f5] transition hover:bg-[#ef2433]"
        >
          <span>Open Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
