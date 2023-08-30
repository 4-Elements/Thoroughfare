// ---- TO DO LIST ----

// ---- imports go here ----
import React, { useContext } from 'react';
import Mentee from './Mentee.jsx';
import { useRouteLoaderData } from 'react-router-dom';

// ---- build & export the current mentee list here ----
const CurrentMenteeList = (props) => {
  const userData = useRouteLoaderData('home');
  const menteeComponents = [];

  userData.menteeData.forEach((currentMentee) => {
    menteeComponents.push(
      <Mentee
        key={currentMentee.username}
        menteeName={currentMentee.username}
      />
    );
  });

  return (
    <div>
      <div>Current Mentees</div>
      {menteeComponents}
    </div>
  );
};

export default CurrentMenteeList;
