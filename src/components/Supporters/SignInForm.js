/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import ResponseAlert from '../ResponseAlert/ResponseAlert'
import Loading from '../Loading/Loading'
import ErrorCard from '../ErrorCard/ErrorCard'
import signInValidator from './signInValidator'
import PasswordInput from './PasswordInput'
import envURL from '../../envURL';
import { auth, gProvider, fProvider } from './Auth0';

const SignInForm = () => {
  const [user] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);

  const inputHandler = (event) => {
    const { name } = event.target;
    user[name] = event.target.value;
    setErrors(signInValidator(user).errors.filter((e) => e.type === name));
  };

  useEffect(() => {
    document.title = "Become my supporter";
  }, []);

  // sign with google
  const signWithGoogleOrFB = (whichService) => {
    const provider = (whichService === 'fb') ? fProvider : gProvider;
    auth().signInWithPopup(provider)
      .then((result)=> {
        console.log(result.user.metadata)
        // TODO HANDLE THIS
        // This gives you a Google Access Token.
        // const token = result.credential.accessToken;
        // The signed-in user info.
        // const { user } = result;
        // console.log(result)
      })
      .catch(err => console.log(err.message));
  };


  const logIn = (e) => {
    e.preventDefault();
    if (signInValidator(user).valid) {
      setRequest(true);
      const sanitizedData = signInValidator(user).sanitized;
      fetch(`${envURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sanitizedData),
      })
        .then((res) => res.json()
          .then(jsonRes => ({ successful: res.ok, message: jsonRes.message, link: jsonRes.link })))
        .then(setResponse)
        .catch(console.error);

    } else {
      setErrors(signInValidator(user).errors);
    }
  }

  return (
    <form className="sign-form" onSubmit={logIn}>
      <div className="o-auth-btns">
        {response
          ? (<ResponseAlert response={response} email={user.email} setResponse={setResponse} />)
          : (<div>{requestStarted ? <Loading message="Checking your credentials" /> : null}{" "} </div>)}
        <ErrorCard errors={displayableErrors} />
        <button type="submit" className="google-btn" onClick={e => { e.preventDefault(); signWithGoogleOrFB('google') }}>
          {" "}
          <FontAwesomeIcon className="fa-lg" icon={faGoogle} /> sign
          with google
        </button>
        <button type="submit" className="facebook-btn" onClick={e => { e.preventDefault(); signWithGoogleOrFB('fb') }}>
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
            type="checkbox"
            className="custom-control-input"
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