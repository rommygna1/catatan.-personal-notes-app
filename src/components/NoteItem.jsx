import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { showFormattedDate, stripHtml } from '../utils';

function NoteItem({ note }) {
  const {
    id, title, body, createdAt,
  } = note;

  return (
    <article className="note-item">
      <Link className="note-item__link" to={`/notes/${id}`}>
        <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__body">{stripHtml(body)}</p>
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
