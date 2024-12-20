import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      // Remove confirmPassword from the data before sending to API
      const { confirmPassword, ...registrationData } = data;
      await authService.register(registrationData);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            {...register('phoneNumber', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Please enter a valid 10-digit phone number'
              }
            })}
            placeholder="Enter 10-digit phone number"
            isInvalid={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber.message}
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
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
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

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default Registration;
