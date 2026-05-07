import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import heroImage from '../assets/hero.png';
import './AuthPage.css';

/**
 * Customer login page.
 * Premium 3D design inspired by the shared reference image,
 * but branded with Shelke Organic Farm content and existing login API.
 */
function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('customerUser');

    if (savedUser) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data?.user) {
        localStorage.setItem('customerUser', JSON.stringify(response.data.user));
        localStorage.setItem('rememberCustomerLogin', formData.remember ? 'yes' : 'no');

        const redirectPath = localStorage.getItem('customerRedirectAfterLogin') || '/';
        localStorage.removeItem('customerRedirectAfterLogin');

        navigate(redirectPath);
        window.location.reload();
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page" style={{ '--auth-bg-image': `url(${heroImage})` }}>
      <div className="auth-browser-pill" aria-hidden="true">
        <div className="auth-pill-icons">
          <span className="auth-pill-icon">‹</span>
          <span className="auth-pill-icon">›</span>
        </div>
        <div className="auth-pill-url">www.shelkeorganicfarm.com</div>
        <div className="auth-pill-actions">
          <span className="auth-pill-icon">↻</span>
          <span className="auth-pill-icon">＋</span>
        </div>
      </div>

      <section className="auth-shell">
        <div className="auth-visual-card">
          <div className="auth-visual-img" />

          <div className="auth-users-strip">
            <div className="auth-avatar-stack" aria-hidden="true">
              <span className="auth-avatar">S</span>
              <span className="auth-avatar">O</span>
              <span className="auth-avatar">F</span>
              <span className="auth-count">30k</span>
            </div>
            <div className="auth-users-text">
              <strong>Join with 30k+ customers!</strong>
              <span>Trusted organic products from farm to home</span>
            </div>
          </div>

          <div className="auth-hero-copy">
            <h2>Back to nature.</h2>
            <p>Login to manage orders, membership, wishlist and addresses.</p>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-logo-wrap">
            <img src={logo} alt="Shelke Organic Farm" className="auth-logo" />
          </div>

          <h1>Welcome back</h1>
          <p className="auth-subtitle">Please enter your details to continue your Shelke Organic Farm journey.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="auth-options">
              <label className="auth-check">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                Remember for 30 days
              </label>

              <Link to="/forgot-password" className="auth-link">
                Forgot Password
              </Link>
            </div>

            <button type="submit" className="auth-main-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
              <span className="auth-arrow">↗</span>
            </button>
          </form>

          <p className="auth-switch-text">
            New customer? <Link to="/signup">Create Account</Link>
          </p>

          <div className="auth-divider">or</div>

          <Link to="/signup" className="auth-google-btn">
            Continue with Shelke Organic
            <span className="auth-google-icon">SO</span>
          </Link>

          <div className="auth-benefits">
            <span className="auth-benefit">Fast Checkout</span>
            <span className="auth-benefit">Order Tracking</span>
            <span className="auth-benefit">Membership Offers</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;
