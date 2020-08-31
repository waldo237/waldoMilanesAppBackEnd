import React, {useContext} from 'react';
import {Context}  from '../../store/store';
import './Dashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faNewspaper, faBell, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import Propstype from 'prop-types';
import Avatar from '../Avatar/Avatar';
import { logOut, getIdFromLocalToken} from '../Supporters/utilities/authorizationFunctions'

const Dashboard = ({ removeDisplayNone }) => {
  const [state, dispatch] = useContext(Context)
  const history = useHistory();
  
  const sendToProfile = async () => {
    const {_id} = getIdFromLocalToken();
    
    history.push(`/user/profile/${_id}`);
  }
  const actions = [
    { title: 'Special projects', icon: faProjectDiagram, link: '' },
    { title: 'Special Articles', icon: faNewspaper, link: '' },
    { title: 'Notifications', icon: faBell, link: '' },
    { title: 'Settings', icon: faCog, link: '', id: 'setting-btn', func: ()=> removeDisplayNone('settings-container') },
    { title: 'Sign out', icon: faSignOutAlt, link: '', func: ()=> logOut(history, dispatch) },
  ]
  return (
    <>
      <div id='dashboard-dialog' className='dash-wrapper'>
        <div className='dashboard light'>
          <div className='dash-title-wrapper bold flex-row '>

            <div id='title-img' />
            <div className='dash-title'> Dashboard</div>

          </div>
          <div className='dashboard-content'>


            <div className='dash-user-info flex-row'>
              <Avatar user={state.profile} size={65} />
              <div className='flex-column'>
                <h1 className='dash-user-info-name primary--text'>{state.profile.firstName}{" "} {state.profile.lastName}</h1>
                <button type='button' onClick={sendToProfile} className='dash-user-info-profile'>profile</button>
              </div>
            </div>

            {actions.map((action) => (
              <div
                id={action.id}
                onClick={() => { if (action.func) action.func() }}
                onKeyDown={() => { if (action.func) action.func() }}
                className='dash-action flex-row-justified-aligned-c dash-animation'
                key={action.title}
              >
                <div className=" dash-icon">
                  <FontAwesomeIcon icon={action.icon} />
                </div>
                <h1 className='dash-action-text primary--text Lato'>{action.title}</h1>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  removeDisplayNone: Propstype.func.isRequired,
}
export default Dashboard

