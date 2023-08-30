// ---- TO DO LIST HERE ----

// ---- Imports go here ----
import React from 'react';
import TaskFeed from './TaskFeed.jsx';

// ---- Build & Export the Project component here ----
const Project = (props) => {
  return (
    <div>
      <div>Project: {props.projectInfo.name}</div>
      <TaskFeed />
    </div>
  );
};

export default Project;
