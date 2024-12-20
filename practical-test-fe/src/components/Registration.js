import React from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const password = watch('password');

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser(data));
    if (!result.error) {
      navigate('/login');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Registration</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Minimum length is 2 characters' }
            })}
            isInvalid={!!errors.firstName}
          />
          {errors.firstName && (
            <Form.Control.Feedback type="invalid">
              {errors.firstName.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Minimum length is 2 characters' }
            })}
            isInvalid={!!errors.lastName}
          />
          {errors.lastName && (
            <Form.Control.Feedback type="invalid">
              {errors.lastName.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            isInvalid={!!errors.email}
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            isInvalid={!!errors.password}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            isInvalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="I accept the terms and conditions"
            {...register('acceptTerms', {
              required: 'You must accept the terms and conditions'
            })}
            isInvalid={!!errors.acceptTerms}
          />
          {errors.acceptTerms && (
            <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
              {errors.acceptTerms.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default Registration;
