// ---- imports go here ----
// import ChatFeed from './ChatFeed.jsx';
import { useState } from 'react';
import React from 'react';
// import './Task.scss';

// ---- build Task here ----
const Task = (props) => {
  return (
    <div className='taskFeedSample'>
      <div>Task Name: {props.taskName}</div>
      <div></div>
      {/* <ChatFeed taskName={props.taskName} /> */}
    </div>
  );
};

export default Task;
