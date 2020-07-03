import React, { useState, useEffect } from "react";
import "./Contacts.css";
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

      fetch("http://localhost:3001/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(sanitizedData),
      })
        .then((res) => res.json())
        .then(setResponse)
        // .then(setRequest(false))
        .catch(console.error);
    } else {
      setErrors(contactValidator(user).errors);
    }
  };
  return (
    <main className="page-main animate__animated animate__fadeInUp light">
      <div className="contact-title main-title">
        <FontAwesomeIcon
          className="fa-2x primary--text  small-icon"
          icon={faAddressCard}
        />
        <h1 className="primary--text title-font">Let&apos;s get in contact</h1>
      </div>

      <section>
        <div className="card-container contact-container shadow">
          <div className="contact-info-card primary">
            <h6 className="double-w secondary--text">Waldo Milanes</h6>
            <div className="contact-info">
              <a
                href="https://goo.gl/maps/kqbnLG1M8YErout38"
                target="_blank"
                className="anchor  hover-underline-yellow"
                rel="noopener noreferrer"
              >
                <p>
                  {" "}
                  <FontAwesomeIcon
                    className="secondary--text small-icon"
                    icon={faMapMarker}
                  />{" "}
                  c/12 #44 Ensanche Mella 2, Santiago, Dom. Rep.
                </p>
              </a>
              <a
                href="tel:(809) 742-6432"
                target="_blank"
                className="anchor  hover-underline-yellow"
                rel="noopener noreferrer"
              >
                <p>
                  {" "}
                  <FontAwesomeIcon
                    className="secondary--text small-icon"
                    icon={faPhone}
                  />{" "}
                  (809) 742-6432{" "}
                </p>
              </a>
              <a
                href="mailto:waldomilanes@gmail.com"
                target="_blank"
                className="anchor  hover-underline-yellow"
                rel="noopener noreferrer"
              >
                <p>
                  {" "}
                  <FontAwesomeIcon
                    className="secondary--text small-icon"
                    icon={faEnvelope}
                  />{" "}
                  waldomilanes@gmail.com{" "}
                </p>
              </a>
            </div>
          </div>

          <form className="sign-form" onSubmit={postEmail}>
            {response ? (
              <ResponseAlert response={response} />
            ) : (
              <div>
                {requestStarted ? <Loading message="your email" /> : null}{" "}
              </div>
            )}
            <ErrorCard errors={displayableErrors} />
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
            <button type="submit" className="submit-btn primary">
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contacts;
