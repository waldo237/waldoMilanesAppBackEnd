import React from "react"
import './Contacts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'

const Articles = () => {

    return (
        <main className="page-main animate__animated animate__fadeInUp light">
            <div className='contact-title main-title'>
                <FontAwesomeIcon className='fa-2x primary--text  contact-icon' icon={faAddressCard} /> 
                <h1 className='primary--text title-font'>Let's get in contact</h1>
            </div>

            <section>
                <div className=' card-container'>
                    <form className='sign-form'>
                        <div className='contact-card-titles'>
                            <h3 className='primary--text title-font'>Email</h3>
                            <h5 className='secondary--text'>Please complete the fields to shoot me an email</h5>
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