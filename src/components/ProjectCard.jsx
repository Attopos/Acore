import { ArrowUpRight } from 'lucide-react'
import ProjectIcon from './ProjectIcon'

export default function ProjectCard({
  project,
  onOpenStack,
  onOpenDetail,
  StackChip,
}) {
  return (
    <article className="flex flex-col self-stretch overflow-hidden rounded-[28px] border border-[#595158] bg-[#3a3740] shadow-[0_22px_54px_rgba(7,8,10,0.16)] transition duration-300 hover:-translate-y-1 hover:border-[#6a6068]">
      <div className="flex items-start justify-between gap-6 border-b border-[#cac0ba] bg-[#e3d8d1] px-6 pb-5 pt-6">
        <div className="min-w-0 flex-1 pr-2">
          <h2 className="font-cinzel text-[1.82rem] font-semibold tracking-[0.015em] text-[#282223]">
            {project.name}
          </h2>
        </div>
        <ProjectIcon project={project} className="h-12 w-12" imageClassName="h-7 w-7" />
      </div>

      <div className="flex flex-1 flex-col gap-6 bg-[#403d46] px-6 py-6">
        <div className="flex flex-wrap gap-2.5">
          {project.stacks.map((stack) => (
            <StackChip
              key={stack}
              label={stack}
              onClick={() => onOpenStack(stack)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => onOpenDetail(project)}
          className="mt-auto inline-flex w-full items-center justify-between rounded-2xl border border-[#6a3138] bg-[#6a3138] px-4 py-3 text-[14px] font-medium tracking-[0.08em] text-[#f1e8e3] transition hover:border-[#804048] hover:bg-[#804048]"
        >
          <span>Open Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
