import { useState } from 'react'
import StackIcon from './StackIcon'

export default function StacksPage({ stacks, onOpenStack }) {
  const stacksByCategory = stacks.reduce((groups, stack) => {
    const categories = stack.usages?.length ? stack.usages : ['Uncategorized']

    categories.forEach((category) => {
      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(stack)
    })

    return groups
  }, {})

  const orderedCategories = Object.keys(stacksByCategory).sort((left, right) =>
    left.localeCompare(right),
  )
  const [activeCategory, setActiveCategory] = useState('All')
  const visibleCategories =
    activeCategory === 'All' ? orderedCategories : orderedCategories.filter((category) => category === activeCategory)

  return (
    <div className="relative pb-16 pt-10 sm:pt-14 lg:pt-20">
      <aside className="mb-8 px-6 sm:px-8 lg:px-12 xl:mb-0 xl:px-0">
        <div className="flex flex-wrap gap-2.5 xl:fixed xl:right-24 xl:top-[16.5rem] xl:z-10 xl:w-24 xl:flex-col xl:items-stretch">
          {['All', ...orderedCategories].map((category) => {
            const isActive = activeCategory === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-2.5 py-1.5 text-[13px] transition xl:text-left ${
                  isActive
                    ? 'border-[#8d8186] bg-[#4a4450] text-[#f0e8e2]'
                    : 'border-[#635c63] text-[#bfb2ac] hover:border-[#7a7077] hover:bg-[#403c45] hover:text-[#ece6e1]'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </aside>

      <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <header className="mb-12 border-b border-[#6a4247]/48 pb-8">
          <div className="max-w-3xl">
            <h1 className="font-cinzel text-5xl font-semibold tracking-calm text-[#f0e8e2] sm:text-6xl">
              Stacks
            </h1>
          </div>
        </header>

        <main className="space-y-9">
          {visibleCategories.map((category) => (
            <section key={category}>
              <div className="mb-4">
                <h2 className="text-[16px] uppercase tracking-[0.23em] text-[#b7aaa4]">
                  {category}
                </h2>
              </div>

              <div className="grid items-stretch gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {stacksByCategory[category].map((stack) => (
                  <button
                    key={`${category}-${stack.name}`}
                    type="button"
                    onClick={() => onOpenStack(stack.name)}
                    className="flex min-h-[136px] flex-col items-center justify-center gap-3 rounded-[24px] border border-[#595158] bg-[#e3d8d1] px-4 py-5 text-center shadow-[0_18px_40px_rgba(7,8,10,0.14)] transition duration-300 hover:-translate-y-1 hover:border-[#6a6068]"
                  >
                    <StackIcon label={stack.name} className="h-12 w-12" chrome />
                    <div className="text-[#282223]">
                      <h3 className="font-cinzel text-[1.65rem] font-semibold tracking-[0.015em]">
                        {stack.name}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
