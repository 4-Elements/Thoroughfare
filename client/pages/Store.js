import React, { useState } from 'react';

export const StoreContext = React.createContext({});

function StoreProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [userType, setUserType] = useState('');

  const States = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    userData: userData,
    setUserData: setUserData,
    userType: userType,
    setUserType: setUserType,
  };

  return (
    <StoreContext.Provider value={States}>{children}</StoreContext.Provider>
  );
}
export default StoreProvider;
