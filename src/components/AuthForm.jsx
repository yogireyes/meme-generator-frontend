import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AuthForm = ({ onSubmit, errors, authError, buttonText, linkText, linkTo }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        <div className="col-12">
          <div className="input-group">
            <span className="input-group-text"><i className="far fa-envelope"></i></span>
            <input
              type="email"
              className={`form-control ${errors && errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors && errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12">
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-unlock-alt"></i></span>
            <input
              type="password"
              className={`form-control ${errors && errors.password ? 'is-invalid' : ''}`}
              placeholder="*****"
              {...register('password', { required: 'Password is required' })}
            />
            {errors && errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          {authError && <small className="text-danger">{authError}</small>}
        </div>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-success">{buttonText}</button>
      </div>
      <hr className="text-muted w-25 mx-auto" />
      <p className="text-muted text-center mb-0">{linkText} <Link to={linkTo} className="text-info">{linkText.toLowerCase()}</Link></p>
    </form>
  );
};

export default AuthForm;