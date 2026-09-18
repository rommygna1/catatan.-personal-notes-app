import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { showFormattedDate, stripHtml } from '../utils';
import { LocaleContext } from '../contexts/LocaleContext';

function NoteItem({ note }) {
  const {
    id, title, body, createdAt,
  } = note;
  const { locale, t } = useContext(LocaleContext);

  const displayTitle = title || t('notes.untitled');
  const previewBody = stripHtml(body);

  return (
    <article className="note-item">
      <Link className="note-item__link" to={`/notes/${id}`}>
        <p className="note-item__createdAt">{showFormattedDate(createdAt, locale)}</p>
        <h3 className="note-item__title">{displayTitle}</h3>
        <p className="note-item__body">{previewBody}</p>
      </Link>
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    archived: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoteItem;
