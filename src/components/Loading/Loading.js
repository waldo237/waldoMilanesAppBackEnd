import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Loading = ({ message }) => {
  const loadingStyle = {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
  };
  const dotsStyle = {
    animation: "flash 4s linear infinite",
  };
  return (
    <>
      <div
        style={loadingStyle}
        className=" animate__animated animate__fadeInUp"
      >
        <FontAwesomeIcon
          className="fa-spin fa-4x secondary--text"
          icon={faCog}
        />
        <FontAwesomeIcon className="fa-spin fa-2x primary--text" icon={faCog} />
        <h1 className="primary--text" style={dotsStyle}>
          {" "}
          
          {message}
          ...{" "}
        </h1>
      </div>
    </>
  );
};
Loading.propTypes = {
  message: PropTypes.string,
};
Loading.defaultProps = { message: "No message to show" };
export default Loading;
