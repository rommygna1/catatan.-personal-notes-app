import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '../contexts/LocaleContext';

function NoteInput({
  onSubmit, initialTitle = '', initialBody = '', isSubmitting = false,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [error, setError] = useState('');
  const bodyRef = useRef(null);
  const { t } = useContext(LocaleContext);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.innerHTML = initialBody;
    }
  }, [initialBody]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError(t('input.titleRequired'));
      return;
    }

    setError('');
    onSubmit({ title: title.trim(), body });
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <div className="note-input__field">
        <label className="note-input__label" htmlFor="note-title">
          {t('input.titleLabel')}
        </label>
        <input
          id="note-title"
          type="text"
          className="note-input__title"
          placeholder={t('input.titlePlaceholder')}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          disabled={isSubmitting}
          autoComplete="off"
        />
      </div>

      <div className="note-input__field">
        <span className="note-input__label">{t('input.bodyLabel')}</span>
        <div
          ref={bodyRef}
          className="note-input__body"
          contentEditable={!isSubmitting}
          role="textbox"
          aria-multiline="true"
          aria-label={t('input.bodyLabel')}
          data-placeholder={t('input.bodyPlaceholder')}
          onInput={(event) => setBody(event.target.innerHTML)}
          suppressContentEditableWarning
        />
      </div>

      {error && <p className="note-input__error" role="alert">{error}</p>}

      <button
        type="submit"
        className="button button--primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('notes.saving') : t('notes.saveAction')}
      </button>
    </form>
  );
}

NoteInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialTitle: PropTypes.string,
  initialBody: PropTypes.string,
  isSubmitting: PropTypes.bool,
};

export default NoteInput;
