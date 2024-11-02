import React from 'react';
import Slidebar from '../components/Slidebar';
import { Outlet } from 'react-router-dom';
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <div className='dashboard'>
      <div className='dashboard_component_one'>
        <Slidebar />
      </div>
      <div className='dashboard_component_two'>
        <Outlet/>
      </div>
    </div>
  );
}

export default Dashboard;
