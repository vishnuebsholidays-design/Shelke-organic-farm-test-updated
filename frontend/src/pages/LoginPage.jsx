import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import logo from '../assets/logo.png';

/**
 * Customer Login Page
 * - Full-screen responsive 3D organic UI.
 * - No Header/Footer so the page fits in one viewport.
 * - Uses deployed backend when hosted and localhost only during local development.
 */
const API = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('customerUser');
    if (savedUser) navigate('/');
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/auth/login`, {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (!response.data?.user) {
        setError('Login failed. Please try again.');
        return;
      }

      localStorage.setItem('customerUser', JSON.stringify(response.data.user));
      const redirectPath = localStorage.getItem('customerRedirectAfterLogin') || '/';
      localStorage.removeItem('customerRedirectAfterLogin');
      navigate(redirectPath);
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-login-page">
      <section className="auth-shell">
        <aside className="auth-visual-card">
          <div className="auth-top-cluster">
            <div className="auth-people-row" aria-label="Trusted customers">
              <span>S</span>
              <span>O</span>
              <span>F</span>
              <strong>30k</strong>
            </div>
            <div className="auth-trust-text">
            <b>JOIN WITH 30K+ CUSTOMERS!</b>
            <small>Trusted organic products from farm to home</small>
            </div>
          </div>
          <div className="auth-hero-copy">
            <h2>Back to nature.</h2>
            <p>Fresh, pure and premium organic products delivered with care.</p>
          </div>
        </aside>

        <section className="auth-form-card">
          <div className="auth-card-cut auth-card-cut-one" />
          <div className="auth-card-cut auth-card-cut-two" />

          <img src={logo} alt="Shelke Organic Farms" className="auth-logo" />
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Please enter your details to continue your Shelke Organic Farm journey.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="auth-options">
              <label className="auth-check">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
              <span>➜</span>
            </button>
          </form>

          <p className="auth-switch-text">
            New customer? <Link to="/signup">Create Account</Link>
          </p>
        </section>
      </section>
    </main>
  );
}

export default LoginPage;
