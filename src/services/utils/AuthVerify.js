import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = props => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      const decodedJwt = parseJwt(user.token);
      console.log('AuthVerify.js - Time until logout');
      console.log(decodedJwt.exp * 1000);
      console.log(Date.now());

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
        navigate('/authentication/card/logout');
      }
    }
  }, [location, props]);

  return;
};

export default AuthVerify;
