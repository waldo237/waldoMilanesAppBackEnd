import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faCircleNotch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = ({message})=>{
  const  loadingStyle = {
        display: 'flex',
        flexDirection: 'column',

        width: '90%',
        alignItems: 'center'
        
    }
  const  dotsStyle = {
        animation: "flash 4s linear infinite"
    }
    return (<>
        <div style={loadingStyle} className={' animate__animated animate__fadeInUp title-font'}>
        <FontAwesomeIcon className='fa-spin fa-4x secondary--text' icon={faCog} /><FontAwesomeIcon className='fa-spin fa-2x primary--text' icon={faCog} /> 
        <h1 className="primary--text" style={dotsStyle}> processing {message}... </h1>
        </div>
    </>)
}

export default Loading;