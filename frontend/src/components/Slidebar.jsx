import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/slidebar.css";
import Popup from './popups/Popup';
import codesandbox from "../assests/codesandbox.png"

function Slidebar() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleLogoutClick = () => {
    setPopupOpen(true);  
  };

  const handleItemClick = (index, path) => {
    setActiveIndex(index);  
    navigate(path);  
  };

  return (
    <>
      <div className='slidebar'>
       <div>
       <p className='slidebar_heading'><img src={codesandbox} alt='logo'/>  Promanage</p>
        <div className='sBarE2'>
          <p 
            className={activeIndex === 0 ? 'active' : ''} 
            onClick={() => handleItemClick(0, "/dashboard/board")}
          >
            <i className="fas fa-th-large"></i> Board
          </p>
          <p 
            className={activeIndex === 1 ? 'active' : ''} 
            onClick={() => handleItemClick(1, "/dashboard/analytics")}
          >
            <i className="fas fa-database"></i> Analytics
          </p>
          <p 
            className={activeIndex === 2 ? 'active' : ''} 
            onClick={() => handleItemClick(2, "/dashboard/settings")}
          >
            <i className="fas fa-cog"></i> Settings
          </p>
        </div>
       </div>
        <div>
          <p className='slidebar_logout' onClick={handleLogoutClick}><i className="fas fa-sign-out-alt"></i> Log out</p>
        </div>
      </div>
      {isPopupOpen && <Popup message="Logout" onCancel={() => setPopupOpen(false)} />} 
    </>
  );
}

export default Slidebar;
