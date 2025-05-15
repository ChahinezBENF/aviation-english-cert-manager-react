import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/apiUsers';
import Header from '../components/Header';

//CSS Styling
import '../styles/pages.css';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const nav = useNavigate();

  const loginUser = async (e) => {
  e.preventDefault();
  setErrorMessage(''); // Clear previous errors

  try {
    const response = await login(email, password); // Call the login API
    console.log('Response received:', response);

    // Check if token is present in the response
    if (response.token) {
      localStorage.setItem('token', response.token); // Save token for authentication
    } else {
      throw new Error('Token not provided in response'); // Handle missing token
    }

    // Save userId and role in localStorage 
    if (response.id) {
      localStorage.setItem('userId', response.id); // Save user ID
    }

    // Redirect based on role
    if (response.role === 'controller' || response.role === 'pilot') {
      nav(`/controller-dashboard/${response.id}`);
    } else if (response.role === 'hr') {
      nav('/hr-dashboard');
    } else {
      throw new Error('Unknown role'); // Handle unexpected roles
    }
  } catch (error) {
    console.error('Login error:', error);

    setErrorMessage(
      error.response?.data?.error || 'Invalid email or password. Please try again.'
    );
  }
};


  return (
    <div>
     <Header />
     <div className="login">

      <h1 >Login</h1>

      <form className="login-form" onSubmit={loginUser}>
        <div>
          <label>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      {errorMessage && <div className="error-alert">{errorMessage}</div>}
        <button type="submit"> Login </button>
      </form>

      <div className="">
        <Link to="/coming-soon" > Forgot Password? </Link>
        <Link to="/coming-soon" > Sign Up </Link>
      </div>

    </div>

  </div>
  );
};

