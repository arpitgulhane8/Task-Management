import axios from "axios";

const API_URL = 'https://task-management-yooi.onrender.com/api/auth';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response.data.message)
    return response;
  } catch (error) {
    console.log(error.response.data.message)
    throw error.response || "Registration failed";
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response)
    return response;
  } catch (error) {
    console.log(error.response.data.message)
    throw error.response || "Login failed";
  }
};


export const addContact = async (userData) => {
  try {
    const token = localStorage.getItem('token');  
    const response = await axios.post(`${API_URL}/addcontact`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,  
      }
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message)
    throw error.response || "Contact did not get added";
  }
};

export const updateUser = async (updateData) =>{
 
  try{
    const token = localStorage.getItem('token');  
    const response = await axios.post(`${API_URL}/updateUser`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,  
      }
    });
    console.log(response)
    return response;
  }catch(error){
    console.log(error.response.data.message)
    throw error.response || "User Data not get udated";
  }
}


