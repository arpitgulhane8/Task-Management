import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { update } from '../redux/action/authaction';
import "../styles/login.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Settings = () => {
   const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      (name && !email && !password && !newPassword) || 
      (!name && email && !password && !newPassword) || 
      (!name && !email && password && newPassword) || 
      (!name && !email && !password && newPassword)
    ) {
      if (name) {
        dispatch(update({ name }));
      } else if (email) {
        dispatch(update({ email }));
      } else if (password && newPassword) {
        dispatch(update({ password, newPassword }));
      }
    } else if (!name && !email && !password && !newPassword) {
      toast.error("Please add valid details to update.");
    } else {
      toast.error("You can only update one field at a time.");
    }
    
  };

  return (
    <div className='setting' style={{width:"400px",height:"400px"}}>
      <div className="auth_component">
      <h2>Settings</h2>
      <form onSubmit={handleRegister} className="auth_component_form" style={{ width: "90%", height: "100%" }}>
        <div className="auth_component_input-wrapper">
          <i className="fas fa-user icon"></i>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            
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
            
          />
        </div>
        <div className="auth_component_input-wrapper">
          <i className="fas fa-lock icon"></i>
          <input 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Old Password" 
            
          />
          <i 
            className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} auth_component_toggle-password`} 
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>
        <div className="auth_component_input-wrapper">
          <i className="fas fa-lock icon"></i>
          <input 
            type={showNewPassword ? 'text' : 'password'} 
            id="new-password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="New Password" 
           
          />
          <i 
            className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'} auth_component_toggle-password`} 
            onClick={() => setShowNewPassword(!showNewPassword)}
          ></i>
        </div>
        <button type="submit" className="auth_component_btn-primary">Update</button>
      </form>
    </div>
    </div>
  );
};

export default Settings;
