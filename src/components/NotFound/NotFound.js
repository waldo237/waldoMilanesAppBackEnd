import React, { useEffect } from "react";
import "./NotFound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import img from "../../static/banner.png";

const NotFound = () => {
  useEffect(() => {
    document.title = "This page was not found";
  }, []);
  return (
    <main className="page-main-container fadeInUpx light">
      <div className="contact-title main-title rubberband">
        <h1 className="primary--text ">oops </h1>
        <FontAwesomeIcon
          className="fa-4x primary--text  small-icon"
          icon={faExclamation}
        />
        <h1 className="primary--text">404 </h1>
      </div>

      <section>
        <div className="card-container card-404 shadow primary">
          <img src={img} alt="WM robot" className="mw-robot" />

          <h6 className="double-w secondary--text"> Page Not Found</h6>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
