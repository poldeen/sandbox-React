import { empty } from 'is_js';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from 'services/auth.service';
import validator from 'validator';

const RegistrationForm = ({ hasLabel }) => {
  // State
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAccepted: false
  });

  // Handler
  const handleSubmit = e => {
    e.preventDefault();

    const allErrors = {};

    // Validation
    if (!validator.isLength(formData.firstName, { min: 2, max: undefined })) {
      allErrors.firstName = 'Please supply a valid first name';
    }

    if (!validator.isLength(formData.lastName, { min: 2, max: undefined })) {
      allErrors.lastName = 'Please supply a valid last name';
    }

    if (!validator.isEmail(formData.email)) {
      allErrors.email = 'Please supply a valid email';
    }

    if (!validator.equals(formData.password, formData.confirmPassword)) {
      allErrors.password = 'Passwords do not match';
    }

    if (!empty(allErrors)) {
      setErrors(allErrors);
    } else {
      if (checkBtn.length != 0) {
        AuthService.register(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.email,
          formData.password
        ).then(
          () => {
            AuthService.login(formData.email, formData.password).then(
              () => {
                navigate('/user/profile');
                toast.success(`Logged in as ${formData.email}`, {
                  theme: 'colored'
                });
              },
              error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                console.log(resMessage);
              }
            );
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            console.log('This is the response message:  ' + resMessage);
          }
        );
      }
    }
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit} ref={form}>
      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>First Name</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'First Name' : ''}
            value={formData.firstName}
            name="firstName"
            onChange={handleFieldChange}
            type="text"
            isInvalid={!!errors.firstName}
            feedback="Error"
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Last Name</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Last Name' : ''}
            value={formData.lastName}
            name="lastName"
            onChange={handleFieldChange}
            type="text"
            isInvalid={!!errors.lastName}
            feedback="Error"
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          value={formData.email}
          name="email"
          autoComplete="username"
          onChange={handleFieldChange}
          type="text"
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Password' : ''}
            value={formData.password}
            name="password"
            autoComplete="new-password"
            onChange={handleFieldChange}
            type="password"
            feedback="Error"
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Confirm Password</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={formData.confirmPassword}
            name="confirmPassword"
            autoComplete="new-password"
            onChange={handleFieldChange}
            type="password"
            isInvalid={!!errors.password}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" id="acceptCheckbox" className="form-check">
          <Form.Check.Input
            type="checkbox"
            name="isAccepted"
            checked={formData.isAccepted}
            onChange={e =>
              setFormData({
                ...formData,
                isAccepted: e.target.checked
              })
            }
          />
          <Form.Check.Label className="form-label">
            {/*TODO: Get a terms and privacy policy */}I accept the{' '}
            <Link to="#!">terms</Link> and <Link to="#!">privacy policy</Link>
          </Form.Check.Label>
        </Form.Check>
      </Form.Group>
      <Form.Group className="mb-4">
        <Button
          className="w-100"
          type="submit"
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            !formData.isAccepted
          }
          ref={checkBtn}
        >
          Register
        </Button>
      </Form.Group>

      {/*TODO: Implment SSO with Google 
      
      <Divider>or register with</Divider>

      <SocialAuthButtons /> */}
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
