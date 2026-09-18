import { useCallback, useState } from 'react';
import {
  addNote as addNoteApi,
  archiveNote as archiveNoteApi,
  deleteNote as deleteNoteApi,
  getActiveNotes as getActiveNotesApi,
  getArchivedNotes as getArchivedNotesApi,
  getNote as getNoteApi,
  unarchiveNote as unarchiveNoteApi,
} from '../utils/network-data';

function useNotes() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);

  const loadActiveNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { error: err, data, message } = await getActiveNotesApi();
    setIsLoading(false);

    if (err) {
      setError(message || 'Failed to fetch active notes');
      setNotes([]);
      return { error: true, data: [] };
    }

    setNotes(data || []);
    return { error: false, data };
  }, []);

  const loadArchivedNotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const { error: err, data, message } = await getArchivedNotesApi();
    setIsLoading(false);

    if (err) {
      setError(message || 'Failed to fetch archived notes');
      setNotes([]);
      return { error: true, data: [] };
    }

    setNotes(data || []);
    return { error: false, data };
  }, []);

  const loadSingleNote = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    const { error: err, data, message } = await getNoteApi(id);
    setIsLoading(false);

    if (err) {
      setError(message || 'Failed to fetch note');
      setNote(null);
      return { error: true, data: null };
    }

    setNote(data);
    return { error: false, data };
  }, []);

  const addNote = useCallback(async ({ title, body }) => {
    setIsMutating(true);
    setError(null);
    const result = await addNoteApi({ title, body });
    setIsMutating(false);

    if (result.error) {
      setError(result.message || 'Failed to create note');
      return false;
    }

    return true;
  }, []);

  const archiveNote = useCallback(async (id) => {
    setIsMutating(true);
    setError(null);
    const result = await archiveNoteApi(id);
    setIsMutating(false);

    if (result.error) {
      setError(result.message || 'Failed to archive note');
      return false;
    }

    return true;
  }, []);

  const unarchiveNote = useCallback(async (id) => {
    setIsMutating(true);
    setError(null);
    const result = await unarchiveNoteApi(id);
    setIsMutating(false);

    if (result.error) {
      setError(result.message || 'Failed to unarchive note');
      return false;
    }

    return true;
  }, []);

  const deleteNote = useCallback(async (id) => {
    setIsMutating(true);
    setError(null);
    const result = await deleteNoteApi(id);
    setIsMutating(false);

    if (result.error) {
      setError(result.message || 'Failed to delete note');
      return false;
    }

    return true;
  }, []);

  return {
    notes,
    note,
    isLoading,
    isMutating,
    error,
    loadActiveNotes,
    loadArchivedNotes,
    loadSingleNote,
    addNote,
    archiveNote,
    unarchiveNote,
    deleteNote,
  };
}

export default useNotes;
