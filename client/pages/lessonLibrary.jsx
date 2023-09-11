import React, { useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import Lesson from './Lesson.jsx';

const LessonLibrary = () => {
  const userData = useRouteLoaderData('home');
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    console.log(userData);
    const newLessons = [];
    if (userData.lessonData) {
      userData.lessonData.forEach((lesson) => {
        console.log(456, lesson);
        const newLesson = (
          <Lesson
            lessonNumber={lesson.lessonNumber}
            lessonName={lesson.lessonName}
            taskCount={lesson.tasks.length}
            key={lesson.lessonNumber + lesson.lessonName}
          />
        );
        newLessons.push(newLesson);
      });
    }
    if (newLessons.length) setLessons(newLessons);
  }, []);

  return (
    <div className='mentorDash'>
      <h1 className='mentorDashTitle'>Lesson Library</h1>
      <div className='currentMenteeList'>{lessons}</div>
    </div>
  );
};

export default LessonLibrary;
