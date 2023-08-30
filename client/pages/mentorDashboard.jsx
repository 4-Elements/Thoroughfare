// ---- TO DO ----
// Add query string to getMentees function
// If backend has not built out request to get mentees, need to add that.  The functionality assumes the response will be an array of objects, with each object representing a mentee (and containing that mentees current projects, tasks, and chats)

// ---- imports go here ----
import React from 'react';
import { useState, useEffect } from 'react';
// import './mentorDashboard.scss';
import CurrentMenteeList from '../components/CurrentMenteeList.jsx';

// ---- build and export mentor dashboard here ----
export default function mentorDash() {
  const [currentMentees, setCurrentMentees] = useState([]);

  // const getMentees = () => {
  //   console.log('getMentees invoked');
  //   fetch('/api/user/');
  //   {
  //     method: 'GET',
  //       (headers = {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGVlZDZmYmM4YjA5OThkZmMyZThjYzEiLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNjkzMzkzODUyLCJleHAiOjE2OTM0ODAyNTJ9.LVyytnUK9JWXaYUftEOS-mt7qVdHA9WDfmSgU8B41qI`,
  //         'Content-Type': 'application/json',
  //       }
  //         .then((resp) => resp.json())
  //         .then((data) => {
  //           console.log('data', data);
  //           setCurrentMentees(data);
  //         }));
  //   }

  // getMentees();

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
      <div id='currentMenteelist'>
      <CurrentMenteeList currentMentees={currentMentees} />
      </div>
    </div>
  );
}
