// imports go here
// import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Test from './components/testFile.jsx';
// import ChatFeed from './components/ChatFeed.jsx';
import Navbar from './components/Navbar.jsx';
import MentorDash from './pages/mentorDashboard.jsx';
//import Style Sheets:
import './styles/styles.scss';
import './styles/mentorDashboard.scss';
// export the app as a default, returning the routes to the various pages

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <MentorDash />
      <div>
        <p>hello</p>
      </div>
      <Test />
      {/* <ChatFeed /> */}
    </div>
  );
}
