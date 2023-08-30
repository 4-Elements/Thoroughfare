// ---- TO DO LIST HERE ----

// ---- Imports go here ----
import React from 'react';
import Task from './Task.jsx';
import './TaskFeed.scss';

// ---- Build & Export the Project component here ----
const TaskFeed = (props) => {
  return (
    <div className="TaskFeed">
      <div>Task Feed</div>
      <Task />
    </div>
  );
};

export default TaskFeed;
