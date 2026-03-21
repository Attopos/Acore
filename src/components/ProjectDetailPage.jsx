import { ArrowLeft, Plus, X } from 'lucide-react'
import ProjectIcon from './ProjectIcon'
import StackIcon from './StackIcon'

const PRIORITY_OPTIONS = [
  {
    value: 'high',
    label: 'High',
    accentClassName: 'border-[#b9878b] text-[#e7c4c7]',
    selectClassName: 'border-[#6f4f53] bg-[#4a3438] text-[#ddd1ca]',
  },
  {
    value: 'medium',
    label: 'Medium',
    accentClassName: 'border-[#8f8375] text-[#d9c5ae]',
    selectClassName: 'border-[#685f54] bg-[#433b34] text-[#ddd1ca]',
  },
  {
    value: 'low',
    label: 'Low',
    accentClassName: 'border-[#6f7f88] text-[#c6d3db]',
    selectClassName: 'border-[#53626a] bg-[#313f47] text-[#ddd1ca]',
  },
]

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createEmptyTask() {
  return {
    id: createId('task'),
    text: '',
    priority: 'medium',
    done: false,
  }
}

function createLogEntry(summary = '', context = '', timestamp = new Date().toISOString()) {
  return {
    id: createId('log'),
    summary,
    timestamp,
  }
}

function createInitialLogEntries(project) {
  return []
}

function normalizeTask(task) {
  return {
    id: typeof task?.id === 'string' && task.id ? task.id : createId('task'),
    text: typeof task?.text === 'string' ? task.text : '',
    priority: PRIORITY_OPTIONS.some((option) => option.value === task?.priority)
      ? task.priority
      : 'medium',
    done: Boolean(task?.done),
  }
}

function normalizeLogEntry(entry) {
  return {
    id: typeof entry?.id === 'string' && entry.id ? entry.id : createId('log'),
    summary: typeof entry?.summary === 'string' ? entry.summary : '',
    timestamp:
      typeof entry?.timestamp === 'string' && entry.timestamp
        ? entry.timestamp
        : new Date().toISOString(),
  }
}

function deserializeProjectWorkspace(rawValue, project) {
  const fallbackWorkspace = {
    next: [createEmptyTask()],
    structure: typeof rawValue === 'string' ? rawValue : '',
    log: createInitialLogEntries(project),
  }

  if (!rawValue) {
    return fallbackWorkspace
  }

  if (typeof rawValue !== 'string') {
    return fallbackWorkspace
  }

  try {
    const parsedValue = JSON.parse(rawValue)
    if (!parsedValue || typeof parsedValue !== 'object') {
      return fallbackWorkspace
    }

    return {
      next:
        Array.isArray(parsedValue.next) && parsedValue.next.length > 0
          ? parsedValue.next.map(normalizeTask)
          : fallbackWorkspace.next,
      structure:
        typeof parsedValue.structure === 'string'
          ? parsedValue.structure
          : fallbackWorkspace.structure,
      log:
        Array.isArray(parsedValue.log) && parsedValue.log.length > 0
          ? parsedValue.log.map(normalizeLogEntry)
          : fallbackWorkspace.log,
    }
  } catch {
    return fallbackWorkspace
  }
}

function serializeProjectWorkspace(workspace) {
  return JSON.stringify({
    next: workspace.next.map(normalizeTask),
    structure: workspace.structure,
    log: workspace.log.map(normalizeLogEntry),
  })
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return 'No timestamp'
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

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

  const workspace = deserializeProjectWorkspace(projectNote, project)
  const updateWorkspace = (nextWorkspace) => {
    onProjectNoteChange(project.id, serializeProjectWorkspace(nextWorkspace))
  }
  const completedCount = workspace.next.filter((task) => task.done).length

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

      <div className="mt-8 space-y-10">
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <p className="text-[16px] uppercase tracking-[0.23em] text-[#b7aaa4]">
              Next
            </p>

            <button
              type="button"
              onClick={() =>
                updateWorkspace({
                  ...workspace,
                  next: [...workspace.next, createEmptyTask()],
                })
              }
              className="inline-flex items-center gap-2 rounded-full border border-[#655d64] px-3 py-1.5 text-[14px] text-[#ded2cb] transition hover:border-[#867a81] hover:bg-[#403c45]"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>

          <div className="space-y-2">
            {workspace.next.map((task) => {
              const priorityOption =
                PRIORITY_OPTIONS.find((option) => option.value === task.priority) ??
                PRIORITY_OPTIONS[1]

              return (
                <div
                  key={task.id}
                  className={`grid gap-3 border-l pl-4 sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:items-center ${priorityOption.accentClassName}`}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(event) =>
                      updateWorkspace({
                        ...workspace,
                        next: workspace.next.map((entry) =>
                          entry.id === task.id
                            ? { ...entry, done: event.target.checked }
                            : entry,
                        ),
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-[#7a6f76] bg-transparent accent-[#b8aba4] sm:mt-0"
                    aria-label={`Mark ${task.text || 'task'} as complete`}
                  />

                  <input
                    type="text"
                    value={task.text}
                    onChange={(event) =>
                      updateWorkspace({
                        ...workspace,
                        next: workspace.next.map((entry) =>
                          entry.id === task.id
                            ? { ...entry, text: event.target.value }
                            : entry,
                        ),
                      })
                    }
                    className={`w-full border-0 bg-transparent px-0 text-[16px] outline-none placeholder:text-[#7c7276] ${
                      task.done ? 'text-[#968b86] line-through' : 'text-[#ece6e1]'
                    }`}
                    placeholder="Define the next concrete step..."
                  />

                  <label className="sr-only" htmlFor={`priority-${task.id}`}>
                    Priority
                  </label>
                  <select
                    id={`priority-${task.id}`}
                    value={task.priority}
                    onChange={(event) =>
                      updateWorkspace({
                        ...workspace,
                        next: workspace.next.map((entry) =>
                          entry.id === task.id
                            ? { ...entry, priority: event.target.value }
                            : entry,
                        ),
                      })
                    }
                    className={`rounded-full px-2.5 py-1.5 text-[13px] uppercase tracking-[0.18em] outline-none transition hover:brightness-110 ${priorityOption.selectClassName}`}
                  >
                    {PRIORITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() =>
                      updateWorkspace({
                        ...workspace,
                        next:
                          workspace.next.length > 1
                            ? workspace.next.filter((entry) => entry.id !== task.id)
                            : [createEmptyTask()],
                      })
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8f8488] transition hover:bg-[#403c45] hover:text-[#d9cdc6]"
                    aria-label="Remove task"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        <section className="border-t border-[#4c474e] pt-5">
          <div>
            <p className="text-[16px] uppercase tracking-[0.23em] text-[#b7aaa4]">
              Structure
            </p>
          </div>

          <textarea
            value={workspace.structure}
            onChange={(event) =>
              updateWorkspace({
                ...workspace,
                structure: event.target.value,
              })
            }
            ref={(element) => {
              if (!element) {
                return
              }

              element.style.height = '0px'
              element.style.height = `${element.scrollHeight}px`
            }}
            onInput={(event) => {
              event.currentTarget.style.height = '0px'
              event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
            }}
            className="mt-4 min-h-[120px] w-full resize-none overflow-hidden border-0 bg-transparent p-0 text-[16px] leading-8 text-[#e6ddd7] outline-none placeholder:text-[#7f7478]"
            placeholder="Routes, components, data flow, open questions..."
          />
        </section>
      </div>

      <section className="mt-10 border-t border-[#4f4a51] pt-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[16px] uppercase tracking-[0.23em] text-[#b7aaa4]">
              Log
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              updateWorkspace({
                ...workspace,
                log: [createLogEntry(), ...workspace.log],
              })
            }
            className="inline-flex items-center gap-2 rounded-full border border-[#655d64] px-3 py-1.5 text-[14px] text-[#ded2cb] transition hover:border-[#867a81] hover:bg-[#403c45]"
          >
            <Plus className="h-4 w-4" />
            Add Log
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {workspace.log.length > 0 ? (
            workspace.log.map((entry) => (
              <div
                key={entry.id}
                className="grid gap-3 border-l border-[#625b62] pl-4 sm:grid-cols-[15rem_minmax(0,1fr)_auto]"
              >
                <div className="whitespace-nowrap pt-1 text-[13px] uppercase tracking-[0.16em] text-[#9d9295]">
                  {formatTimestamp(entry.timestamp)}
                </div>

                <div className="space-y-2">
                  <textarea
                    value={entry.summary}
                    onChange={(event) =>
                      updateWorkspace({
                        ...workspace,
                        log: workspace.log.map((item) =>
                          item.id === entry.id
                            ? { ...item, summary: event.target.value }
                            : item,
                        ),
                      })
                    }
                    ref={(element) => {
                      if (!element) {
                        return
                      }

                      element.style.height = '0px'
                      element.style.height = `${element.scrollHeight}px`
                    }}
                    onInput={(event) => {
                      event.currentTarget.style.height = '0px'
                      event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`
                    }}
                    rows={1}
                    className="min-h-0 w-full resize-none overflow-hidden border-0 bg-transparent p-0 text-[16px] leading-8 text-[#ece6e1] outline-none placeholder:text-[#7c7276]"
                    placeholder="What changed?"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateWorkspace({
                      ...workspace,
                      log: workspace.log.filter((item) => item.id !== entry.id),
                    })
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#8f8488] transition hover:bg-[#403c45] hover:text-[#d9cdc6]"
                  aria-label="Remove log entry"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="border-l border-[#625b62] pl-4 text-sm text-[#9f9398]">
              No log entries yet.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
