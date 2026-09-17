import React, { useMemo } from 'react';
import parse from 'html-react-parser';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import { showFormattedDate } from '../utils';
import {
  archiveNote, deleteNote, getNote, unarchiveNote,
} from '../utils/local-data';

function NoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = useMemo(() => getNote(id), [id]);

  if (!note) {
    return <NotFoundPage message="Catatan yang kamu cari tidak ditemukan atau sudah dihapus." />;
  }

  const handleDelete = () => {
    deleteNote(id);
    navigate('/');
  };

  const handleToggleArchive = () => {
    if (note.archived) {
      unarchiveNote(id);
      navigate('/');
    } else {
      archiveNote(id);
      navigate('/archives');
    }
  };

  return (
    <article className="detail-page">
      <p className="eyebrow">
        <span className="eyebrow__dot" aria-hidden="true" />
        {note.archived ? 'Arsip' : 'Catatan aktif'}
      </p>
      <h1 className="detail-page__title">{note.title}</h1>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{parse(note.body)}</div>

      <div className="detail-page__action">
        <button
          type="button"
          className="button button--primary"
          onClick={handleToggleArchive}
        >
          {note.archived ? 'Batal Arsipkan' : 'Arsipkan'}
        </button>
        <button
          type="button"
          className="button button--secondary"
          onClick={handleDelete}
        >
          Hapus
        </button>
      </div>
    </article>
  );
}

export default NoteDetailPage;
