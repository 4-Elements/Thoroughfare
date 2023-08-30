// ---- TO DO ----

// ---- Imports go here ----
import React from 'react';
import ProjectFeed from './ProjectFeed.jsx';
import { useRouteLoaderData } from 'react-router-dom';

// ---- build & export Mentee component here ----

const Mentee = (props) => {
  const userData = useRouteLoaderData('home');

  const handleShowProjectsClick = () => {
    const showHideButton = document.getElementById(
      props.menteeName + 'Show/HideButton'
    );
    const projectsFeed = document.getElementById(
      props.menteeName + 'ProjectFeed'
    );
    if (projectsFeed.style.display === 'none') {
      projectsFeed.style.display = 'grid';
      showHideButton.innerText = 'Hide Projects';
    } else {
      projectsFeed.style.display = 'none';
      showHideButton.innerText = 'Show Projects';
    }
  };

  return (
    <div className="Mentee">
      <div className="MenteeNameAndButton">
        <div className="menteeName">Mentee Name: {props.menteeName}</div>
        <button
          id={props.menteeName + 'Show/HideButton'}
          className="showHideButton"
          onClick={() => handleShowProjectsClick()}
        >
          Hide Projects
        </button>
      </div>
      <ProjectFeed name={props.menteeName} />
    </div>
  );
};

export default Mentee;
