/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import './Profile.scss'
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../Avatar/Avatar';
import {profileValidator, saveChanges, fetchProfile, cancelAccount, moveCursorRight} from './profileFunctions'
import ErrorCard from '../ErrorCard/ErrorCard';
import ResponseAlert from '../ResponseAlert/ResponseAlert';
import Loading from '../Loading/Loading';

const Profile = (match) => {
  const [profileData, setData] = useState(null);
  const [agreement, toggleAgreement] = useState(false);
  const [displayableErrors, setErrors] = useState([]);
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const {pathname}= match.location;
  const options = {profileData, setRequest, setResponse, setErrors, pathname};
  useEffect(() => {
    document.title = `User profile`;
    fetchProfile(pathname, setData);
  }, [pathname]);
 
  const inputHandler = (event) => {
    const name = event.target.attributes.name.value;
    const value = event.target.innerText;
    // eslint-disable-next-line prefer-const
    let tempObj = {...profileData};
    tempObj[name]=value;
    setData(tempObj);
    setErrors(profileValidator(profileData).errors.filter((e) => e.type === name));
  };

return (
  <>
    <main className={(response || displayableErrors)?'profile-container response-message': 'profile-container'}>
      <h1 className='profile-title'>Edit profile</h1>
      { (requestStarted && !response) ? <Loading message="Sending your changes" />
     :(profileData)
      ?(
        <div className='profile-card'>
          <div className='profile-avatar-wrapper'>
            <Avatar size={100} user={profileData} className='profile-avatar' /> 
 
            <FontAwesomeIcon className='fa-lg profile-photo-btn' icon={faCamera} />
          </div>
          <div className='profile-fixed-details'>
            
            <small>{profileData.email}</small>
            <small>  account created on {new Date(profileData.created_date).toLocaleDateString()}</small>
          </div>
          <div className='profile-fields'>
            {response
          ? (<ResponseAlert response={response} setResponse={setResponse} />)
          : null}
            <ErrorCard errors={displayableErrors} />
            <span className='profile-property-label'>
              First Name:
            </span>
            <span 
              onKeyDown={moveCursorRight}
              onInput={inputHandler}
              name='firstName'
              suppressContentEditableWarning
              contentEditable
              className='profile-property'
            >
              {profileData.firstName}
            </span>
       
            <span className='profile-property-label'>
              Last Name:
            </span>
            <span
              onKeyDown={moveCursorRight}
              onInput={inputHandler}
              name='lastName'
              suppressContentEditableWarning
              contentEditable
              className='profile-property'
            >
              {profileData.lastName}
            </span>
            <button 
              type='button' 
              className='profile-edit-btn'
              onClick={()=>saveChanges(options)}
            >Save Changes
            </button>
          </div>
          <div className='profile-serious-actions'>
            <h3>Account Dangerous Actions</h3>
            <div className="custom-control custom-checkbox">

              <label
                className="form-switch"
                htmlFor="customCheck"
              >
                <input
                  id="customCheck"
                  name="cancel-agreement"
                  type="checkbox"
                  onChange={(e) =>{
                    toggleAgreement( e.target.checked);
                  }}
                />
                <i />
                I understand that by doing this action, I will no longer be able to use my account.
              </label>
            </div>
            <div className="tooltip">
              <button disabled={!agreement} onClick={()=> cancelAccount(options)} type='button' className='profile-cancel-btn'>Cancel Account</button>
              <span className="tooltiptext">First, please mark the above-mentioned agreement </span>
            </div>
          </div>
        </div>
)
      : null}
    </main>
  </>
)
}

export default Profile;