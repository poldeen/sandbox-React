import { useUser } from 'context/userContext';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }) => {
  const location = useLocation();
  //const currentUser = AuthService.getCurrentUser();
  //console.log(currentUser.roles[0]);

  const { user } = useUser();

  const content =
    user && user.roles.some(e => allowedRoles.includes(e)) ? (
      <Outlet />
    ) : (
      <Navigate
        to="/authentication/card/login"
        state={{ from: location }}
        replace
      />
    );

  return content;
};

export default ProtectedRoutes;
