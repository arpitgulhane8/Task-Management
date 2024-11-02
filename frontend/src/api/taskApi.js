import axios from "axios";

const API_URL = 'https://task-management-yooi.onrender.com/api/task';

export const createTask = async(userData) =>{
  console.log(userData);
  try{
    const token = localStorage.getItem('token');  
    const response = await axios.post(`${API_URL}/createtask`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,  
      }
    });
    return response;
  }catch(error){
    throw error.response || "Error creating task";
  }
};

export const fetchAnalyticsData = async () => {
  try {
    const token = localStorage.getItem('token'); 
    const response = await axios.get(`${API_URL}/getTaskAnalytics`,{
      headers: {
        Authorization: `Bearer ${token}`,  
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch analytics data');
  }
};


export const fetchTasksByFilter = async (filter) => {
  try {
  
    const token = localStorage.getItem('token');
    // Pass filter as params
    const response = await axios.get(`${API_URL}/getTasksByFilter`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filter,  
    });
    console.log(filter);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error.response || "Error fetching tasks";
  }
};

export const deleteTaskApi = async (id) => {
  console.log(id)
  try{
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${API_URL}/deleteTask/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
      
    } )
    return response; 
  }catch(error){
    console.error("Error delecting tasks:", error);
    throw error.response || "Error delecting tasks";
  }
}

export const updateTaskApi = async (id, taskData) => {
  console.log(id)
  try{
    const token = localStorage.getItem("token")
    const response = await axios.put(`${API_URL}/updateTask/${id}`,taskData,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
      
    } );
  return response;
}catch(error){
    console.error("Error updating task:", error);
    throw error.response || "Error updating task";
  }
};

export const SharedTaskApi = async (id) => {
  try{
    console.log(id)
    const response = await axios.get(`${API_URL}/shareTask/${id}`);
    console.log(response)
    return response;
  }catch(error){
    console.error("Error in getting task:", error);
    throw error.response || "Error in getting task";
  }
}

export const toggleChecklistItemApi = async (taskId, itemId, completed) => {
  try{
    const token = localStorage.getItem("token");
    const response = await axios.put(`${API_URL}/${taskId}/checklist/${itemId}`,{ completed },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
      
    });
    return response;
  }catch(error){
    throw error.response || "Error updating checklist item";
  }
};


export const updateTaskStatusApi = async (taskId, status) => {
  console.log(status)
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(`${API_URL}/updateTaskStatus/${taskId}`,{ status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Error updating task status");
  }
};
