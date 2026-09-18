import React, {
  useContext, useEffect, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import LoadingIndicator from '../components/LoadingIndicator';
import useNotes from '../hooks/useNotes';
import { filterNotesByKeyword } from '../utils';
import { LocaleContext } from '../contexts/LocaleContext';

function ArchivePage() {
  const {
    notes, isLoading, error, loadArchivedNotes,
  } = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useContext(LocaleContext);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    loadArchivedNotes();
  }, [loadArchivedNotes]);

  const filteredNotes = useMemo(
    () => filterNotesByKeyword(notes, keyword),
    [notes, keyword],
  );

  const handleKeywordChange = (value) => {
    if (value) {
      setSearchParams({ keyword: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const emptyMessage = keyword
    ? t('notes.noMatch', { keyword })
    : t('notes.emptyArchive');

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          {t('hero.archiveBadge')}
        </p>
        <h1 className="hero-heading">
          {t('hero.archiveTitle')}
          <span className="hero-heading__serif">{t('hero.archiveTitleSerif')}</span>
        </h1>
        <p className="hero-body">{t('hero.archiveBody')}</p>
      </section>

      <section className="page-content">
        <SearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          placeholder={t('search.archivePlaceholder')}
        />

        {error && (
          <div className="alert alert--error" role="alert">
            <span className="alert__icon" aria-hidden="true">✕</span>
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <LoadingIndicator message={t('loading')} />
        ) : (
          <NoteList notes={filteredNotes} emptyMessage={emptyMessage} />
        )}
      </section>
    </>
  );
}

export default ArchivePage;
