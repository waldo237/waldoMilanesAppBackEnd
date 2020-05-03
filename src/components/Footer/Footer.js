import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLinkedin, faTwitter, faFacebookSquare, faInstagram} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
    return (<footer className="primary footer">
      <div>
      <FontAwesomeIcon className='fa-2x social' icon={faTwitter} /> 
      <FontAwesomeIcon className='fa-2x social' icon={faLinkedin} /> 
      <FontAwesomeIcon className='fa-2x social' icon={faFacebookSquare} /> 
      <FontAwesomeIcon className='fa-2x social' icon={faInstagram} /> 
          </div> 
 
    </footer>)
}

export default Footer;