import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import useAuth from '../hooks/useAuth';
import { login as loginApi } from '../utils/network-data';
import { LocaleContext } from '../contexts/LocaleContext';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  const { t } = React.useContext(LocaleContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage(t('auth.emailRequired'));
      return;
    }

    if (!password) {
      setErrorMessage(t('auth.passwordRequired'));
      return;
    }

    setIsLoading(true);
    const result = await loginApi({ email: email.trim(), password });

    if (result.error) {
      setErrorMessage(result.message || 'Login failed');
      setIsLoading(false);
      return;
    }

    const success = await login(result.data.accessToken);
    setIsLoading(false);

    if (success) {
      navigate('/');
    } else {
      setErrorMessage('Failed to retrieve user profile');
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <header className="auth-card__header">
          <p className="eyebrow">
            <span className="eyebrow__dot" aria-hidden="true" />
            {t('brand')}
          </p>
          <h1 className="auth-card__title">{t('auth.loginTitle')}</h1>
          <p className="auth-card__subtitle">{t('auth.loginSubtitle')}</p>
        </header>

        {errorMessage && (
          <div className="alert alert--error" role="alert">
            <span className="alert__icon" aria-hidden="true">✕</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="login-email">
              {t('auth.emailLabel')}
            </label>
            <input
              id="login-email"
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
            <label className="form-label" htmlFor="login-password">
              {t('auth.passwordLabel')}
            </label>
            <input
              id="login-password"
              type="password"
              className="form-input"
              placeholder={t('auth.passwordPlaceholder')}
              value={password}
              onChange={onPasswordChange}
              disabled={isLoading}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="button button--primary auth-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? t('auth.loggingIn') : t('auth.loginSubmit')}
          </button>
        </form>

        <footer className="auth-card__footer">
          <p>
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="auth-link">
              {t('auth.goToRegister')}
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
}

export default LoginPage;
