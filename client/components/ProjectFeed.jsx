// ---- TO DO LIST ----

// ---- imports go here ----
import React from 'react';
import Project from './Project.jsx';
import { useRouteLoaderData } from 'react-router-dom';

// ---- build & export project feed component here ----
const ProjectFeed = (props) => {
  const userData = useRouteLoaderData('home');
  const lessonComponentArray = [];

  const menteeName = props.name;

  let currentMenteeData;
  userData.menteeData.forEach((currentMentee) => {
    if (currentMentee.username === menteeName)
      currentMenteeData = currentMentee;
  });

  console.log('currentMenteeData', currentMenteeData);

  const buildProjectFeed = () => {
    currentMenteeData.lessonsAssigned.forEach((currentLesson) => {
      lessonComponentArray.push(
        <Project key={currentLesson.name} projectInfo={currentLesson} />
      );
    });
  };

  buildProjectFeed();

  if (lessonComponentArray.length === 0) {
    lessonComponentArray.push(<div>No Lessons Currently Assigned</div>);
  }

  return (
    <div id={props.name + 'ProjectFeed'}>
      <div>Current Projects</div>
      {lessonComponentArray}
    </div>
  );
};

export default ProjectFeed;
