// ---- TO DO LIST ----

// ---- imports go here ----
import React from 'react';
import Mentee from './Mentee.jsx';
import './CurrentMenteeList.scss';

// ---- build & export the current mentee list here ----
const CurrentMenteeList = (props) => {
  const menteeComponents = [];

  props.currentMentees.forEach((currentMentee) => {
    menteeComponents.push(
      <Mentee menteeInfo={currentMentee} key={currentMentee.name} />
    );
  });

  return (
    <div className="menteeList">
      <div>Current Mentees</div>
      {menteeComponents}
    </div>
  );
};

export default CurrentMenteeList;
