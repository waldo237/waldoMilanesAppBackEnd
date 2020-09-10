/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../store/store';
import ErrorCard from '../ErrorCard/ErrorCard';
import Loading from '../Loading/Loading';
import ResponseAlert from '../ResponseAlert/ResponseAlert';
import PasswordInput from './utilities/PasswordInput';
import { resetPasswordValidator } from './utilities/signInValidator';

const EnterNewPassword = () =>{
    const [state] = useContext(Context);
    const { Trans } = state;
    const [response, setResponse] = useState(null);
    const [requestStarted, setRequest] = useState(false);
    const [displayableErrors, setErrors] = useState([]);
    const [user] = useState({});
    const [passStrength, setStrength] = useState(0);

    const inputHandler = (event) => {
      const { name } = event.target;
      user[name] = event.target.value;
     const {errors, passwordStrength}= resetPasswordValidator(user);
     setStrength(passwordStrength);
     setErrors(errors.filter((e) => e.type === name));
    };
  
    useEffect(() => {
      document.title = "Set new password";
    }, []);
  const options =  {setRequest, setErrors, setResponse};
  const sendNewPassword =()=>{
    const {errors, passwordStrength}= resetPasswordValidator(user);
    setStrength(passwordStrength);
    setErrors(errors);
  }
    return (
      <>
        <div className="followers-container fadeInUpx light">
          
          <section className="password-reset-card">
            <header className="followers-title">
              <h1><Trans i18nKey='enterNewPass.title'>Reset your password</Trans>  </h1>
              <h4>
                <Trans i18nKey='enterNewPass.subtitle'> 
                  Please enter and confirm your new password bellow
                </Trans>
              </h4>
            </header>
            <form className="sign-form" onSubmit={(e) => { e.preventDefault();  sendNewPassword(options) }}>
              {response
          ? (<ResponseAlert response={response} setResponse={setResponse} />)
          : (<div>{requestStarted ? <Loading message="Sending request" /> : null}{" "} </div>)}
              {(displayableErrors) ? <ErrorCard errors={displayableErrors} suggestions={resetPasswordValidator(user).suggestions} setErrors={setErrors} /> : null}
              <div className="form-group">
                <PasswordInput id='enter-new-password' inputHandler={inputHandler} strength={passStrength} />
                <PasswordInput id='reenter-new-password' inputHandler={inputHandler} strength={-1} reEnter />
              </div>
              <button disabled={requestStarted} type="submit" className="submit-btn primary">
                {(requestStarted)
           ? <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />
            : <Trans i18nKey='enterNewPass.btn'>Send new password</Trans>} 
       
              </button>
            </form>
          </section>
        </div>
      </>
    )
}

export default EnterNewPassword;