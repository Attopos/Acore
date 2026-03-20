import { supabase, isSupabaseConfigured } from './supabase'

const NOTES_TABLE = 'notes'

export async function fetchNotes(noteType, keys, userId) {
  if (!isSupabaseConfigured || !supabase || keys.length === 0 || !userId) {
    return {}
  }

  const { data, error } = await supabase
    .from(NOTES_TABLE)
    .select('note_key, content')
    .eq('user_id', userId)
    .eq('note_type', noteType)
    .in('note_key', keys)

  if (error) {
    throw error
  }

  return Object.fromEntries(
    (data ?? []).map((note) => [note.note_key, note.content ?? '']),
  )
}

export async function saveNote(noteType, noteKey, content, userId) {
  if (!isSupabaseConfigured || !supabase || !userId) {
    return
  }

  const { error } = await supabase.from(NOTES_TABLE).upsert(
    {
      user_id: userId,
      note_type: noteType,
      note_key: noteKey,
      content,
    },
    {
      onConflict: 'user_id,note_type,note_key',
    },
  )

  if (error) {
    throw error
  }
}
