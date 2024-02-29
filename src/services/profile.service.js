import axios from 'axios';
import authHeader from './utils/auth-header';

const API_URL = 'http://localhost:8080/api/';

const getProfiles = async () => {
  return await axios
    .get(API_URL + 'profiles', { headers: authHeader() })
    .then(async response => {
      await delay(1);
      return response.data;
    });
};

const getProfilesByFirstName = async firstName => {
  return await axios
    .get(API_URL + 'profiles?firstName=' + firstName, { headers: authHeader() })
    .then(async response => {
      await delay(1);
      return response.data;
    });
};

const getProfile = async id => {
  return await axios
    .get(API_URL + 'profiles/' + id, { headers: authHeader() })
    .then(async response => {
      await delay(1);
      return response.data;
    });
};

const updateProfile = async (id, profile) => {
  return await axios
    .put(API_URL + 'profiles/' + id, profile, { headers: authHeader() })
    .then(async response => {
      await delay(1);
      return response.data;
    });
};

const deleteProfile = async id => {
  return await axios
    .delete(API_URL + 'profiles/' + id, { headers: authHeader() })
    .then(async response => {
      await delay(1);
      return response.data;
    });
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ProfileService = {
  getProfiles,
  getProfilesByFirstName,
  getProfile,
  updateProfile,
  deleteProfile
};

export default ProfileService;
