/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import './Profile.scss'
import { faCamera, faSpinner, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '../Avatar/Avatar';
import {
  profileValidator, saveChanges, fetchProfile,
  cancelAccount, moveCursorRight, uploadPhoto,
  validateBlob
} from './profileFunctions'
import ErrorCard from '../ErrorCard/ErrorCard';
import ResponseAlert from '../ResponseAlert/ResponseAlert';
import Loading from '../Loading/Loading';

const Profile = (match) => {
  const [profileData, setData] = useState(null);
  const [agreement, toggleAgreement] = useState(false);
  const [displayableErrors, setErrors] = useState([]);
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [progress, setProgress] = useState(0);

  const { pathname } = match.location;
  const options = { profileData, setRequest, setResponse,
    setUnsavedChanges, setErrors, pathname, response, setData };
  useEffect(() => {
    document.title = `User profile`;
    fetchProfile(pathname, setData);
  }, [pathname]);

  useEffect(()=>{
    window.addEventListener("beforeunload", (e)=> {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = true;
      }
      delete e.returnValue;
    });
  }, [unsavedChanges])

  const inputHandler = (event) => {
    const name = event.target.attributes.name.value;
    const value = event.target.innerText;
    // eslint-disable-next-line prefer-const
    let tempObj = { ...profileData };
    tempObj[name] = value;
    setData(tempObj);
    setUnsavedChanges(true);
    setErrors(profileValidator(profileData).errors.filter((e) => e.type === name));
  };
  const triggerFileInput = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  }
  const collectPhoto = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const errors = validateBlob(selectedFile);
      setErrors(errors);
      const blob = new Blob([selectedFile], { type: "image/*" });
      return new Promise((resolve, reject) => {
        if (!errors || (errors && errors.length)) reject(new Error('something went wrong with choosing the file'));
        return resolve();
      })
        .then(() => setLoadingPhoto(true))
        .then(() => uploadPhoto(profileData, setProgress, blob, setData, setLoadingPhoto, setUnsavedChanges))
        .catch((err) => console.error(err.message))
    }
    return setErrors([{ type: "image", message: "the file was not selected." }]);
  }
  return (
    <>
      <main className={(response || displayableErrors) ? 'profile-container response-message' : 'profile-container'}>
        <h1 className='profile-title'>Edit profile</h1>
        {(requestStarted) ? <Loading message="Sending your changes" />
          : (profileData)
            ? (
              <div className='profile-card'>
                {(progress && progress < 100) ? <span className='progress-display'>{progress}%</span> : null}
                <div onClick={triggerFileInput} onKeyDown={triggerFileInput} className='profile-avatar-wrapper'>
                  {(loadingPhoto)
                    ? <FontAwesomeIcon className='fa-spin fa-4x' icon={faCircleNotch} />
                    : <Avatar size={100} user={profileData} className='profile-avatar' />}
                  <FontAwesomeIcon className='fa-lg profile-photo-btn' icon={faCamera} />
                  <input
                    onChange={collectPhoto}
                    hidden
                    id="file-input"
                    type="file"
                    accept="image/x-png, image/gif, image/jpeg"
                  />
                </div>
                <div className='profile-fixed-details'>

                  <small>{profileData.email}</small>
                  <small>  account created on {new Date(profileData.created_date).toLocaleDateString()}</small>
                </div>
                <div className='profile-fields'>
                  {response
                    ? (<ResponseAlert response={response} setResponse={setResponse} />)
                    : null}
                  {(displayableErrors) ? <ErrorCard errors={displayableErrors} setErrors={setErrors} /> : null}
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
                    onClick={() => saveChanges(options)}
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
                        onChange={(e) => {
                          toggleAgreement(e.target.checked);
                        }}
                      />
                      <i />
                      I understand that by doing this action, I will no longer be able to use my account.
                    </label>
                  </div>
                  <div className="tooltip">
                    <button disabled={!agreement} onClick={() => cancelAccount(options)} type='button' className='profile-cancel-btn'>Cancel Account</button>
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