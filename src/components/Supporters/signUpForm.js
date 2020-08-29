/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import ResponseAlert from '../ResponseAlert/ResponseAlert'
import Loading from '../Loading/Loading'
import ErrorCard from '../ErrorCard/ErrorCard'
import signUpValidator from './utilities/signUpValidator'
import PasswordInput from './utilities/PasswordInput'
import envURL from '../../envURL';

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
      document.title = "Become my follower";
    }, []);
  
 
    const signUp = (e)=>{
        e.preventDefault();
        if (signUpValidator(user).valid) {
          setRequest(true);
          const sanitizedData = signUpValidator(user).sanitized;
          fetch(`${envURL}/auth/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(sanitizedData),
          })
            .then((res) => res.json()
              .then(jsonRes => ({ successful: res.ok, message: jsonRes.message })))
            .then(setResponse)
            .then(()=>setRequest(false))
            .catch(console.error);
            // setErrors([]) // empty displayble arrays
        } else {
          setErrors(signUpValidator(user).errors);
        }
    }
  
    return ( 
      <form className="sign-form" onSubmit={signUp}>
        <h3>Sign Up</h3>
        {response 
          ? (  <ResponseAlert response={response} setResponse={setResponse} />) 
          : (<div>{requestStarted ? <Loading message="Processing your registration" /> : null}{" "} </div>)}
        {(displayableErrors)? <ErrorCard errors={displayableErrors} suggestions={signUpValidator(user).suggestions} setErrors={setErrors} />:null} 
        <div className="form-group">
          <label className="input" htmlFor="follower-sign-up-first-name">
            First name
            <input
              id="follower-sign-up-first-name"
              name="firstName"
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={inputHandler}
            />
          </label>
          
        </div>

        <div className="form-group">
          <label className="input" htmlFor="follower-sign-up-last-name">
            Last name
            <input
              id="follower-sign-up-last-name"
              name="lastName"
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={inputHandler}
            />
          </label>
       
        </div>

        <div className="form-group">
          <label className="input" htmlFor="follower-sign-up-email">
            Email address
            <input
              id="follower-sign-up-email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={inputHandler}
            />
          </label>
        
        </div>

        <PasswordInput id='sign-up' inputHandler={inputHandler} strength={signUpValidator(user).passwordStrength} />
        <button type="submit" className="submit-btn primary">
          Sign Up
        </button>
        <p className="alredy-registered-question text-right">
          Already registered? <a href="#one-panel">sign on</a>
        </p>
      </form>
        
    )}

    export default SignUpForm