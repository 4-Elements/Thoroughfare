import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';

import Navbar from './pages/NavBar.jsx';
import * as loaders from './pages/UserLoader.js';

import Home from './pages/Home.jsx';
import LessonLibrary from './pages/lessonLibrary.jsx';
import MentorDash from './pages/mentorDashboard.jsx';
import MenteeDash from './pages/menteeDashboard.jsx';
import Login from './pages/login.jsx';
import Signup from './pages/signup.jsx';
// import ChatFeed from './components/ChatFeed.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Home />} loader={loaders.userLoader} id='home'>
      <Route path='/library' element={<LessonLibrary />} />
      <Route path='/mentees' element={<MentorDash />} />
      <Route path='/lessons' element={<MenteeDash />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
