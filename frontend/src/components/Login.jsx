import React, { useEffect, useState } from 'react';
import "../styles/login.css";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action/authaction';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch= useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email,password }));
  };

  return (
    <div className="auth_component">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth_component_form">
        <div className="auth_component_input-wrapper">
          <i className="fas fa-envelope icon"></i>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
        </div>
        <div className="auth_component_input-wrapper">
          <i className="fas fa-lock icon"></i>
          <input 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
          <i 
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} auth_component_toggle-password`} 
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <button type="submit" className="auth_component_btn-primary">Log in</button>
        <p className="auth_component_link-text">
          Have no account yet? 
        </p>
        <button onClick={() => navigate('/auth/register')} className="auth_component_btn-secondary">Register</button>
      </form>
    </div>
  );
};

export default Login;
