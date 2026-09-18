import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register as registerApi } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { t } = React.useContext(LocaleContext);
  const navigate = useNavigate();

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage(t('auth.nameRequired'));
      return;
    }

    if (!email.trim()) {
      setErrorMessage(t('auth.emailRequired'));
      return;
    }

    if (!validateEmail(email.trim())) {
      setErrorMessage(t('auth.emailInvalid'));
      return;
    }

    if (!password) {
      setErrorMessage(t('auth.passwordRequired'));
      return;
    }

    if (password.length < 6) {
      setErrorMessage(t('auth.passwordMinLength'));
      return;
    }

    if (!confirmPassword) {
      setErrorMessage(t('auth.confirmPasswordRequired'));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t('auth.confirmPasswordMismatch'));
      return;
    }

    setIsLoading(true);
    const result = await registerApi({
      name: name.trim(),
      email: email.trim(),
      password,
    });
    setIsLoading(false);

    if (result.error) {
      setErrorMessage(result.message || 'Registration failed');
      return;
    }

    navigate('/login');
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-card__header">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            {t('brand')}
          </p>
          <h1 className="auth-card__title">{t('auth.registerTitle')}</h1>
          <p className="auth-card__subtitle">{t('auth.registerSubtitle')}</p>
        </header>

        {errorMessage && (
          <div className="alert alert--error" role="alert">
            <span className="alert__icon" aria-hidden="true">✕</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="register-name">
              {t('auth.nameLabel')}
            </label>
            <input
              id="register-name"
              type="text"
              className="form-input"
              placeholder={t('auth.namePlaceholder')}
              value={name}
              onChange={onNameChange}
              disabled={isLoading}
              autoComplete="name"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="register-email">
              {t('auth.emailLabel')}
            </label>
            <input
              id="register-email"
              type="email"
              className="form-input"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={onEmailChange}
              disabled={isLoading}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="register-password">
              {t('auth.passwordLabel')}
            </label>
            <input
              id="register-password"
              type="password"
              className="form-input"
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={onPasswordChange}
              disabled={isLoading}
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="register-confirm-password">
              {t('auth.confirmPasswordLabel')}
            </label>
            <input
              id="register-confirm-password"
              type="password"
              className="form-input"
              placeholder={t('auth.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              disabled={isLoading}
              autoComplete="new-password"
              required
            />
          </div>

          <button
            type="submit"
            className="button button--primary auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? t('auth.registering') : t('auth.registerSubmit')}
          </button>
        </form>

        <footer className="auth-card__footer">
          <p>
            {t('auth.hasAccount')}{' '}
            <Link to="/login" className="auth-link">
              {t('auth.goToLogin')}
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
}

export default RegisterPage;
