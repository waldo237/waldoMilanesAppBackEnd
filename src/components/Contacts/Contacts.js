import React, { useState, useEffect } from "react";
import "./Contacts.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faPhone,
  faEnvelope,
  faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import contactValidator from "./contactValidator";
import ErrorCard from "../ErrorCard/ErrorCard";
import ResponseAlert from "../ResponseAlert/ResponseAlert";
import Loading from "../Loading/Loading";
import envURL from '../../envURL';

const Contacts = () => {
  const [user] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);

  useEffect(() => {
    document.title = "Get in touch with me";
  }, []);
  const inputHandler = (event) => {
    const { name } = event.target;
    user[name] = event.target.value;
    setErrors(contactValidator(user).errors.filter((e) => e.type === name));
  };
  const postEmail = (e) => {
    e.preventDefault();
    if (contactValidator(user).valid) {
      setRequest(true);

      const sanitizedData = contactValidator(user).sanitized;

      fetch(`${envURL}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sanitizedData),
      })
        .then((res) => res.json()
          .then(jsonRes => ({ successful: res.ok, message: jsonRes.message })))
        .then(setResponse)
        .catch(console.error);
    } else {
      setErrors(contactValidator(user).errors);
    }
  };
  const ContactTitleIcon = () => {
    return (
      <>
        <div >
          <svg xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 0 64 64" width="70"><g id="Talk_on_phone" data-name="Talk on phone"><path d="m24.908 16.464a2 2 0 0 0 0-2.828l-8.485-8.485a2 2 0 0 0 -2.829 0l-4.242 4.242 11.313 11.314z" fill="#ff7956" /><path d="m58.849 50.406a2 2 0 0 0 0-2.829l-8.485-8.485a2 2 0 0 0 -2.828 0l-4.243 4.243 11.314 11.313z" fill="#ff7956" /><path d="m20.665 20.707-11.313-11.314-1.415 1.415a16 16 0 0 0 0 22.627l22.628 22.627a16 16 0 0 0 22.627 0l1.415-1.414-11.314-11.313-1.414 1.414a6 6 0 0 1 -8.486 0l-14.142-14.142a6 6 0 0 1 0-8.486z" fill="#ffcd00" /><path d="m61 7v16a4 4 0 0 1 -4 4h-12l-8 9v-9h-2a4 4 0 0 1 -4-4v-16a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4z" fill="#d80027" /><g fill="#ffcd00"><circle cx="38" cy="15" r="2" /><circle cx="46" cy="15" r="2" /><circle cx="54" cy="15" r="2" /></g><path d="m14.594 6.05h2.828v16h-2.828z" fill="#ff6243" transform="matrix(.707 -.707 .707 .707 -5.246 15.435)" /><path d="m48.536 39.991h2.828v16h-2.828z" fill="#ff6243" transform="matrix(.707 -.707 .707 .707 -19.305 49.376)" /><path d="m32.565 54.062-22.627-22.627a15.987 15.987 0 0 1 -.557-22.012l-.029-.03-1.415 1.415a16 16 0 0 0 0 22.627l22.628 22.627a16 16 0 0 0 22.627 0l1.415-1.414-.03-.029a15.987 15.987 0 0 1 -22.012-.557z" fill="#ddb200" /></g></svg>        
        </div>
      </>
    );
  };
  return (
    <main className="contact-container fadeInUpx light">
      <header className="contact-title">
        <div className='page-default-title-icon'>
          <ContactTitleIcon />
        </div>
        <div>
          <h1 className="primary--text">
            Interested?
          </h1>
          <h4>
            Let&apos;s get in contact
          </h4>
        </div>
      </header>

      <section className=" contact-card">
        <div className="contact-info-card">
          <h1 className="waldo-milanes">Waldo Milanes</h1>
          <div className="contact-info">
            <a
              href="https://goo.gl/maps/kqbnLG1M8YErout38"
              target="_blank"
              className="anchor"
              rel="noopener noreferrer"
            >
              <p>
                {" "}
                <FontAwesomeIcon
                  className="contact-card-icon"
                  icon={faMapMarker}
                />{" "}
                c/12 #44 Ensanche Mella 2, Santiago, Dom. Rep.
              </p>
            </a>
            <a
              href="tel:(809) 742-6432"
              target="_blank"
              className="anchor"
              rel="noopener noreferrer"
            >
              <p>
                {" "}
                <FontAwesomeIcon
                  className="contact-card-icon"
                  icon={faPhone}
                />{" "}
                (809) 742-6432{" "}
              </p>
            </a>
            <a
              href="mailto:contact@waldomilanes.com"
              target="_blank"
              className="anchor"
              rel="noopener noreferrer"
            >
              <p>
                {" "}
                <FontAwesomeIcon
                  className="contact-card-icon"
                  icon={faEnvelope}
                />{" "}
                contact@waldomilanes.com
              </p>
            </a>
          </div>
        </div>
        
        <form className="contact-me-form" onSubmit={postEmail}>
          <div className='response-area'>
            {response ? (
              <ResponseAlert response={response} setResponse={setResponse} />
            ) : (
              <div>
                {requestStarted ? <Loading message="Processing your email" /> : null}{" "}
              </div>
              )}
            <ErrorCard errors={displayableErrors} />
          </div>
          <div>
            <h2 className="primary--text">Email me</h2>
          </div>

          <div className="form-group">
            <label className="input" htmlFor="emailer-name">
              Name
              <input
                id="emailer-name"
                type="text"
                className="form-control"
                minLength="3"
                placeholder="Name"
                name="name"
                onChange={inputHandler}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="input" htmlFor="emailer-email">
              E-mail
              <input
                id="emailer-email"
                type="email"
                className="form-control"
                placeholder="email"
                name="email"
                onChange={inputHandler}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="input" htmlFor="email-message">
              Message
              <textarea
                id="email-message"
                type="text"
                className="form-control"
                placeholder="email"
                minLength="15"
                rows="4"
                cols="50"
                name="message"
                onChange={inputHandler}
              />
            </label>
          </div>
          <button type="submit" className="contact-submit-btn">
            Send
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contacts;
