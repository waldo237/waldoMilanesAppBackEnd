/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { useHistory } from 'react-router-dom'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import ResponseAlert from '../ResponseAlert/ResponseAlert'
import Loading from '../Loading/Loading'
import ErrorCard from '../ErrorCard/ErrorCard'
import signInValidator from './utilities/signInValidator'
import PasswordInput from './utilities/PasswordInput'
import { logIn, signWithGoogleOrFB } from './utilities/authorizationFunctions'
import { Context } from '../../store/store'

const SignInForm = () => {
  const [state, dispatch]= useContext(Context);
  const {Trans} = state;
  const [user] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);
  const history = useHistory();

  const inputHandler = (event) => {
    const { name } = event.target;
    user[name] = (event.target.checked) ? event.target.checked : event.target.value;
    setErrors(signInValidator(user).errors.filter((e) => e.type === name));
  };

  useEffect(() => {
    document.title = "Become my follower";
  }, []);
const options =  {setRequest, setErrors, setResponse, rememberMe:user.rememberMe, dispatch, history};

  return (
    <form className="sign-form" onSubmit={(e) => { e.preventDefault(); logIn(user, options) }}>
      <div className="o-auth-btns">
        {response
          ? (<ResponseAlert response={response} email={user.email} setResponse={setResponse} />)
          : (<div>{requestStarted ? <Loading message="Checking your credentials" /> : null}{" "} </div>)}
        {(displayableErrors) ? <ErrorCard errors={displayableErrors} setErrors={setErrors} /> : null}
        <button type="submit" className="google-btn" onClick={e => { e.preventDefault(); signWithGoogleOrFB('google', options) }}>
          {" "}
          <FontAwesomeIcon className="fa-lg" icon={faGoogle} />
          {" "}
          <Trans i18nKey='signInForm.signGoogle'> sign with google</Trans>
        </button>
        <button
          type="submit"
          className="facebook-btn"
          onClick={e => { e.preventDefault(); signWithGoogleOrFB('fb', options) }}
        >
          {" "}
          <FontAwesomeIcon
            className="fa-lg"
            icon={faFacebookF}
          />{" "}
          <Trans i18nKey='signInForm.signFacebook'> sign with facebook</Trans>
          {" "}
        </button>
        <h4 className="or"><Trans i18nKey='signInForm.or'>Or</Trans></h4>
      </div>

      <div className="form-group">
        <label className="input" htmlFor="follower-sign-in-email"><Trans i18nKey='signInForm.emailA'>Email address</Trans> 
          <input
            id="follower-sign-in-email"
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

          <label
            className="form-switch"
            htmlFor="customCheck"
          >
            <input
              id="customCheck"
              name="rememberMe"
              type="checkbox"
              onChange={inputHandler}
            />
            <i />
            <Trans i18nKey='signInForm.remember'>Remember me</Trans> 
            
          </label>
        </div>
      </div>

      <button disabled={requestStarted} type="submit" className="submit-btn primary">
        {(requestStarted)
           ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
            : <Trans i18nKey='followers.tabSignOn'>Sign On</Trans>} 
       
      </button>
      <p className="forgot-password text-right">
        <Trans i18nKey='signInForm.forgot'>Forgot</Trans>  <a href="/"><Trans i18nKey='signInForm.password'>password?</Trans></a>
      </p>
    </form>
  )
}

export default SignInForm