import React, { useContext, useEffect } from 'react';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import LoadingIndicator from '../components/LoadingIndicator';
import useNotes from '../hooks/useNotes';
import { showFormattedDate } from '../utils';
import { LocaleContext } from '../contexts/LocaleContext';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    note, isLoading, isMutating, error, loadSingleNote, archiveNote, unarchiveNote, deleteNote,
  } = useNotes();
  const { locale, t } = useContext(LocaleContext);

  useEffect(() => {
    loadSingleNote(id);
  }, [id, loadSingleNote]);

  if (isLoading) {
    return <LoadingIndicator isFullscreen message={t('loading')} />;
  }

  if (error || !note) {
    return <NotFoundPage message={t('detail.notFound')} />;
  }

  const handleDelete = async () => {
    const success = await deleteNote(id);
    if (success) {
      navigate('/');
    }
  };

  const handleToggleArchive = async () => {
    if (note.archived) {
      const success = await unarchiveNote(id);
      if (success) {
        navigate('/');
      }
    } else {
      const success = await archiveNote(id);
      if (success) {
        navigate('/archives');
      }
    }
  };

  const displayTitle = note.title || t('notes.untitled');
  const badgeText = note.archived ? t('hero.archiveBadge') : t('hero.activeBadge');
  const archiveActionText = note.archived
    ? (isMutating ? t('notes.unarchiving') : t('notes.unarchiveAction'))
    : (isMutating ? t('notes.archiving') : t('notes.archiveAction'));
  const deleteActionText = isMutating ? t('notes.deleting') : t('notes.deleteAction');

  return (
    <article className="detail-page">
      <p className="eyebrow">
        <span className="eyebrow__dot" aria-hidden="true" />
        {badgeText}
      </p>
      <h1 className="detail-page__title">{displayTitle}</h1>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt, locale)}</p>
      <div className="detail-page__body">{parse(note.body || '')}</div>

      <div className="detail-page__action">
        <button
          type="button"
          className="button button--primary"
          onClick={handleToggleArchive}
          disabled={isMutating}
        >
          {archiveActionText}
        </button>
        <button
          type="button"
          className="button button--secondary"
          onClick={handleDelete}
          disabled={isMutating}
        >
          {deleteActionText}
        </button>
      </div>
    </article>
  );
}

export default NoteDetailPage;
