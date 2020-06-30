import React from 'react'
import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ErrorCard = ({ errors }) => {
    const mystyle = {
        color: "rgb(96, 0, 0)",
        backgroundColor: "pink",
        listStyle: "none"
      };
    return (<>
        {(errors)
            ? <div>
                <div style={mystyle} className={(errors.length)?'card-container animate__animated animate__fadeInUp ': ''}>
                    <ul style={mystyle}>
                        {errors.map((error, i) => 
                         <li key={i}>
                           <FontAwesomeIcon style={mystyle} icon={faExclamationCircle} /> {error.message}
                        </li>
                        )}
                    </ul>
                </div>
            </div>
            : null}
    </>)
}


export default ErrorCard