import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function NoteInput({ onSubmit, initialTitle = '', initialBody = '' }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [error, setError] = useState('');
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.innerHTML = initialBody;
    }
  }, [initialBody]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Judul catatan tidak boleh kosong.');
      return;
    }

    setError('');
    onSubmit({ title: title.trim(), body });
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <div className="note-input__field">
        <label className="note-input__label" htmlFor="note-title">Judul</label>
        <input
          id="note-title"
          type="text"
          className="note-input__title"
          placeholder="Judul catatan"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="note-input__field">
        <span className="note-input__label">Isi catatan</span>
        <div
          ref={bodyRef}
          className="note-input__body"
          contentEditable
          role="textbox"
          aria-multiline="true"
          aria-label="Isi catatan"
          data-placeholder="Tulis isi catatan di sini..."
          onInput={(event) => setBody(event.target.innerHTML)}
          suppressContentEditableWarning
        />
      </div>

      {error && <p className="note-input__error" role="alert">{error}</p>}

      <button type="submit" className="button button--primary">Simpan Catatan</button>
    </form>
  );
}

NoteInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialTitle: PropTypes.string,
  initialBody: PropTypes.string,
};

export default NoteInput;
