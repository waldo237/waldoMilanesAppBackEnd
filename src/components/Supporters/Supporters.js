

/* TODO    
  MAKE TWO OBJECTS TO BE TRANSPORTERS, ONE FOR LOGIN AND 1 FOR REGISTER 
  REFACTOR TO ATOMIC UNITS
  INSERT THE EVENT HANDLERS
   WITHIN INPUT HANDLER FIND THE ID OF THE EVENT, USE IT TO IDENTIFY THE TYPE OF OBJECT IT WILL CREATE
  MAKE THE O-AUTH AUTHENTICATION.
*/


/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import "./Supporters.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./signUpForm";

const Supporters = () => {


  return (
    <>
      <div className="page-main-container animate__animated animate__fadeInUp light">
        <section className="supporter-title title-font primary--text ">
          <h1>Supporters</h1>
          <p>
            If you like what I do, you can register to
            access all my content and receive notifications when I publish new material.
          </p>
        </section>

        <div className="warpper">
          <input
            className="radio"
            id="two"
            name="group"
            type="radio"
            checked
            readOnly
          />
          <input
            className="radio"
            id="one"
            name="group"
            type="radio"
            checked
            readOnly
          />
          <div className="tabs ">
            <label
              className="tab  neom hover-underline-yellow"
              id="two-tab"
              htmlFor="two"
            >
              Sign Up
            </label>
            <label
              className="tab neom hover-underline-yellow"
              id="one-tab"
              htmlFor="one"
            >
              Sign In
            </label>
          </div>
          <div className="panels">
            <div className="panel" id="one-panel">
              <article className="supporter-login-card ">
                <SignInForm />
              </article>
            </div>
            <div className="panel" id="two-panel">
              <article className="supporter-login-card ">
                <SignUpForm />
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Supporters;
