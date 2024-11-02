import {
  createTask,
  fetchAnalyticsData,
  fetchTasksByFilter,
  deleteTaskApi,
  updateTaskApi,
  SharedTaskApi,
  toggleChecklistItemApi,
  updateTaskStatusApi,
} from "../../api/taskApi";
import {
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  GET_SHARED_TASK_SUCCESS,
  GET_SHARED_TASK_FAILURE,
  TOGGLE_CHECKLIST_ITEM_SUCCESS,
  TOGGLE_CHECKLIST_ITEM_FAILURE,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
  REQUEST_LOADING,
} from "../constants";
import { toast } from "react-toastify";

export const task = (taskData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOADING });
    const response = await createTask(taskData);
    console.log(response);
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: response.data,
    });
    toast.success(response.data.message || "Task Created successfully!");
  } catch (error) {
    const errorMessage =
      error.data?.message || "Error in Creating Task. Please try again.";
    dispatch({
      type: CREATE_TASK_FAIL,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const fetchAnalytics = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOADING });
    const response = await fetchAnalyticsData();
    dispatch({
      type: FETCH_ANALYTICS_SUCCESS,
      payload: response.formattedAnalytics,
    });
    toast.success(response.message || "Analytics fetched successfully!");
  } catch (error) {
    const errorMessage =
      error.message || "Error fetching Analytics. Please try again.";
    dispatch({
      type: FETCH_ANALYTICS_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const fetchTasks = (filter) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOADING });
    const response = await fetchTasksByFilter(filter);
    dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.tasks });
    toast.success(response.message || "Tasks fetched successfully!");
  } catch (error) {
    const errorMessage =
      error.message || "Error fetching Tasks. Please try again.";
    dispatch({ type: FETCH_TASKS_FAILURE, payload: errorMessage });
    toast.error(errorMessage);
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOADING });
    const response = await deleteTaskApi(id);

    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: id,
    });
    toast.success(response.message || "Tasks deleted successfully!");
  } catch (error) {
    const errorMessage =
      error.message || "Error Deleteing Tasks. Please try again.";
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const updateTask = (id, taskData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOADING });
    const response = await updateTaskApi(id, taskData);
    console.log(response);
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: response.data.updatedTask,
    });
    toast.success(response.message || "Tasks updated successfully!");
  } catch (error) {
    const errorMessage =
      error.message || "Error Deleteing Tasks. Please try again.";
    dispatch({
      type: UPDATE_TASK_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const getSharedTask = (id, taskData) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LOADING });
    const response = await SharedTaskApi(id, taskData);
    console.log(response);
    dispatch({
      type: GET_SHARED_TASK_SUCCESS,
      payload: response.data.shareTask,
    });
    toast.success(response.message || "Task Fetched successfully!");
  } catch (error) {
    const errorMessage =
      error.message || "Error getting Task. Please try again.";
    dispatch({
      type: GET_SHARED_TASK_FAILURE,
      payload: errorMessage,
    });
    toast.error(errorMessage);
  }
};

export const toggleChecklistItem =
  (taskId, itemId, completed) => async (dispatch) => {
    dispatch({ type: REQUEST_LOADING });

    try {
      const response = await toggleChecklistItemApi(taskId, itemId, completed);
      dispatch({
        type: TOGGLE_CHECKLIST_ITEM_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: TOGGLE_CHECKLIST_ITEM_FAILURE,
        payload: error.response
          ? error.response.data
          : { message: "Network Error" },
      });
    }
  };

export const updateTaskStatus = (taskId, status) => async (dispatch) => {
  dispatch({ type: REQUEST_LOADING });
  try {
    const data = await updateTaskStatusApi(taskId, status);
    dispatch({ type: UPDATE_TASK_STATUS_SUCCESS, payload: data.task });
  } catch (error) {
    dispatch({ type: UPDATE_TASK_STATUS_FAILURE, payload: error.message });
  }
};
