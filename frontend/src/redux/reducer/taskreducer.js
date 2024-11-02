import {
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAIL,
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

const initialState = {
  error: null,
  loading: false,
  data: {},
  tasks: [],
  shareTaskData: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOADING:
      return { ...state, loading: true, error: null };
    case FETCH_ANALYTICS_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case FETCH_ANALYTICS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case FETCH_TASKS_SUCCESS:
      return { ...state, tasks: action.payload, loading: false };
    case FETCH_TASKS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.savedTask],
        loading: false,
      };
    case CREATE_TASK_FAIL:
      return { ...state, error: action.payload, loading: false };
    case DELETE_TASK_SUCCESS:
      console.log(action.payload._id);
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case DELETE_TASK_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case UPDATE_TASK_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case GET_SHARED_TASK_SUCCESS:
      return { ...state, shareTaskData: action.payload, loading: false };
    case GET_SHARED_TASK_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case TOGGLE_CHECKLIST_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case TOGGLE_CHECKLIST_ITEM_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case UPDATE_TASK_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case UPDATE_TASK_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
