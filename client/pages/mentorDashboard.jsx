// ---- TO DO ----
// Add query string to getMentees function
// If backend has not built out request to get mentees, need to add that.  The functionality assumes the response will be an array of objects, with each object representing a mentee (and containing that mentees current projects, tasks, and chats)

// ---- imports go here ----
import React from 'react';
import { useState, useEffect } from 'react';
import './mentorDashboard.scss';
import CurrentMenteeList from '../components/CurrentMenteeList.jsx';

// ---- build and export mentor dashboard here ----
export default function mentorDash() {
  const [currentMentees, setCurrentMentees] = useState([]);

  const getMentees = () => {
    fetch(queryString)
      .then((resp) => resp.json())
      .then((data) => {
        setCurrentMentees(data);
      });
  };

  // NOTE: This is just for testing & should be removed later
  useEffect(
    () =>
      setCurrentMentees([
        {
          name: 'Todd',
          lessonsAssigned: [{ name: 'React' }, { name: 'Redux' }],
        },
      ]),
    []
  );

  // remove this - it is just for testing

  return (
    <div className="mentorDash">
      <h1>Mentor Dashboard</h1>
      <CurrentMenteeList currentMentees={currentMentees} />
    </div>
  );
}
