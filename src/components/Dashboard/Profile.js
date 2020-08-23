import React, { useEffect, useState } from 'react';
import './Profile.scss'
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
    <main>
      {(profileData)
      ?(
        <div>
          <Avatar size={70} user={profileData} />
        
        </div>
)
      : null}
    </main>
  </>
)
}

export default Profile;