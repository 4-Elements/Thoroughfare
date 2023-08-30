import {
  NavLink,
  Outlet,
  useRouteLoaderData,
  useNavigate,
} from 'react-router-dom';
import React, { useContext, useEffect, setUserType } from 'react';
import { StoreContext } from './Store';

export default function Home() {
  const userData = useRouteLoaderData('home');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUserData, setUserType, userType } =
    useContext(StoreContext);

  useEffect(() => {
    if (userData.hasOwnProperty('userType')) {
      setIsLoggedIn(true);
      setUserData(userData);
      setUserType(userData.userType);
      if (userData.userType === 'mentor') {
        return navigate('mentees');
      } else if (userData.userType === 'mentee') {
        return navigate('lessons');
      }
    } else {
      console.log('not auth');
      navigate('/login');
    }
  }, []);

  return (
    <div className="home-layout">
      <header>
        <nav>
          {userType == 'mentor' && (
            <NavLink to={'/mentees'} className="nav-btn">
              Mentees
            </NavLink>
          )}
          {userType == 'mentor' && (
            <NavLink to={'/library'} className="nav-btn">
              Lesson Library
            </NavLink>
          )}
          {userType == 'mentee' && (
            <NavLink to={'/lessons'} className="nav-btn">
              Lessons
            </NavLink>
          )}
          {userType == '' && (
            <NavLink to={'/login'} className="nav-btn">
              Login
            </NavLink>
          )}
          {userType == '' && (
            <NavLink to={'/signup'} className="nav-btn">
              Sign Up
            </NavLink>
          )}
          {userType !== '' && (
            <NavLink to={'/chat'} className="nav-btn">
              Chat
            </NavLink>
          )}
          {userType !== '' && (
            <NavLink to={'/logout'} className="nav-btn">
              Log Out
            </NavLink>
          )}
        </nav>
      </header>
      <div className="main-body">
        <Outlet />
      </div>
    </div>
  );
}
