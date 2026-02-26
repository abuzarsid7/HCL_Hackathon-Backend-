import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { validateSignUpForm } from '../../../utils/validators';
import { USER_ROLES } from '../../../utils/constants';
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

const ROLE_OPTIONS = [
  { value: '',                   label: 'Select your role…' },
  { value: USER_ROLES.CUSTOMER,  label: 'Customer' },
  { value: USER_ROLES.SELLER,    label: 'Seller' },
];

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
  store_name: '',
};

function Signup() {
  const { isAuthenticated, currentUser, signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]           = useState(INITIAL_FORM);
  const [errors, setErrors]       = useState({});
  const [apiError, setApiError]   = useState('');
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);
  const [showConf, setShowConf]   = useState(false);

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
    const validationErrors = validateSignUpForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError('');
    try {
      const user = await signUp({
        name:       form.name,
        email:      form.email,
        password:   form.password,
        role:       form.role,
        store_name: form.store_name || null,
      });
      navigate(user.role === 'SELLER' ? '/seller/dashboard' : '/customer/home');
    } catch (err) {
      setApiError(err.message ?? 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isSeller = form.role === USER_ROLES.SELLER;

  return (
    <div className="auth-page">
      <div className="auth-card auth-card-wide">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">🍕</div>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join Food Ordering as a customer or seller</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Two-column layout for wider card */}
          <div className="auth-form-grid">

            {/* Full name */}
            <div className="auth-field">
              <label htmlFor="name" className="auth-label">Full name</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                className={errors.name ? 'auth-input auth-input-error' : 'auth-input'}
                disabled={loading}
              />
              {errors.name && <span className="auth-field-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="su-email" className="auth-label">Email address</label>
              <input
                id="su-email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                className={errors.email ? 'auth-input auth-input-error' : 'auth-input'}
                disabled={loading}
              />
              {errors.email && <span className="auth-field-error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="su-password" className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <input
                  id="su-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min. 6 characters"
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

            {/* Confirm password */}
            <div className="auth-field">
              <label htmlFor="confirmPassword" className="auth-label">Confirm password</label>
              <div className="auth-input-wrap">
                <input
                  id="confirmPassword"
                  type={showConf ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  value={form.confirmPassword}
                  onChange={(e) => setField('confirmPassword', e.target.value)}
                  className={errors.confirmPassword ? 'auth-input auth-input-error' : 'auth-input'}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowConf((v) => !v)}
                  aria-label={showConf ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon visible={showConf} />
                </button>
              </div>
              {errors.confirmPassword && <span className="auth-field-error">{errors.confirmPassword}</span>}
            </div>

            {/* Role dropdown – full width */}
            <div className="auth-field auth-field-full">
              <label htmlFor="role" className="auth-label">I want to join as</label>
              <div className="auth-select-wrap">
                <select
                  id="role"
                  value={form.role}
                  onChange={(e) => setField('role', e.target.value)}
                  className={errors.role ? 'auth-select auth-input-error' : 'auth-select'}
                  disabled={loading}
                >
                  {ROLE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="auth-select-arrow">▾</span>
              </div>
              {errors.role && <span className="auth-field-error">{errors.role}</span>}
            </div>

            {/* Store name – seller only, full width */}
            {isSeller && (
              <div className="auth-field auth-field-full auth-slide-in">
                <label htmlFor="store_name" className="auth-label">Store name</label>
                <input
                  id="store_name"
                  type="text"
                  placeholder="e.g. Pizza Planet, Bread & Brew"
                  value={form.store_name}
                  onChange={(e) => setField('store_name', e.target.value)}
                  className={errors.store_name ? 'auth-input auth-input-error' : 'auth-input'}
                  disabled={loading}
                />
                {errors.store_name && <span className="auth-field-error">{errors.store_name}</span>}
              </div>
            )}

          </div>

          {/* Role info banner */}
          {form.role && (
            <div className={`auth-role-banner auth-role-banner-${form.role.toLowerCase()}`}>
              {form.role === USER_ROLES.CUSTOMER
                ? '👤 As a Customer you can browse products, manage your cart, and place orders.'
                : '🏪 As a Seller you can add products, manage inventory, and view sales analytics.'}
            </div>
          )}

          {/* API error */}
          {apiError && (
            <div className="auth-alert auth-alert-error" role="alert">
              ⚠️ {apiError}
            </div>
          )}

          {/* Submit */}
          <button type="submit" className="auth-btn-primary" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : null}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Footer link */}
        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
