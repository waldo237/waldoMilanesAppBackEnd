import React from 'react'
import './Supporters.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGoogle, faFacebook, faFacebookF} from '@fortawesome/free-brands-svg-icons'
const Supporters = () => {
    return (
        <>
            <div className='page-main animate__animated animate__fadeInUp light'>
                <section className='supporter-title title-font primary--text '>
                    <h1>Supporters</h1>
                    <p>If you like what I do, you can become a supporter to be able so access all my content.</p>
                </section>

                <div className="warpper">
                    <input className="radio" id="two" name="group" type="radio" checked readOnly/>
                    <input className="radio" id="one" name="group" type="radio" checked  readOnly/>
                    <div className="tabs ">
                        <label className="tab shadow" id="two-tab" htmlFor="two" >Sign Up</label>
                        <label className="tab shadow" id="one-tab" htmlFor="one" >Sign In</label>

                    </div>
                    <div className="panels">
                        <div className="panel" id="one-panel">
                            <article className='supporter-login-card '>
                                <form className='sign-form'>
                                    
                                    <div className='o-auth-btns'>
                                    <button type="submit" className="google-btn"> <FontAwesomeIcon  className='fa-lg' icon={faGoogle} /> sign with google</button>
                                    <button type="submit" className="facebook-btn"> <FontAwesomeIcon className='fa-lg' icon={faFacebookF} /> sign with facebook</button>
                                     <h4 className='or'>Or</h4>
                                    </div>
                               
                                    <div className="form-group">
                                        <label className='input'>Email address</label>
                                        <input type="email" className="form-control" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <label className='input'>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" />
                                    </div>

                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-btn primary">Submit</button>
                                    <p className="forgot-password text-right">
                                        Forgot <a href="#">password?</a>
                                    </p>
                                </form>
                            </article>
                        </div>
                        <div className="panel" id="two-panel">
                            <article className='supporter-login-card '>
                                <form className='sign-form'>
                                    <h3>Sign Up</h3>

                                    <div className="form-group">
                                        <label className='input'>First name</label>
                                        <input type="text" className="form-control" placeholder="First name" />
                                    </div>

                                    <div className="form-group">
                                        <label className='input'>Last name</label>
                                        <input type="text" className="form-control" placeholder="Last name" />
                                    </div>

                                    <div className="form-group">
                                        <label className='input'>Email address</label>
                                        <input type="email" className="form-control" placeholder="Enter email" />
                                    </div>

                                    <div className="form-group">
                                        <label className='input'>Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" />
                                    </div>

                                    <button type="submit" className="submit-btn primary">Sign Up</button>
                                    <p className="forgot-password text-right">
                                        Already registered <a href="#">sign in?</a>
                                    </p>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Supporters