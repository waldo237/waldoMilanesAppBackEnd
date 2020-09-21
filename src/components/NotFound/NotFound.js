import React, { useEffect } from "react";
import "./NotFound.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import img from "../../static/banner.png";

const NotFound = () => {
  useEffect(() => {
    document.title = "This page was not found";
  }, []);
  return (
    <main className="notFound-main fadeInUpx">
      <div className="notFound-title">
        <h1 className="oops">oops </h1>
        <FontAwesomeIcon
          className="fa-4x small-icon"
          icon={faExclamation}
        />
        <h1 className="notFound-404">404 </h1>
      </div>

      <section className="notFound-card">
          <img src={img} alt="WM robot" className="mw-robot" />

          <h2 className="notFound-message"> Page Not Found</h2>
      </section>
    </main>
  );
};

export default NotFound;
