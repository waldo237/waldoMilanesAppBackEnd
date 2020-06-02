import React  from "react"
import './Contacts.css'
const Articles =() => {

        return (
            <main className="page-main animate__animated animate__fadeInUp light">
                <h1 className='primary--text title-font .main-title'>Let's get in contact</h1>

                <section>
                    <div className='hoverable-card card-container'>
                        <form className='sign-form'>
                        <h3 className='primary--text title-font .main-title'>Email</h3>
                    <h5 className='secondary--text'>Please complete the fields to shoot me an email</h5>
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
                                        <textarea type="text" className="form-control" placeholder="email" rows="4" cols="50"/>
                                    </div>
                        </form>
                    </div>
                </section>
            </main>
        )

}

export default Articles