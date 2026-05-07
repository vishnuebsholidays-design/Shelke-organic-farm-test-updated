import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import heroImage from '../assets/hero.png';
import './AuthPage.css';

/**
 * Customer signup page.
 * Uses existing /auth/signup API and premium Shelke Organic Farm 3D UI.
 */
function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');

      const response = await axios.post('http://localhost:5000/auth/signup', formData);

      localStorage.setItem('customerUser', JSON.stringify(response.data.user));
      alert('Account created successfully');
      navigate('/account');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.error || 'Failed to create account');
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
        <div className="auth-pill-url">www.shelkeorganicfarm.com/signup</div>
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
              <span className="auth-avatar">A</span>
              <span className="auth-avatar">2</span>
              <span className="auth-avatar">G</span>
              <span className="auth-count">SO</span>
            </div>
            <div className="auth-users-text">
              <strong>Create your farm account</strong>
              <span>Save address, wishlist, membership and faster checkout</span>
            </div>
          </div>

          <div className="auth-hero-copy">
            <h2>Pure food starts here.</h2>
            <p>Signup and get access to organic products, deals and membership benefits.</p>
          </div>
        </div>

        <div className="auth-form-card">
          <div className="auth-logo-wrap">
            <img src={logo} alt="Shelke Organic Farm" className="auth-logo" />
          </div>

          <h1>Create account</h1>
          <p className="auth-subtitle">Join Shelke Organic Farm for faster checkout and premium customer benefits.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

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
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
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
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="auth-main-btn" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
              <span className="auth-arrow">↗</span>
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <div className="auth-benefits">
            <span className="auth-benefit">Member Pricing</span>
            <span className="auth-benefit">Fresh Products</span>
            <span className="auth-benefit">Easy Reorder</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default SignupPage;
