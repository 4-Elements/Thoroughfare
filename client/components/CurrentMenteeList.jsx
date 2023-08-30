// ---- TO DO LIST ----

// ---- imports go here ----
import React, { useState, useEffect } from 'react';
import Mentee from './Mentee.jsx';
import { useRouteLoaderData } from 'react-router-dom';

// ---- build & export the current mentee list here ----
const CurrentMenteeList = (props) => {
  const userData = useRouteLoaderData('home');
  const [menteeComponents, setMenteeComponents] = useState([]);

  useEffect(() => {
    if (userData.menteeData) {
      const newMenteeData = [];
      userData.menteeData.forEach((currentMentee) => {
        newMenteeData.push(
          <Mentee
            key={currentMentee.username}
            menteeName={currentMentee.username}
          />
        );
      });
      setMenteeComponents(newMenteeData);
    }
  }, []);

  return (
    <div>
      <div>Current Mentees</div>
      {menteeComponents}
    </div>
  );
};

export default CurrentMenteeList;
