import React, { useEffect, useState } from "react";
import "../styles/taskcard.css";
import Popup from "./popups/Popup";
import Addtask from "./popups/Addtask";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleChecklistItem,
  updateTaskStatus,
} from "../redux/action/taskaction";

const TaskCard = ({ task,closeAll }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [addtask, setTaskOpen] = useState(false);
  const [showChecklistDropdown, setShowChecklistDropdown] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const id = task._id;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "HIGH PRIORITY":
        return "red";
      case "MODERATE PRIORITY":
        return "#18B0FF";
      case "LOW PRIORITY":
        return "green";
      default:
        return "gray";
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const checkedTasksCount = task.checklist.filter(
    (item) => item.completed
  ).length;

  const shareTask = () => {
    if (token) {
      const shareableLink = `${window.location.origin}/sharedTask/${id}`;
      navigator.clipboard
        .writeText(shareableLink)
        .then(() => {
          toast.success("Link copied to clipboard");
        })
        .catch(() => {
          toast.error("Failed to copy link");
        });
    }
  };

  // Handle checklist item toggle
  const handleToggleChecklistItem = (itemId, completed) => {
    dispatch(toggleChecklistItem(task._id, itemId, completed));
  };

  const handleStatusChange = (newStatus) => {
    dispatch(updateTaskStatus(task._id, newStatus));
  };


  useEffect(() => {
    if (closeAll) {
      setShowChecklistDropdown(false); // Close the dropdown if `closeAll` is true
    }
  }, [closeAll]);





  return (
    <>
      <div className="task-card">
        {/* Header */}
        <div className="task-card-header">
          <div className="task-card-header-section-one">
            <div className="priority-status">
              <span
                className="priority-dot"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              ></span>
              <h6>{task.priority}</h6>
            </div>
            <div className="user-initials">
              {task.assignTo ? task.assignTo.slice(0, 2).toUpperCase() : ""}
            </div>
          </div>

          {/* More Options with Dropdown */}
          <div className="more-options" onClick={toggleDropdown}>
            ...
            {showDropdown && (
              <div className="task-card-dropdown-menu">
                <button onClick={() => setTaskOpen(true)}>Edit</button>
                <button onClick={shareTask}>Share</button>
                <button onClick={() => setPopupOpen(true)}>Delete</button>
              </div>
            )}
          </div>
        </div>

        <h3 className="task-card-title">{task.title}</h3>

        <div className="checklist">
          <div className="checklist_content">
            <p>
              Checklist ({checkedTasksCount}/{task.checklist.length})
            </p>
            <p
              className="checklist-title"
              onClick={() => setShowChecklistDropdown(!showChecklistDropdown)}
            >
              {showChecklistDropdown ? (
                <i className="fas fa-chevron-up"></i>
              ) : (
                <i className="fas fa-chevron-down"></i>
              )}
            </p>
          </div>

          {showChecklistDropdown &&
            task.checklist.map((item, index) => (
              <div
                key={index}
                className={`taskcard-task-item ${item.completed ? "done" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() =>
                    handleToggleChecklistItem(item._id, !item.completed)
                  } // Dispatch the toggle action
                />
                <label>{item.text}</label>
              </div>
            ))}
        </div>

        {/* Footer */}
        <div className="task-footer">
          {task.dueDate && (
            <div
              className="due-date"
              style={{
                backgroundColor:
                  task.status === "Done"
                    ? "green"
                    : new Date(task.dueDate) < new Date() ||
                      task.priority === "HIGH PRIORITY"
                    ? "red"
                    : "gray",
              }}
            >
              {`${new Date(task.dueDate).getDate()}${
                ["th", "st", "nd", "rd"][
                  new Date(task.dueDate).getDate() % 10 > 3 ||
                  [11, 12, 13].includes(new Date(task.dueDate).getDate())
                    ? 0
                    : new Date(task.dueDate).getDate() % 10
                ]
              } ${new Date(task.dueDate).toLocaleDateString("en-GB", {
                month: "short",
              })}`}
            </div>
          )}
          <div className="task-status">
            {!(task.status === "Backlog") && (
              <button onClick={() => handleStatusChange("Backlog")}>
                BACKLOG
              </button>
            )}
            {!(task.status === "Inprogress") && (
              <button onClick={() => handleStatusChange("Inprogress")}>
                PROGRESS
              </button>
            )}
            {!(task.status === "Todo") && (
              <button onClick={() => handleStatusChange("Todo")}>To-Do</button>
            )}
            {!(task.status === "Done") && (
              <button onClick={() => handleStatusChange("Done")}>DONE</button>
            )}
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          message="Delete"
          onCancel={() => setPopupOpen(false)}
          id={task._id}
        />
      )}
      {addtask && (
        <Addtask onCancel={() => setTaskOpen(false)} edittask={task} />
      )}
    </>
  );
};

export default TaskCard;
