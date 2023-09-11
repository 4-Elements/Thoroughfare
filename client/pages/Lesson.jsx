import React from 'react';

const Lesson = ({ lessonNumber, lessonName, taskCount }) => {
  console.log(123, lessonNumber, lessonName, taskCount);
  return (
    <div className='Mentee'>
      <div className='MenteeNameAndButton'>
        <div className='menteeName'>{`${lessonNumber}. ${lessonName}`}</div>
        <h5>{taskCount + ' Tasks'}</h5>
      </div>
    </div>
  );
};

export default Lesson;
