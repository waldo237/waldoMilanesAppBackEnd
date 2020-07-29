import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull, faBatteryEmpty, faLock } from '@fortawesome/free-solid-svg-icons'

const PasswordInput = ({inputHandler, strength, id})=>{
   const [eyeState, toggleEye ] = useState(false)
   const temperature = ()=> {
       if(strength === -1) return {color:{color:'var(--light)'}, icon:faLock};
       if(strength === 1) return {color:{color:'red'}, icon:faBatteryQuarter};
       if(strength ===2) return {color:{color:'orange'}, icon:faBatteryHalf};
       if(strength ===3) return {color:{color:'yellow'}, icon:faBatteryThreeQuarters};
       if (strength ===4) return {color:{color:'green'}, icon:faBatteryFull};
       return  {color:{color:'var(--primary-color)'}, icon:faBatteryEmpty};
   }
    return (
      <div className="form-group">
        <label className="input password" htmlFor={`supporter-password${id}`}>
            
          Password
     
          <FontAwesomeIcon
            className="fa-lg temperature-password-strength"
            style={temperature(strength).color}
            icon={temperature(strength).icon}
          />
          <input
            id={`supporter-password${id}`}
            name="password"
            type={(eyeState)?"text":"password"}
            className="form-control"
            placeholder="Enter password"
            onChange={inputHandler}
          />
         
          <FontAwesomeIcon
            icon={(eyeState)?faEye: faEyeSlash}
            className='eye primary--text' 
            onClick={()=>toggleEye(!eyeState)} 
            onKeyDown={()=>toggleEye(!eyeState)}
          /> 
        
          
        </label>
      </div>
    )
}

PasswordInput.propTypes = {
    inputHandler: PropTypes.func.isRequired,
    strength: PropTypes.number,
    id: PropTypes.string.isRequired
}
PasswordInput.defaultProps = {
    strength: 0,
}
export default PasswordInput