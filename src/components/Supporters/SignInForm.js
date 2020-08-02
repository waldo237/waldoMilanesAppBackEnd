/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import {useHistory} from 'react-router-dom'
import ResponseAlert from '../ResponseAlert/ResponseAlert'
import Loading from '../Loading/Loading'
import ErrorCard from '../ErrorCard/ErrorCard'
import signInValidator from './utilities/signInValidator'
import PasswordInput from './utilities/PasswordInput'
import {logIn, signWithGoogleOrFB, confirmLoggedIn} from './utilities/authorizationFunctions'

const SignInForm = () => {
  const [user] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);
  const history = useHistory();

  const inputHandler = (event) => {
    const { name } = event.target;
    user[name] = (event.target.checked)? event.target.checked: event.target.value;
    setErrors(signInValidator(user).errors.filter((e) => e.type === name));
  };

  useEffect(() => {
    document.title = "Become my supporter";
  }, []);


  return (
    <form className="sign-form" onSubmit={(e)=>{ e.preventDefault(); logIn(user, setRequest,setResponse, setErrors)}}>
      <div className="o-auth-btns">
        {response
          ? (<ResponseAlert response={response} email={user.email} setResponse={setResponse} />)
          : (<div>{requestStarted ? <Loading message="Checking your credentials" /> : null}{" "} </div>)}
        <ErrorCard errors={displayableErrors} />
        <button type="submit" className="google-btn" onClick={e => { e.preventDefault(); signWithGoogleOrFB('google', setResponse, user.rememberMe) }}>
          {" "}
          <FontAwesomeIcon className="fa-lg" icon={faGoogle} /> sign
          with google
        </button>
        <button
          type="submit"
          className="facebook-btn" 
          // onClick={e => { e.preventDefault(); signWithGoogleOrFB('fb', setResponse, user.rememberMe) }}
          // TESTS
  
          onClick={e => { e.preventDefault(); confirmLoggedIn()}}
        >
          {" "}
          <FontAwesomeIcon
            className="fa-lg"
            icon={faFacebookF}
          />{" "}
          sign with facebook{" "}
        </button>
        <h4 className="or">Or</h4>
      </div>

      <div className="form-group">
        <label className="input" htmlFor="supporter-sign-in-email">Email address
          <input
            id="supporter-sign-in-email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={inputHandler}
          />
        </label>

      </div>

      <PasswordInput id='sign-in' inputHandler={inputHandler} strength={-1} />

      <div className="form-group">
        <div className="custom-control custom-checkbox">

          <input
            id="customCheck"
            name="rememberMe"
            type="checkbox"
            className="custom-control-input"
            onChange={inputHandler}
          />
          <label
            className="custom-control-label"
            htmlFor="customCheck"
          >
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="submit-btn primary">
        Submit
      </button>
      <p className="forgot-password text-right">
        Forgot <a href="/">password?</a>
      </p>
    </form>
  )
}

export default SignInForm