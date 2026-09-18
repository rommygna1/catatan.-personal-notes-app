import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../contexts/LocaleContext';

function NotFoundPage({ message }) {
  const { t } = useContext(LocaleContext);
  const defaultMessage = message || t('notFound.message');

  return (
    <section className="not-found">
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1 className="not-found__title">{t('notFound.title')}</h1>
      <p className="not-found__message">{defaultMessage}</p>
      <Link className="button button--primary" to="/">
        {t('notFound.backHome')}
      </Link>
    </section>
  );
}

NotFoundPage.propTypes = {
  message: PropTypes.string,
};

export default NotFoundPage;
