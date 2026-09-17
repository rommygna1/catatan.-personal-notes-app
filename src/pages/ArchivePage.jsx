import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { filterNotesByKeyword } from '../utils';
import { getArchivedNotes } from '../utils/local-data';

function ArchivePage() {
  const [notes] = useState(() => getArchivedNotes());
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

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
    ? `Tidak ada arsip dengan judul "${keyword}"`
    : 'Arsip kosong';

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          Arsip
        </p>
        <h1 className="hero-heading">
          Disimpan rapi,
          <span className="hero-heading__serif">tidak pernah hilang.</span>
        </h1>
        <p className="hero-body">
          Catatan yang selesai atau sekadar ingin kamu istirahatkan tetap
          tersimpan dan bisa dibuka kembali kapan saja.
        </p>
      </section>

      <section className="page-content">
        <SearchBar
          keyword={keyword}
          onKeywordChange={handleKeywordChange}
          placeholder="Cari di arsip berdasarkan judul..."
        />
        <NoteList notes={filteredNotes} emptyMessage={emptyMessage} />
      </section>
    </>
  );
}

export default ArchivePage;
