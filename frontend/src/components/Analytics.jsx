import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalytics } from '../redux/action/taskaction';
import "../styles/analytic.css";

function Analytics() {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.task || {}); 
  console.log(data);
  const analyticsData = data;

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const categories = [
    "Backlog Tasks",
    "LowPriority Tasks",
    "ToDo task",
    "ModeratePriority Tasks",
    "HighPriority Tasks",
    "InProgress Tasks",
    "Completed Tasks",
    "DueDate Tasks",
  ];

  return (
    <div className="analytics">
      <div className="analytics_container">
        {categories.map((category,index) => (
          <div className="analytics_container_component" key={category}>
            <h4 className='analytics_container_component_one'>{category}</h4>
            <h4>{analyticsData[category.split(' ').join('')] || 0}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analytics;
