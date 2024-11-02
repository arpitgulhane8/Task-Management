import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSharedTask } from "../redux/action/taskaction";
import { useParams } from "react-router-dom";
import codesandbox from "../assests/codesandbox.png";
import "../styles/sharedtask.css";

function SharedTask() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shareTaskData } = useSelector((state) => state.task);

  useEffect(() => {
    if (id) {
      dispatch(getSharedTask(id));
    }
  }, [dispatch, id]);

  const checkedTasksCount =
    shareTaskData?.checklist?.filter((task) => task.completed).length || 0;

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

  return (
    <div className="sharedTask">
      <div className="sharedTask_header">
        <h2>
          <img src={codesandbox} alt="logo" /> Promanage
        </h2>
      </div>
      <div className="sharedTask_component">
        <div className="sharedTask_priorityStatus">
          <span
            className="sharedTask_priorityDot"
            style={{
              backgroundColor: getPriorityColor(shareTaskData?.priority),
            }}
          ></span>
          <h6>{shareTaskData?.priority}</h6>
        </div>
        <h4 className="sharedTask_title">{shareTaskData?.title}</h4>
        <div className="sharedTask_checklist">
          <div className="sharedTask_checklistContent">
            <p>
              Checklist ({checkedTasksCount}/
              {shareTaskData?.checklist?.length || 0})
            </p>
          </div>

          {shareTaskData?.checklist?.map((item, index) => (
            <div
              key={index}
              className={`sharedTask_taskItem ${item.completed ? "done" : ""}`}
            >
              <input type="checkbox" checked={item.completed} readOnly />
              <label className="sharedTask_taskLabel">{item.text}</label>
            </div>
          ))}
        </div>

        {shareTaskData?.dueDate && (
          <div className="sharedTask_duedate">
            <div className="sharedTask_duedate_title">Due Date :</div>
            <div
              className="sharedTask_duedate_date"
              style={{
                backgroundColor:
                  shareTaskData.priority === "HIGH PRIORITY"
                    ? "#CF3636"
                    : "gray",
              }}
            >
              {`${new Date(shareTaskData.dueDate).getDate()}${
                ["th", "st", "nd", "rd"][
                  new Date(shareTaskData.dueDate).getDate() % 10 > 3 ||
                  [11, 12, 13].includes(
                    new Date(shareTaskData.dueDate).getDate()
                  )
                    ? 0
                    : new Date(shareTaskData.dueDate).getDate() % 10
                ]
              } ${new Date(shareTaskData.dueDate).toLocaleDateString("en-GB", {
                month: "short",
              })}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SharedTask;
