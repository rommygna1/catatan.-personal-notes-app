import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NotFoundPage({ message = 'Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.' }) {
  return (
    <section className="not-found">
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1 className="not-found__title">Halaman tidak ditemukan</h1>
      <p className="not-found__message">{message}</p>
      <Link className="button button--primary" to="/">Kembali ke Beranda</Link>
    </section>
  );
}

NotFoundPage.propTypes = {
  message: PropTypes.string,
};

export default NotFoundPage;
