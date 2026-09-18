import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import useNotes from '../hooks/useNotes';
import { LocaleContext } from '../contexts/LocaleContext';

function AddNotePage() {
  const navigate = useNavigate();
  const { addNote, isMutating, error } = useNotes();
  const { t } = useContext(LocaleContext);

  const handleAddNote = async ({ title, body }) => {
    const success = await addNote({ title, body });
    if (success) {
      navigate('/');
    }
  };

  return (
    <section className="page-content page-content--narrow">
      <p className="eyebrow">
        <span className="eyebrow__dot" aria-hidden="true" />
        {t('input.pageBadge')}
      </p>
      <h1 className="page-title">{t('input.pageTitle')}</h1>

      {error && (
        <div className="alert alert--error" role="alert">
          <span className="alert__icon" aria-hidden="true">✕</span>
          <span>{error}</span>
        </div>
      )}

      <NoteInput onSubmit={handleAddNote} isSubmitting={isMutating} />
    </section>
  );
}

export default AddNotePage;
