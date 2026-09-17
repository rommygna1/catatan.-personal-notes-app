import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import NoteList from '../components/NoteList';
import { filterNotesByKeyword } from '../utils';
import { getActiveNotes } from '../utils/local-data';

function HomePage() {
  const [notes] = useState(() => getActiveNotes());
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
    ? `Tidak ada catatan dengan judul "${keyword}"`
    : 'Tidak ada catatan';

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          Catatan aktif
        </p>
        <h1 className="hero-heading">
          Tempat aman
          <span className="hero-heading__serif">untuk catatanmu.</span>
        </h1>
        <p className="hero-body">
          Semua catatan tersimpan di perangkat ini. Tanpa akun, tanpa server,
          sepenuhnya milikmu.
        </p>
      </section>

      <section className="page-content">
        <SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />
        <NoteList notes={filteredNotes} emptyMessage={emptyMessage} />
      </section>

      <Link className="floating-action" to="/notes/new" aria-label="Tambah catatan baru">
        <span className="floating-action__icon" aria-hidden="true">+</span>
        Tulis
      </Link>
    </>
  );
}

export default HomePage;
