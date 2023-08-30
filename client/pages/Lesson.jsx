import React from 'react';

const Lesson = ({ lessonNumber, lessonName, taskCount }) => {
  console.log(123, lessonNumber, lessonName, taskCount);
  return (
    <div className='lesson'>
      <h3>{`${lessonNumber}. ${lessonName}`}</h3>
      <h5>{taskCount + ' Tasks'}</h5>
    </div>
  );
};

export default Lesson;
