import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/Parentcontext';
import "./Signuppage.css"

const Formpage = () => {
  const navigate = useNavigate();

  //using useForm 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
    watch, 
  } = useForm();

  // destructuring the value of isblur using useContext.
  const { isblur, setIsBlur } = useContext(AppContext);


  const onSubmit = (data) => {
    console.log(data);

// setting data to local storage.
    localStorage.setItem('booksData', JSON.stringify(data));
    setIsBlur(false);
    navigate('/');
  };

  return (
    <div className="body">
      <div className="form-container">
        <fieldset>
          <legend>Sign up</legend>

          {/* Success Message */}
          {isSubmitSuccessful && isSubmitted && (
            <div className="success">
              <p>Registration Successful</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Error Messages */}
            <label>Your Name</label>
            <input
              type="text"
              name="firstName"
              {...register('Name', {
                required: 'Fill Your name',
                minLength: { value: 3, message: 'Minimum 3 characters required' },
                maxLength: { value: 30, message: 'Maximum 30 characters required' },
              })}
            />
            <p className="err">{errors.Name && errors.Name.message}</p>

            <label>Email</label>
            <input
              type="email"
              name="email"
              {...register('email', {
                required: 'Enter your email',
                message: 'Enter your email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'must include @',
                },
              })}
            />
            <p className="err">{errors.email && errors.email.message}</p>

            <label>Password</label>
            <input
              type="password"
              name="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 10, message: 'Minimum 10 characters required' },
                pattern: {
                  value: /^(?=.*[!@#$%^&*()\-_=+{};:,<.>])/,
                  message: 'must include one special character',
                },
              })}
            />
            <p className="err">{errors.password && errors.password.message}</p>

            <label>Repeat password</label>
            <input
              type="password"
              name="repeatPassword"
              {...register('repeatPassword', {
                required: 'Repeat password is required',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
            />
            <p className="err">{errors.repeatPassword && errors.repeatPassword.message}</p>

            <input className="button" type="submit" value={'sign up'} />
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Formpage;