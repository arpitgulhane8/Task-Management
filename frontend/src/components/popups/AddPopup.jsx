import React, { useState } from 'react';
import "../../styles/addpopup.css";
import { useDispatch } from 'react-redux';
import { Contact } from '../../redux/action/authaction';

function AddPopup({ onCancel }) {
  const [email, setEmail] = useState("");    
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();  
    dispatch(Contact({email}));
    onCancel();
  }

  return (
    <div className='overlay'>
      <form className='addpopup' onSubmit={handleSubmit}>
        <h3>Add People to Board</h3>
        <input 
          className='addpopup_input'
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <div className='addpopup_btn_section'>
          <button 
            type="button"  // Make sure the cancel button is not treated as submit
            className='addpopup_cancle_btn' 
            onClick={onCancel}>
            Cancel
          </button>
          <button 
            type="submit" // Ensure this is the submit button
            className='addpopup_confirm_btn'>
            Add Email
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPopup;
