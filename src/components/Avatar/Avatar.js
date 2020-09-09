import React from 'react';
import PropTypes from 'prop-types';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorFactory } from '../gobalUtil';

const {color} = ColorFactory.getInstance();

const Avatar = ({size, user}) => {
  const avatarStyle = {
    width:`${size}px`,
    height: `${size}px`,
    margin: '2px 15px 0px 5px',
    alightSelft: 'center',
    justifySelft: 'center',
    backgroundColor: 'white',
    borderRadius: '50%',  
  };
  const photoStyle = {
    width:`${size-1}px`,
    height: `${size-1}px`,
    borderRadius: '50%',
    backgroundPosition: 'cover'
  
  }
  const initialsStyle = {
    width:`${size-1}px`,
    height: `${size-1}px`,
    borderRadius: '50%',
    
    backgroundColor:`${color}`,
    color: 'var(--light)',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  const initialsH1Style = {
  justifySelft:'center',
  textShadow: 'var(--text-shadow)',
  fontSize:`${size/2.5}px`,
  }
    return (
      <>
        {
       (user._id)
       ? (
         <div className='avatar btn' style={avatarStyle}>
           {user.photoURL
          ? (
            <img
              style={photoStyle}
              src={user.photoURL}
              alt="your avatar"
            />
 )
          : (
            <div style={initialsStyle}>
              <h1 style={initialsH1Style}>
                {(user && user.firstName)? user.firstName.split('')[0]: null} &nbsp; 
              </h1> 
              <h1 style={initialsH1Style}>
                {(user && user.lastName)?user.lastName.split('')[0]: null} 
              </h1> 
            </div>
)}
         </div>
)
        : <FontAwesomeIcon className="fa-spin primary--text" style={avatarStyle} icon={faCircleNotch} />
      }
      </>
    )
};

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired
};
export default Avatar;