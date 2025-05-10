import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/apiUsers';

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
      const response = await login(email, password);
      console.log('Response received:', response);

      if (response.id) {
      localStorage.setItem("userId", response.id); } // Store ID in localStorage
   
      if (response.role === "controller" || response.role === "pilot") {
      nav(`/controller-dashboard/${response.id}`); // Redirect to unique URL
    } else if (response.role === "hr") {
      nav("/hr-dashboard");
    }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(
        error.response?.data?.error || 'Invalid email or password. Please try again.'
      );
    }
  }

  return (
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
        <Link to="/forgot-password" > Forgot Password? </Link>
        <Link to="/signup" > Sign Up </Link>
      </div>

    </div>
  );
};

