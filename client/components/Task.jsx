// ---- imports go here ----
import ChatFeed from './ChatFeed.jsx';
import { useState } from 'react';

// ---- build Task here ----
export default task = (props) => {
  return (
    <div className='taskFeedSample'>
      <div>Task Name: {props.taskName}</div>
      <div></div>
      <ChatFeed taskName={props.taskName} />
    </div>
  );
};
