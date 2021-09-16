import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [verify, setVerify] = useState(false);

  const saveUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const fetchUser = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get('/api/v1/users/showMe');
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        saveUser,
        user,
        logoutUser,
        verify,
        setVerify,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
