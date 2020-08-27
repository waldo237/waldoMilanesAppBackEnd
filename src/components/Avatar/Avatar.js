import React from 'react';
import PropTypes from 'prop-types';
import  getRandomColor from './colorRandomizer';

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
    
    backgroundColor:`${getRandomColor()}`,
    color: 'var(--light)',
    display:'flex',
    alignContent: 'center',
    justifyContent: 'center',
    border: '1px groove var(--light)'
  }
  const initialsH1Style = {
  padding:'0px',
  margin:'10px 0px 0px',
  justifySelft:'center',
  textShadow: 'var(--text-shadow)',

  }
    return (
      <>
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