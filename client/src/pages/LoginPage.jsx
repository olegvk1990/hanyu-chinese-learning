import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../features/auth/api/authApi';
import { setCredentials } from '../features/auth/slices/authSlice';
import './LoginPage.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login({ email, password }).unwrap();
      if (res?.success && res?.data) {
        dispatch(
          setCredentials({
            token: res.data.token,
            user: res.data.user,
          })
        );
        navigate('/');
      } else {
        setError(res?.message || 'Login failed');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__card">
        <h1 className="login-page__title">汉语学习</h1>
        <p className="login-page__subtitle">Sign in to continue</p>

        <form className="login-page__form" onSubmit={handleSubmit}>
          {error && <p className="login-page__error">{error}</p>}
          <label className="login-page__label">
            <span className="login-page__label-text">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="login-page__input"
              disabled={isLoading}
            />
          </label>
          <label className="login-page__label">
            <span className="login-page__label-text">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="login-page__input"
              disabled={isLoading}
            />
          </label>
          <button
            type="submit"
            className="login-page__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="login-page__footer">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="login-page__link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
