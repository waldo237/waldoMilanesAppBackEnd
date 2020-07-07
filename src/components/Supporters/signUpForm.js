/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import ResponseAlert from '../ResponseAlert/ResponseAlert'
import Loading from '../Loading/Loading'
import ErrorCard from '../ErrorCard/ErrorCard'
import signUpValidator from './signUpValidator'

const SignUpForm = () =>{ 
    const [user] = useState({});
    const [response, setResponse] = useState(null);
    const [requestStarted, setRequest] = useState(false);
    const [displayableErrors, setErrors] = useState([]);
  
    const inputHandler = (event) => {
      const { name } = event.target;
      user[name] = event.target.value;
      setErrors(signUpValidator(user).errors.filter((e) => e.type === name));
    };
  
    useEffect(() => {
      document.title = "Become my supporter";
    }, []);
  

    const signUp = (e)=>{
      console.log(user)
        e.preventDefault();
        if (signUpValidator(user).valid) {
          setRequest(true);
          const sanitizedData = signUpValidator(user).sanitized;
          fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(sanitizedData),
          })
            .then((res) => res.json())
            .then(setResponse)
            .catch(console.error);
        } else {
          setErrors(signUpValidator(user).errors);
        }
    }
  
    return ( 
      <form className="sign-form" onSubmit={signUp}>
        <h3>Sign Up</h3>
        {response 
          ? (<ResponseAlert response={response} />) 
          : (<div>{requestStarted ? <Loading message=" your authentication" /> : null}{" "} </div>)}
        <ErrorCard errors={displayableErrors} />
        <div className="form-group">
          <label className="input" htmlFor="supporter-sign-up-first-name">
            First name
            <input
              id="supporter-sign-up-first-name"
              name="firstName"
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={inputHandler}
            />
          </label>
          
        </div>

        <div className="form-group">
          <label className="input" htmlFor="supporter-sign-up-last-name">
            Last name
            <input
              id="supporter-sign-up-last-name"
              name="lastName"
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={inputHandler}
            />
          </label>
       
        </div>

        <div className="form-group">
          <label className="input" htmlFor="supporter-sign-up-email">
            Email address
            <input
              id="supporter-sign-up-email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={inputHandler}
            />
          </label>
        
        </div>

        <div className="form-group">
          <label className="input" htmlFor="supporter-sign-up-password">
            Password
            <input
              id="supporter-sign-up-password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={inputHandler}
            />
          </label>
        
        </div>

        <button type="submit" className="submit-btn primary">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </form>
        
    )}

    export default SignUpForm