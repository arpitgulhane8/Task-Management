import React from 'react';
import { Outlet } from 'react-router-dom';
import Group from '../assests/Group.png';
import "../styles/auth.css";

function Auth() {
  return (
    <div className='auth'>
      <div className='auth_component_first'>
        <div className='img_wrapper'>
          <img src={Group} alt="Welcome" />
        </div>
        <h1>Welcome aboard my friend</h1>
        <p>Just a couple of clicks and we start</p>
      </div>
      <div className='auth_component_second'>
        <Outlet/>
      </div>
    </div>
  );
}

export default Auth;
