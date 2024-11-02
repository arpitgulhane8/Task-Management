import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { task, updateTask } from "../../redux/action/taskaction";
import { toast } from "react-toastify";
import "../../styles/addtask.css";

const TaskForm = ({ onCancel, edittask }) => {
  const dispatch = useDispatch();
  const [taskTitle, setTaskTitle] = useState("");
  const [priority, setPriority] = useState("HIGH PRIORITY");
  const [assignTo, setAssignTo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [dueDate, setDueDate] = useState(""); 
  const dateInputRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { contact } = useSelector((state) => state.auth);

  useEffect(() => {
    if (edittask) {
      setTaskTitle(edittask.title);
      setPriority(edittask.priority);
      setAssignTo(edittask.assignTo);
      setTasks(edittask.checklist);
      setDueDate(edittask.dueDate);
    }
  }, [edittask]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    if (!taskTitle.trim()) {
      toast("Task title is required.");
      return;
    }

    if (tasks.length === 0 || tasks.every((task) => !task.text.trim())) {
      toast("At least one checklist item is required.");
      return;
    }

    const taskData = {
      title: taskTitle,
      priority,
      assignTo,
      checklist: tasks,
      dueDate, 
    };

    if (edittask) {
      dispatch(updateTask(edittask._id, taskData));
    } else {
      dispatch(task(taskData));
    }

    // Reset form fields after submission
    setTaskTitle("");
    setPriority("HIGH PRIORITY");
    setAssignTo("");
    setTasks([]);
    setDueDate("");

    onCancel();
  };

  const handleTaskChange = (index, value) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = { ...updatedTasks[index], text: value };
      return updatedTasks;
    });
  };

  const handleTaskCheck = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        completed: !updatedTasks[index].completed,
      };
      return updatedTasks;
    });
  };

  const addTaskInput = () => {
    setTasks((prevTasks) => [...prevTasks, { text: "", completed: false }]);
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const checkedTasksCount = tasks.filter((task) => task.completed).length;

  const handleEmailSelect = (email) => {
    setAssignTo(email);
    setShowDropdown(false);
  };

  return (
    <div className="overlay">
      <div className="Addtask_Form"></div>
      <div className="task-form-container">
        <div className="task-form-title">
          <label>
            Title <i className="fas fa-asterisk required-icon"></i>
          </label>
          <input
            type="text"
            value={taskTitle}
            placeholder="Enter Task Title"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>

        <div className="task-form-priority-section">
          <label>
            Select Priority<i className="fas fa-asterisk required-icon"></i>
          </label>
          <div className="priority-buttons">
            {["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"].map(
              (level) => (
                <button
                  key={level}
                  className={priority === level ? "active" : ""}
                  onClick={() => setPriority(level)}
                >
                  <span
                    className={`priority-buttons-priority-dot ${level
                      .toLowerCase()
                      .replace(/\s/g, "-")}`}
                  ></span>
                  {level}
                </button>
              )
            )}
          </div>
        </div>

        <div className="task-form-assign-section">
          <div className="task-form-assign-section-one">
            <label>Assign To</label>
           <div className="task-form-assign-section-one-input-wrapper">
           <input
              type="text"
              value={assignTo}
              placeholder="Add an assignee"
              readOnly
              onClick={() => setShowDropdown(!showDropdown)}
            />
            <i
            id="task-form-assign-section-one-input-wrapper-toggel"
              className={`fas ${showDropdown ? "fa-chevron-up" : "fa-chevron-down"}`}
              onClick={() => setShowDropdown(!showDropdown)}
            ></i>
           </div>
          </div>
          {showDropdown && (
            <div className="task-form-assign-section-dropdown">
              {contact.map((email, index) => (
                <div
                  key={index}
                  className="task-form-assign-section-dropdownItem"
                >
                  <div className="initials">
                    {email.slice(0, 2).toUpperCase()}
                  </div>
                  <p>{email}</p>
                  <button onClick={() => handleEmailSelect(email)}>
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="task-form-checklist-section">
          <label>
            Checklist({checkedTasksCount}/{tasks.length}){" "}
            <i className="fas fa-asterisk required-icon"></i>
          </label>
          <div className="task-form-checklist-container">
            {tasks.length === 0 ? (
              <p>No tasks added</p>
            ) : (
              tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleTaskCheck(index)}
                  />
                  <input
                    type="text"
                    className="task-item-text"
                    value={task.text}
                    placeholder="Enter task"
                    onChange={(e) => handleTaskChange(index, e.target.value)}
                  />
                  <button
                    className="task-form-checklist-container-delet-btn"
                    onClick={() => removeTask(index)}
                  >
                    <i className="fas fa-trash" style={{ color: "red" }}></i>
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="task-form-add-task">
            <button onClick={addTaskInput}>+ Add New</button>
          </div>
        </div>

        <div className="task-form-footer">
          {!dueDate && (
            <span
              className="datePlaceholder"
              onClick={() => dateInputRef.current?.showPicker()}
            >
              Select Due Date
            </span>
          )}
          {dueDate && (
            <span
              className="datePlaceholder"
              onClick={() => dateInputRef.current?.showPicker()}
            >
              {formatDate(dueDate)}
            </span>
          )}
          <input
            type="date"
            ref={dateInputRef}
            className="addTaskCalendar"
            style={{ display: "none" }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="task-form-buttons">
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
