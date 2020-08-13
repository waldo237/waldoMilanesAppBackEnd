import React from "react";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faTwitter,
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="primary footer">
    <div>
      <a
        rel="noopener noreferrer"
        href='https://twitter.com/WaldoMilanes'
        target="_blank"
        className="link hoverable-card social-link"
      >
        <FontAwesomeIcon className="fa-2x social" icon={faTwitter} />

      </a>
      <a
        rel="noopener noreferrer"
        href='https://www.linkedin.com/in/waldomilanes/'
        target="_blank"
        className="link hoverable-card social-link"
      >
        <FontAwesomeIcon className="fa-2x social" icon={faLinkedin} />
      </a>
      <a
        rel="noopener noreferrer"
        href='https://www.facebook.com/milanes237/'
        target="_blank"
        className="link hoverable-card social-link"
      >
        <FontAwesomeIcon className="fa-2x social" icon={faFacebookSquare} />
      </a>
      <a
        rel="noopener noreferrer"
        href='https://www.instagram.com/waldo237/?hl=en'
        target="_blank"
        className="link hoverable-card social-link"
      >
        <FontAwesomeIcon className="fa-2x social" icon={faInstagram} />
      </a>
    </div>
    <div className="footer-credits flex-row-wrap">
      {" "}
      <span>
        &#9400; 2019-
        {new Date().getFullYear()} &nbsp;{" "}
      </span>{" "}
      <Link to="/" className="social-link link">
        <span> | W PROGRAMMING | </span> <span>&nbsp;waldomilanes.com </span>
      </Link>
    </div>

    <div>
      developed by Waldo Milanes
      <span>&reg;</span>
    </div>
  </footer>
);

export default Footer;
