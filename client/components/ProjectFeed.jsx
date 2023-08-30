// ---- TO DO LIST ----

// ---- imports go here ----
import React from 'react';
import Project from './Project.jsx';

// ---- build & export project feed component here ----
const ProjectFeed = (props) => {
  const lessonComponentArray = [];

  const buildProjectFeed = () => {
    props.lessonsAssigned.forEach((currentLesson) => {
      lessonComponentArray.push(
        <Project key={currentLesson.name} projectInfo={currentLesson} />
      );
    });
  };

  buildProjectFeed();

  return (
    <div id='projectFeed'>
      <div>Current Projects</div>
      {lessonComponentArray}
    </div>
  );
};

export default ProjectFeed;
