import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import logo from '../assets/logo.png';

/**
 * Customer Signup Page
 * - Mobile-friendly account creation.
 * - Phone field accepts only numbers and maximum 10 digits.
 * - Backend blocks duplicate email and phone.
 */
const API = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:5000' : '');

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const onlyNumbers = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, phone: onlyNumbers }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) return 'Please enter a valid email address';
    if (!/^\d{10}$/.test(formData.phone)) return 'Mobile number must be exactly 10 digits';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone,
        password: formData.password,
      };

      const response = await axios.post(`${API}/auth/signup`, payload);
      localStorage.setItem('customerUser', JSON.stringify(response.data.user));
      navigate('/account');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page auth-signup-page">
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
            <b>CREATE YOUR FARM ACCOUNT</b>
            <small>Get offers, membership benefits and faster checkout</small>
            </div>
          </div>
          <div className="auth-hero-copy">
            <h2>Start fresh.</h2>
            <p>Join Shelke Organic Farms and enjoy premium farm-to-home shopping.</p>
          </div>
        </aside>

        <section className="auth-form-card">
          <div className="auth-card-cut auth-card-cut-one" />
          <div className="auth-card-cut auth-card-cut-two" />

          <img src={logo} alt="Shelke Organic Farms" className="auth-logo" />
          <h1>Create Account</h1>
          <p className="auth-subtitle">Signup for faster checkout, order tracking and membership offers.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form auth-signup-form">
            <label>
              <span>Full Name</span>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name" autoComplete="name" required />
            </label>

            <label>
              <span>Email</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" autoComplete="email" required />
            </label>

            <label>
              <span>Mobile Number</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength="10"
                autoComplete="tel"
                required
              />
            </label>

            <label>
              <span>Password</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" autoComplete="new-password" required />
            </label>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              <span>➜</span>
            </button>
          </form>

          <p className="auth-switch-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </section>
      </section>
    </main>
  );
}

export default SignupPage;
