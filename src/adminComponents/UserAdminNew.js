import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileService from 'services/profile.service';

const UserAdminNew = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchFirstName, setSearchFirstName] = useState('');

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onUserSearch = e => {
    const searchFirstName = e.target.value;
    setSearchFirstName(searchFirstName);
  };

  const retrieveUsers = () => {
    ProfileService.getProfiles()
      .then(response => {
        setUsers(response);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const findByFirstName = () => {
    ProfileService.getProfilesByFirstName(searchFirstName)
      .then(response => {
        setUsers(response);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchFirstName}
            onChange={onUserSearch}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByFirstName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>User List</h4>

        <ul className="list-group">
          {users &&
            users.map((user, index) => (
              <li
                className={
                  'list-group-item ' + (index === currentIndex ? 'active' : '')
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.firstName}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>FirstName:</strong>
              </label>{' '}
              {currentUser.firstName}
            </div>
            <div>
              <label>
                <strong>LastName:</strong>
              </label>{' '}
              {currentUser.lastName}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{' '}
              {currentUser.username}
            </div>

            <Link
              to={'/users/' + currentUser.profileId}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAdminNew;
