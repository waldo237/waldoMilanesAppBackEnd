import React, { useEffect, useState } from 'react';
import './Profile.scss'
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import envURL from '../../envURL';
import {fetchPayloadFromJWT} from '../Supporters/utilities/authorizationFunctions';
import Avatar from '../Avatar/Avatar';

const Profile = (match) => {
  const [profileData, setData] = useState(null);
  useEffect(() => {
    document.title = `User profile`;
    const token = (localStorage.getItem('auth_access_token'))
      ? localStorage.getItem('auth_access_token')
      : sessionStorage.getItem('auth_access_token');
    const {email} = fetchPayloadFromJWT(token);
    if (token) {
      fetch(`${envURL}${match.location.pathname}`, {
        method: 'POST',
        headers: {
          'Authorization': `JWT ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
      })
        .then((res) => res.json())
        .then(setData)
        .catch(console.error);
    }
  }, [match.url]);


return (
  <>
    <main className='profile-container'>
      <h1 className='profile-title'>Edit profile</h1>
      {(profileData)
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
            <span className='profile-property-label'>
              First Name:
            </span>
            <span suppressContentEditableWarning contentEditable className='profile-property'>
              {profileData.firstName}
            </span>
       
            <span className='profile-property-label'>
              Last Name:
            </span>
            <span suppressContentEditableWarning contentEditable className='profile-property'>
              {profileData.lastName}
            </span>
            <button type='button' className='profile-edit-btn'>Save Changes</button>
          </div>
          <div className='profile-serious-actions'>
            <h3>Account Dangerous Actions</h3>
            <button type='button' className='profile-cancel-btn'>Cancel Account</button>

          </div>
        </div>
)
      : null}
    </main>
  </>
)
}

export default Profile;