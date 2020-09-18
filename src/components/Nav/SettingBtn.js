import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import PropTypes from 'prop-types'
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function SettingBtn({navItem, isLoggedIn, removeDisplayNone}) {
    return (
      <>{
          (navItem.title === 'settings' && !isLoggedIn)
          ? (
            <FontAwesomeIcon
              key={navItem.id}
              id='setting-btn'
              className="fa-lg setting-btn"
              icon={faEllipsisV}
              onClick={() => removeDisplayNone('settings-container')}
            />
            )
          : null 
      }
      </>
)
}
SettingBtn.propTypes = {
    navItem: PropTypes.shape({id:PropTypes.string, title:PropTypes.oneOfType([PropTypes.string, PropTypes.object]) }).isRequired,
     isLoggedIn:PropTypes.bool, 
     removeDisplayNone: PropTypes.func.isRequired
};

export default SettingBtn
