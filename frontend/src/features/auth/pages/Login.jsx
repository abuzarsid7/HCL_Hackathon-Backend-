import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Spinner } from '../../../components/ui';
import { useAuth } from '../../../hooks/useAuth';
import { validateSignInForm } from '../../../utils/validators';
import '../../../app/styles/app.css';


function EyeIcon({ visible }) {
  return visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function Login() {
  const { isAuthenticated, currentUser, signIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]           = useState({ email: '', password: '' });
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);

  if (isAuthenticated && currentUser) {
    return <Navigate to={currentUser.role === 'SELLER' ? '/seller/dashboard' : '/customer/home'} replace />;
  }

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignInForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError('');
    try {
      const user = await signIn({ email: form.email, password: form.password });
      navigate(user.role === 'SELLER' ? '/seller/dashboard' : '/customer/home');
    } catch (err) {
      setApiError(err.message ?? 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = async (account) => {
    setLoading(true);
    setApiError('');
    try {
      const user = await signIn({ email: account.email, password: account.password });
      navigate(user.role === 'SELLER' ? '/seller/dashboard' : '/customer/home');
    } catch (err) {
      setApiError(err.message ?? 'Quick login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card" style={{ borderRadius: 20 }}>
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">🍕</div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your Food Ordering account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <Input
            id="email"
            label="Email address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            disabled={loading}
            error={errors.email}
            containerStyle={{ marginBottom: '0.85rem' }}
          />

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="password" className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                className={errors.password ? 'auth-input auth-input-error' : 'auth-input'}
                disabled={loading}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                <EyeIcon visible={showPass} />
              </button>
            </div>
            {errors.password && <span className="auth-field-error">{errors.password}</span>}
          </div>

          {/* API error */}
          {apiError && (
            <div className="auth-alert auth-alert-error" role="alert">
              ⚠️ {apiError}
            </div>
          )}

          {/* Submit */}
          <Button type="submit" fullWidth disabled={loading} style={{ marginTop: '0.3rem' }}>
            {loading ? <Spinner size="sm" color="#ffffff" label="Signing in" /> : null}
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="auth-divider"><span>or continue with a demo account</span></div>

        {/* Footer link */}
        <p className="auth-footer-text">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="auth-link">Create one</Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;

