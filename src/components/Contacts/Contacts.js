import React from "react"
import './Contacts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPhone,faEnvelope,  faMapMarker} from '@fortawesome/free-solid-svg-icons'


const Articles = () => {

  return (
    <main className="page-main animate__animated animate__fadeInUp light">
      <div className='contact-title main-title'>
        <FontAwesomeIcon className='fa-2x primary--text  small-icon' icon={faAddressCard} />
        <h1 className='primary--text title-font'>Let's get in contact</h1>
      </div>

      <section>

        <div className='card-container contact-container shadow'>
        
            <div className="contact-info-card primary">
               <h6 className='double-w secondary--text'>Waldo Milanes</h6>
                <div className='contact-info'>
                <a  href="https://goo.gl/maps/kqbnLG1M8YErout38"target="_blank" className='anchor  hover-underline-yellow'rel="noopener noreferrer" >
             <p >  <FontAwesomeIcon className='secondary--text small-icon' icon={faMapMarker} /> c/12 #44 Ensanche Mella 2, Santiago, Dom. Rep.</p>
            </a>
            <a  href="tel:(809) 742-6432"target="_blank" className='anchor  hover-underline-yellow' rel="noopener noreferrer">
              <p > <FontAwesomeIcon className='secondary--text small-icon' icon={faPhone} /> (809) 742-6432 </p>
            </a> 
            <a  href="mailto:waldomilanes@gmail.com" target="_blank" className='anchor  hover-underline-yellow' rel="noopener noreferrer">
                  <p> <FontAwesomeIcon className='secondary--text small-icon' icon={faEnvelope} /> waldomilanes@gmail.com </p>
                  </a>   
                </div>
            </div>


          <form className='sign-form'>
            <div >
              <h2 className='primary--text'>Email me</h2>
            </div>

            <div className="form-group">
              <label className='input'>Name</label>
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="form-group">
              <label className='input'>E-mail</label>
              <input type="email" className="form-control" placeholder="email" />
            </div>
            <div className="form-group">
              <label className='input'>Message</label>
              <textarea type="text" className="form-control" placeholder="email" rows="4" cols="50" />
            </div>
            <button type="submit" className="submit-btn primary">Send</button>
          </form>
        </div>
      </section>
    </main>
  )

}

export default Articles