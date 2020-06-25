import React from "react"
import './Contacts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faPhone, faAddressBook, faMailBulk, faEnvelope, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

const Articles = () => {

  return (
    <main className="page-main animate__animated animate__fadeInUp light">
      <div className='contact-title main-title'>
        <FontAwesomeIcon className='fa-2x primary--text  ' icon={faAddressCard} />
        <h1 className='primary--text title-font'>Let's get in contact</h1>
      </div>

      <section>

        <div className='card-container'>
        
            <div className="contact-info-card primary">
               <h6 className='double-w secondary--text'>Waldo Milanes</h6>
                <div className='contact-info'>
                  <p>  <FontAwesomeIcon className='secondary--text small-icon' icon={faMapMarkedAlt} /> c/12 #44 Ensanche Mella 2, Santiago</p>
                  <p> <FontAwesomeIcon className='secondary--text small-icon' icon={faPhone} /> (809) 742-6432 </p>
                  <p> <FontAwesomeIcon className='secondary--text small-icon' icon={faEnvelope} /> waldomilanes@gmail.com </p>
                 
                </div>
            </div>


          <form className='sign-form'>
            <div className='contact-card-titles'>
              <h3 className='primary--text title-font'>Email me</h3>
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