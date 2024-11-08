import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/action/authaction";
import "../styles/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Settings = () => {
  const dispatch = useDispatch();
  const { userinfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userinfo?.name || "");
  const [email, setEmail] = useState(userinfo?.email || "");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
  
    const fieldsToUpdate = [];
    if (name && name !== userinfo.name) fieldsToUpdate.push("name");
    if (email && email !== userinfo.email) fieldsToUpdate.push("email");
    if (password && newPassword) fieldsToUpdate.push("password");
  
    if (fieldsToUpdate.length === 0) {
      toast.error("Please add valid details to update.");
      return;
    }
  
    if (fieldsToUpdate.length > 1) {
      toast.error("You can only update one field at a time.");
      return;
    }
  
    if (fieldsToUpdate.includes("name")) {
      dispatch(update({ name }));
    } else if (fieldsToUpdate.includes("email")) {
      dispatch(update({ email }));
    } else if (fieldsToUpdate.includes("password")) {
      if (password === newPassword) {
        toast.error("Old and new passwords cannot be the same.");
        return;
      }
      dispatch(update({ password, newPassword }));
    }
  };
  

  return (
    <div className="setting" style={{ width: "400px", height: "400px" }}>
      <div className="auth_component">
        <h2>Settings</h2>
        <form
          onSubmit={handleRegister}
          className="auth_component_form"
          style={{ width: "90%", height: "100%" }}
        >
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
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Old Password"
            />
            <i
              className={`fas ${
                showPassword ? "fa-eye-slash" : "fa-eye"
              } auth_component_toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          <div className="auth_component_input-wrapper">
            <i className="fas fa-lock icon"></i>
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
            />
            <i
              className={`fas ${
                showNewPassword ? "fa-eye-slash" : "fa-eye"
              } auth_component_toggle-password`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            ></i>
          </div>
          <button type="submit" className="auth_component_btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
