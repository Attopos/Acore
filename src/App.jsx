import { useEffect, useRef, useState } from 'react'
import { projects, stackNotes } from './data/projects'
import ProjectCard from './components/ProjectCard'
import ProjectDetailPage from './components/ProjectDetailPage'
import StackDetailPage from './components/StackDetailPage'
import StackIcon from './components/StackIcon'
import StacksPage from './components/StacksPage'
import { fetchNotes, saveNote } from './lib/notesApi'
import { isSupabaseConfigured, supabase } from './lib/supabase'

const PROJECT_NOTES_STORAGE_KEY = 'acore:project-notes'
const STACK_NOTES_STORAGE_KEY = 'acore:stack-notes'

function Header() {
  return (
    <header className="mb-12 border-b border-[#6a4247]/48 pb-8">
      <div className="max-w-3xl">
        <h1 className="font-cinzel text-5xl font-semibold tracking-calm text-[#f0e8e2] sm:text-6xl">
          Projects
        </h1>
      </div>
    </header>
  )
}

function AppShell({
  isProjectsActive,
  isStacksActive,
  isSignedIn,
  avatarUrl,
  userLabel,
  onNavigateToProjects,
  onNavigateToStacks,
  onSignIn,
  onSignOut,
  children,
}) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isAccountMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsAccountMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsAccountMenuOpen(false)
      }
    }

    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isAccountMenuOpen])

  return (
    <div className="min-h-screen bg-[#2d2b33] text-[#ece6e1]">
      <div className="fixed inset-x-0 top-0 z-50 border-b border-[#5d565c] bg-[#35323a]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-5">
            <img
              src="/acore-icon.png"
              alt="Acore"
              className="h-11 w-11 object-contain"
            />

            <button
              type="button"
              onClick={onNavigateToProjects}
              className={`rounded-full px-4 py-2 text-[14px] transition ${
                isProjectsActive
                  ? 'bg-[#4a4450] text-[#f0e8e2]'
                  : 'text-[#cbbeb8] hover:bg-[#403d46] hover:text-[#f0e8e2]'
              }`}
              aria-current={isProjectsActive ? 'page' : undefined}
            >
              Projects
            </button>

            <button
              type="button"
              onClick={onNavigateToStacks}
              className={`rounded-full px-4 py-2 text-[14px] transition ${
                isStacksActive
                  ? 'bg-[#4a4450] text-[#f0e8e2]'
                  : 'text-[#cbbeb8] hover:bg-[#403d46] hover:text-[#f0e8e2]'
              }`}
              aria-current={isStacksActive ? 'page' : undefined}
            >
              Stacks
            </button>
          </div>

          {isSignedIn ? (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAccountMenuOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#7b7076] bg-[#403d46] text-[14px] text-[#dfd3cd] transition hover:border-[#94868d] hover:bg-[#49454f]"
                aria-label={`${userLabel} account menu`}
                aria-expanded={isAccountMenuOpen}
                aria-haspopup="menu"
                title={userLabel}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={userLabel}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-base font-medium uppercase">
                    {userLabel.charAt(0)}
                  </span>
                )}
              </button>

              {isAccountMenuOpen ? (
                <div
                  className="absolute right-0 top-[calc(100%+0.75rem)] min-w-[9rem] rounded-2xl border border-[#6d646b] bg-[#3a3640]/98 p-2 shadow-[0_20px_45px_rgba(0,0,0,0.28)] backdrop-blur"
                  role="menu"
                  aria-label="Account actions"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsAccountMenuOpen(false)
                      onSignOut()
                    }}
                    className="flex w-full items-center justify-start rounded-xl px-3 py-2 text-[14px] text-[#ece6e1] transition hover:bg-[#4a4450]"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="inline-flex items-center justify-center rounded-full border border-[#7b7076] bg-[#403d46] px-4 py-2 text-[14px] text-[#dfd3cd] transition hover:border-[#94868d] hover:bg-[#49454f]"
            >
              Sign in with GitHub
            </button>
          )}
        </div>
      </div>

      <div className="pt-20 sm:pt-24">{children}</div>
    </div>
  )
}

function StackChip({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#b3a8a2] bg-[#ddd3cc] shadow-[inset_0_1px_0_rgba(255,255,255,0.42)] transition hover:border-[#c0b5af] hover:bg-[#e5dbd4]"
      aria-label={label}
      title={label}
    >
      <StackIcon label={label} className="h-6 w-6" chrome={false} />
    </button>
  )
}

function getRoute(pathname) {
  if (pathname === '/stacks') {
    return {
      type: 'stacks',
      slug: null,
    }
  }

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
  if (projectMatch) {
    return {
      type: 'project',
      slug: decodeURIComponent(projectMatch[1]),
    }
  }

  const stackMatch = pathname.match(/^\/stacks\/([^/]+)$/)
  if (stackMatch) {
    return {
      type: 'stack',
      slug: decodeURIComponent(stackMatch[1]),
    }
  }

  return {
    type: 'home',
    slug: null,
  }
}

export default function App() {
  const [pathname, setPathname] = useState(window.location.pathname)
  const [session, setSession] = useState(null)
  const [, setAuthStatus] = useState(
    isSupabaseConfigured
      ? 'Checking GitHub sign-in...'
      : 'Supabase is not configured yet.',
  )
  const [projectNotes, setProjectNotes] = useState(() => {
    try {
      const savedNotes = window.localStorage.getItem(PROJECT_NOTES_STORAGE_KEY)
      return savedNotes ? JSON.parse(savedNotes) : {}
    } catch {
      return {}
    }
  })
  const [stackPageNotes, setStackPageNotes] = useState(() => {
    try {
      const savedNotes = window.localStorage.getItem(STACK_NOTES_STORAGE_KEY)
      return savedNotes ? JSON.parse(savedNotes) : {}
    } catch {
      return {}
    }
  })
  const [, setNotesStatus] = useState(
    isSupabaseConfigured
      ? 'Sign in with GitHub to sync your private notes.'
      : 'Using local browser storage only.',
  )
  const saveTimersRef = useRef({})
  const hasLoadedRemoteNotesRef = useRef(false)
  const userId = session?.user?.id ?? null
  const userLabel =
    session?.user?.user_metadata?.user_name ??
    session?.user?.user_metadata?.preferred_username ??
    session?.user?.email ??
    'your account'
  const avatarUrl =
    session?.user?.user_metadata?.avatar_url ??
    session?.user?.user_metadata?.picture ??
    null

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      return undefined
    }

    let isMounted = true

    const syncSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      if (error) {
        console.error('Failed to restore Supabase session.', error)
        setAuthStatus('GitHub sign-in is unavailable right now.')
        return
      }

      const nextSession = data.session ?? null
      setSession(nextSession)
      setAuthStatus(
        nextSession
          ? `Signed in as ${nextSession.user.user_metadata?.user_name ?? nextSession.user.email ?? 'your account'}.`
          : 'Not signed in. Your notes stay private once you connect GitHub.',
      )
    }

    syncSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setAuthStatus(
        nextSession
          ? `Signed in as ${nextSession.user.user_metadata?.user_name ?? nextSession.user.email ?? 'your account'}.`
          : 'Not signed in. Your notes stay private once you connect GitHub.',
      )
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let isCancelled = false

    const loadRemoteNotes = async () => {
      if (!isSupabaseConfigured) {
        hasLoadedRemoteNotesRef.current = true
        return
      }

      if (!userId) {
        hasLoadedRemoteNotesRef.current = true
        setNotesStatus('Sign in with GitHub to load and save your private notes.')
        return
      }

      try {
        setNotesStatus('Syncing your private notes from Supabase...')
        const [remoteProjectNotes, remoteStackNotes] = await Promise.all([
          fetchNotes(
            'project',
            projects.map((project) => project.id),
            userId,
          ),
          fetchNotes('stack', Object.keys(stackNotes), userId),
        ])

        if (isCancelled) {
          return
        }

        setProjectNotes((currentNotes) => ({
          ...currentNotes,
          ...remoteProjectNotes,
        }))
        setStackPageNotes((currentNotes) => ({
          ...currentNotes,
          ...remoteStackNotes,
        }))
        setNotesStatus(`Private notes are synced for ${userLabel}.`)
      } catch (error) {
        console.error('Failed to load notes from Supabase.', error)
        if (!isCancelled) {
          setNotesStatus('Supabase sync unavailable, using local browser storage.')
        }
      } finally {
        hasLoadedRemoteNotesRef.current = true
      }
    }

    loadRemoteNotes()

    return () => {
      isCancelled = true
    }
  }, [userId, userLabel])

  useEffect(() => {
    return () => {
      Object.values(saveTimersRef.current).forEach((timerId) => {
        window.clearTimeout(timerId)
      })
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      PROJECT_NOTES_STORAGE_KEY,
      JSON.stringify(projectNotes),
    )
  }, [projectNotes])

  useEffect(() => {
    window.localStorage.setItem(
      STACK_NOTES_STORAGE_KEY,
      JSON.stringify(stackPageNotes),
    )
  }, [stackPageNotes])

  const navigateTo = (nextPath) => {
    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }

  const handleOpenProject = (project) => {
    navigateTo(`/projects/${project.id}`)
  }

  const handleOpenStack = (stack) => {
    navigateTo(`/stacks/${encodeURIComponent(stack)}`)
  }

  const handleOpenStacksPage = () => {
    navigateTo('/stacks')
  }

  const handleBackToProjects = () => {
    navigateTo('/')
  }

  const handleSignIn = async () => {
    if (!supabase) {
      return
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}${window.location.pathname}`,
      },
    })

    if (error) {
      console.error('Failed to start GitHub sign-in.', error)
      setAuthStatus('GitHub sign-in could not start.')
    }
  }

  const handleSignOut = async () => {
    if (!supabase) {
      return
    }

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Failed to sign out from Supabase.', error)
      setAuthStatus('Sign-out failed. Please try again.')
    } else {
      setNotesStatus('Signed out. Local browser notes remain available on this device.')
    }
  }

  const queueNoteSave = (noteType, noteKey, value) => {
    if (!isSupabaseConfigured || !hasLoadedRemoteNotesRef.current || !userId) {
      return
    }

    const timerKey = `${noteType}:${noteKey}`

    if (saveTimersRef.current[timerKey]) {
      window.clearTimeout(saveTimersRef.current[timerKey])
    }

    saveTimersRef.current[timerKey] = window.setTimeout(async () => {
      try {
        setNotesStatus('Saving to Supabase...')
        await saveNote(noteType, noteKey, value, userId)
        setNotesStatus(`Private notes are synced for ${userLabel}.`)
      } catch (error) {
        console.error('Failed to save note to Supabase.', error)
        setNotesStatus('Supabase save failed, note is still stored locally in this browser.')
      } finally {
        delete saveTimersRef.current[timerKey]
      }
    }, 500)
  }

  const handleProjectNoteChange = (projectId, value) => {
    setProjectNotes((currentNotes) => ({
      ...currentNotes,
      [projectId]: value,
    }))
    queueNoteSave('project', projectId, value)
  }

  const handleStackNoteChange = (stackName, value) => {
    setStackPageNotes((currentNotes) => ({
      ...currentNotes,
      [stackName]: value,
    }))
    queueNoteSave('stack', stackName, value)
  }

  const route = getRoute(pathname)
  const stackEntries = Object.entries(stackNotes)
    .map(([name, details]) => ({
      name,
      summary: details.summary,
      usages: details.usages ?? [],
      projectCount: projects.filter((project) => project.stacks.includes(name)).length,
    }))
    .sort((left, right) => left.name.localeCompare(right.name))

  if (route.type === 'project') {
    const activeProject =
      projects.find((project) => project.id === route.slug) ?? null

    return (
      <AppShell
        isProjectsActive={false}
        isStacksActive={false}
        isSignedIn={Boolean(userId)}
        avatarUrl={avatarUrl}
        userLabel={userLabel}
        onNavigateToProjects={handleBackToProjects}
        onNavigateToStacks={handleOpenStacksPage}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      >
        <ProjectDetailPage
          project={activeProject}
          projectNote={activeProject ? projectNotes[activeProject.id] ?? '' : ''}
          onBack={handleBackToProjects}
          onOpenStack={handleOpenStack}
          onProjectNoteChange={handleProjectNoteChange}
        />
      </AppShell>
    )
  }

  if (route.type === 'stack') {
    const relatedProjects = projects.filter((project) =>
      project.stacks.includes(route.slug),
    )
    const stackExists = Boolean(stackNotes[route.slug]) || relatedProjects.length > 0

    return (
      <AppShell
        isProjectsActive={false}
        isStacksActive
        isSignedIn={Boolean(userId)}
        avatarUrl={avatarUrl}
        userLabel={userLabel}
        onNavigateToProjects={handleBackToProjects}
        onNavigateToStacks={handleOpenStacksPage}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      >
        <StackDetailPage
          stack={stackExists ? route.slug : null}
          stackNote={stackExists ? stackPageNotes[route.slug] ?? '' : ''}
          relatedProjects={relatedProjects}
          onBack={handleOpenStacksPage}
          onOpenProject={handleOpenProject}
          onStackNoteChange={handleStackNoteChange}
        />
      </AppShell>
    )
  }

  if (route.type === 'stacks') {
    return (
      <AppShell
        isProjectsActive={false}
        isStacksActive
        isSignedIn={Boolean(userId)}
        avatarUrl={avatarUrl}
        userLabel={userLabel}
        onNavigateToProjects={handleBackToProjects}
        onNavigateToStacks={handleOpenStacksPage}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      >
        <StacksPage stacks={stackEntries} onOpenStack={handleOpenStack} />
      </AppShell>
    )
  }

  return (
    <AppShell
      isProjectsActive
      isStacksActive={false}
      isSignedIn={Boolean(userId)}
      avatarUrl={avatarUrl}
      userLabel={userLabel}
      onNavigateToProjects={handleBackToProjects}
      onNavigateToStacks={handleOpenStacksPage}
      onSignIn={handleSignIn}
      onSignOut={handleSignOut}
    >
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-10 sm:px-8 sm:pt-14 lg:px-12 lg:pt-20">
        <Header />

        <main className="grid items-stretch gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenStack={handleOpenStack}
              onOpenDetail={handleOpenProject}
              StackChip={StackChip}
            />
          ))}
        </main>
      </div>
    </AppShell>
  )
}
