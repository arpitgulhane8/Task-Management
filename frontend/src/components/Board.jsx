import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import "../styles/bord.css";
import { useSelector, useDispatch } from "react-redux";
import AddPopup from "./popups/AddPopup";
import Addtask from "./popups/Addtask";
import { fetchTasks } from "../redux/action/taskaction";

function Board() {
  const dispatch = useDispatch();
  const columns = ['Backlog', 'Todo', 'Inprogress', 'Done'];
  const options = ["Today", 'This Week', 'This Month'];
  const { userinfo } = useSelector((state) => state.auth);
  const [selectedFilter, setSelectedFilter] = useState("This Week");
  const [addpopup, setPopupOpen] = useState(false);
  const [addtask, setTaskOpen] = useState(false);
  const { tasks } = useSelector((state) => state.task);

  // Maintain a separate closeAll state for each column
  const [closeAll, setCloseAll] = useState({
    Backlog: false,
    Todo: false,
    Inprogress: false,
    Done: false,
  });

  // Function to handle closing all TaskCard checklists in a specific column
  const handleCloseAll = (column) => {
    setCloseAll((prev) => ({
      ...prev,
      [column]: true,
    }));
    // Reset the closeAll for the column after triggering it
    setTimeout(() => setCloseAll((prev) => ({ ...prev, [column]: false })), 0);
  };

  useEffect(() => {
    dispatch(fetchTasks({ selectedFilter }));
  }, [dispatch, selectedFilter]);

  return (
    <> 
      <div className="Board_container">
        <div className="Board_header">
          <div className="Board_header_section">
            <h3 className="Board_wlc_msg">Welcome! {userinfo.name}</h3>
            <p>{`${new Date().getDate()}${['th', 'st', 'nd', 'rd'][(new Date().getDate() % 10) - 1] || 'th'} ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`}</p>
          </div>
          <div className="Board_header_section">
            <div className="Board_header_section_component">
              <h2>Board</h2>
              <p onClick={() => setPopupOpen(true)}><i className="fas fa-user-friends"></i> Add People</p>
            </div>
            <select className="Board_select" onChange={(e) => setSelectedFilter(e.target.value)} value={selectedFilter}>
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="board_main">
          {columns.map((col) => (
            <div key={col} className="Board_column">
              <div className="Board_column_header_section">
                <h3>{col}</h3>
                <div className="Board_column_header_section_right">
                  {col === 'Todo' && <i className="fas fa-plus" onClick={() => setTaskOpen(true)}></i>}
                  <i className="far fa-window-restore icon-small" onClick={() => handleCloseAll(col)}></i>
                </div>
              </div>
              <div className="board_main_taskdisplay">
                {tasks.filter(task => task.status === col).length > 0 ? (
                  tasks.filter(task => task.status === col).map((task) => (
                    <TaskCard 
                      key={task._id} 
                      task={task} 
                      closeAll={closeAll[col]} // Pass column-specific closeAll state
                    />
                  ))
                ) : (
                  <p className="no-tasks-message">No tasks available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {addpopup && <AddPopup onCancel={() => setPopupOpen(false)} />}
      {addtask && <Addtask onCancel={() => setTaskOpen(false)} />}
    </>
  );
}

export default Board;
