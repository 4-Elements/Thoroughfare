// ---- TO DO ----

// ---- Imports go here ----
import React from 'react';
import ProjectFeed from './ProjectFeed.jsx';

// ---- build & export Mentee component here ----

const Mentee = (props) => {
  return (
    <div>
      <div>Mentee Name: {props.menteeInfo.name}</div>
      <ProjectFeed
        lessonsAssigned={props.menteeInfo.lessonsAssigned}
        name={props.menteeInfo.name}
      />
    </div>
  );
};

export default Mentee;
