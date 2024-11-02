import React from 'react';
import '../../styles/popup.css';
import { useDispatch } from "react-redux";
import { logout } from '../../redux/action/authaction';
import { deleteTask } from '../../redux/action/taskaction';

function Popup({ message,onCancel,id }) {

const dispatch = useDispatch()

  if (typeof message !== 'string') {
    console.error("Expected message to be a string");
    return null; 
  }

const handleOnClick = ()=>{
if(message==="Logout"){
  dispatch(logout());
  onCancel()
}
if(message==="Delete"){
  dispatch(deleteTask(id));
  onCancel()
}
}

  return (
    <div className='overlay'>
      <div className='popup'>
        <h4>Are you sure you want to {message}?</h4>
        <button className='popup_btn_confirm' onClick={()=>handleOnClick()}>Yes, {message}</button>
        <button onClick={onCancel} className='popup_btn_cancle'>Cancel</button> 
      </div>
    </div>
  );
}

export default Popup;
