import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteInput from '../components/NoteInput';
import { addNote } from '../utils/local-data';

function AddNotePage() {
  const navigate = useNavigate();

  const handleAddNote = ({ title, body }) => {
    addNote({ title, body });
    navigate('/');
  };

  return (
    <section className="page-content page-content--narrow">
      <p className="eyebrow">
        <span className="eyebrow__dot" aria-hidden="true" />
        Catatan baru
      </p>
      <h1 className="page-title">Tulis catatan</h1>
      <NoteInput onSubmit={handleAddNote} />
    </section>
  );
}

export default AddNotePage;
