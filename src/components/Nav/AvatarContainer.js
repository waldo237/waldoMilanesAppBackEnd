import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar';

function AvatarContainer({navItem, state, removeDisplayNone}) {
    const {isLoggedIn, profile} = state;
    return (
        (isLoggedIn && navItem.link === "/followers")
        ? (
          <div
            key={navItem.id}
            className='avatar-wrapper'
            id='avatar-wrapper'
            onClick={() => removeDisplayNone('dashboard-dialog')}
            onKeyDown={() => removeDisplayNone('dashboard-dialog')}
          >
            <Avatar user={profile} size={38} key={navItem.id} />
          </div>
        )
        :null
    )
}

AvatarContainer.propTypes = {
    navItem: PropTypes.shape({id:PropTypes.string, title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]) , link: PropTypes.string}).isRequired,
     // eslint-disable-next-line react/forbid-prop-types
     state: PropTypes.shape({isLoggedIn:PropTypes.bool, profile: PropTypes.object}).isRequired,
     removeDisplayNone: PropTypes.func.isRequired
};

export default AvatarContainer
