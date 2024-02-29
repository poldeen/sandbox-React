import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileService from 'services/profile.service';

const User = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialUserState = {
    id: null,
    firstName: '',
    lastName: '',
    username: ''
  };

  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState('');

  const getUser = id => {
    ProfileService.getProfile(id)
      .then(response => {
        setCurrentUser(response);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getUser(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    ProfileService.updateProfile(currentUser.profileId, currentUser)
      .then(response => {
        console.log(response);
        navigate('/adminNew/user');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    ProfileService.deleteProfile(currentUser.profileId)
      .then(response => {
        console.log(response.data);
        navigate('/adminNew/user');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          {currentUser ? (
            <div className="edit-form">
              <h4>User</h4>
              <Row className="g-3 mb-3">
                <Form.Label column="sm" lg={2}>
                  First Name
                </Form.Label>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={currentUser.firstName}
                    onChange={handleInputChange}
                  />
                </Col>

                <Form.Label column="sm" lg={2}>
                  Last Name
                </Form.Label>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={currentUser.lastName}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
              <Row className="g-3  mb-3">
                <Form.Label column="sm" lg={2}>
                  Email
                </Form.Label>
                <Col>
                  <Form.Control
                    size="sm"
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={currentUser.username}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>

              <button className="badge badge-danger mr-2" onClick={deleteUser}>
                Delete
              </button>

              <button
                type="submit"
                className="badge badge-success"
                onClick={updateUser}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default User;
