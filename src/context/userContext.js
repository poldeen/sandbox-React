import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const UserContext = React.createContext(null);

export function UserProvider(props) {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));

    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const contextValue = {
    user
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
