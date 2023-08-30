// ---- TO DO LIST HERE ----

// ---- Imports go here ----
import React from 'react';
import TaskFeed from './TaskFeed.jsx';
import './Project.scss';

// ---- Build & Export the Project component here ----
const Project = (props) => {
  return (
    <div className="Project">
      <div>Project: {props.projectInfo.name}</div>
      <TaskFeed />
    </div>
  );
};

export default Project;
