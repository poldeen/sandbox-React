import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/profiles';

const register = (firstName, lastName, username, uniqueId, password) => {
  return axios.post(API_URL, {
    firstName,
    lastName,
    username,
    uniqueId,
    password
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + '/signin', {
      username,
      password
    })
    .then(response => {
      //console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  });

  console.log(
    'Retrieving current user:' +
      user.firstName +
      ' ' +
      user.lastName +
      ', ' +
      user.email
  );
  return user;
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default AuthService;
