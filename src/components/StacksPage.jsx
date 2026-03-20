import StackIcon from './StackIcon'

export default function StacksPage({ stacks, onOpenStack }) {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
      <header className="mb-12 border-b border-[#6a4247]/48 pb-8">
        <div className="max-w-3xl">
          <h1 className="font-cinzel text-5xl font-semibold tracking-calm text-[#f0e8e2] sm:text-6xl">
            Stacks
          </h1>
        </div>
      </header>

      <main className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stacks.map((stack) => (
          <button
            key={stack.name}
            type="button"
            onClick={() => onOpenStack(stack.name)}
            className="flex min-h-[168px] flex-col items-center justify-center gap-4 rounded-[28px] border border-[#595158] bg-[#e3d8d1] px-6 py-8 text-center shadow-[0_22px_54px_rgba(7,8,10,0.16)] transition duration-300 hover:-translate-y-1 hover:border-[#6a6068]"
          >
            <StackIcon label={stack.name} className="h-14 w-14" chrome />
            <div className="text-[#282223]">
              <h2 className="font-cinzel text-[1.85rem] font-semibold tracking-[0.015em]">
                {stack.name}
              </h2>
            </div>
          </button>
        ))}
      </main>
    </div>
  )
}
