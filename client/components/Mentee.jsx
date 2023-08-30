// ---- TO DO ----

// ---- Imports go here ----
import React from 'react';
import ProjectFeed from './ProjectFeed.jsx';
import './Mentee.scss';

// ---- build & export Mentee component here ----

const Mentee = (props) => {
  const handleShowProjectsClick = () => {
    const showHideButton = document.getElementById(
      props.menteeInfo.name + 'Show/HideButton'
    );
    const projectsFeed = document.getElementById(
      props.menteeInfo.name + 'ProjectFeed'
    );
    if (projectsFeed.style.display === 'none') {
      projectsFeed.style.display = 'grid';
      showHideButton.innerText = 'Hide Projects';
    } else {
      projectsFeed.style.display = 'none';
      showHideButton.innerTest = 'Show Projects';
    }
  };
  return (
    <div className="Mentee">
      <div className="MenteeNameAndButton">
        <div>Mentee Name: {props.menteeInfo.name}</div>
        <button
          id={props.menteeInfo.name + 'Show/HideButton'}
          onClick={() => handleShowProjectsClick()}
        >
          Show Projects
        </button>
      </div>
      <ProjectFeed
        lessonsAssigned={props.menteeInfo.lessonsAssigned}
        name={props.menteeInfo.name}
      />
    </div>
  );
};

export default Mentee;
