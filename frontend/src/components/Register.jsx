import React, { useEffect, useState } from 'react';
import "../styles/login.css";
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch,useSelector } from "react-redux";
import { register } from '../redux/action/authaction';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
 
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, confirmPassword, password }));
  };

  

  return (
    <div className="auth_component">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth_component_form">
        <div className="auth_component_input-wrapper">
          <i className="fas fa-user icon"></i>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            required 
          />
        </div>
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
        <div className="auth_component_input-wrapper">
          <i className="fas fa-lock icon"></i>
          <input 
            type={showConfirmPassword ? 'text' : 'password'} 
            id="confirm-password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            required 
          />
          <i 
            className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} auth_component_toggle-password`} 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>
        <button type="submit" className="auth_component_btn-primary" >Register</button>
        <p className="auth_component_link-text">
          Already have an account? 
        </p>
        <button type="button"  onClick={() => navigate('/auth/login')} className="auth_component_btn-secondary">Login</button>
      </form>
    </div>
  );
};

export default Register;
