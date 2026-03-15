import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../features/auth/api/authApi';
import { setCredentials } from '../features/auth/slices/authSlice';
import './RegisterPage.scss';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await register({ email, password, name }).unwrap();
      if (res?.success && res?.data) {
        dispatch(
          setCredentials({
            token: res.data.token,
            user: res.data.user,
          })
        );
        navigate('/');
      } else {
        setError(res?.message || 'Registration failed');
      }
    } catch (err) {
      setError(err?.data?.message || err?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__card">
        <h1 className="register-page__title">汉语学习</h1>
        <p className="register-page__subtitle">Create an account</p>

        <form className="register-page__form" onSubmit={handleSubmit}>
          {error && <p className="register-page__error">{error}</p>}
          <label className="register-page__label">
            <span className="register-page__label-text">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              autoComplete="name"
              className="register-page__input"
              disabled={isLoading}
            />
          </label>
          <label className="register-page__label">
            <span className="register-page__label-text">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="register-page__input"
              disabled={isLoading}
            />
          </label>
          <label className="register-page__label">
            <span className="register-page__label-text">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              className="register-page__input"
              disabled={isLoading}
            />
          </label>
          <button
            type="submit"
            className="register-page__submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="register-page__footer">
          Already have an account?{' '}
          <Link to="/login" className="register-page__link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
