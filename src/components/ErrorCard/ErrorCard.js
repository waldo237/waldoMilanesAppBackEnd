import React from "react";
import PropTypes from "prop-types";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorCard = ({ errors }) => {
  const mystyle = {
    color: "rgb(96, 0, 0)",
    backgroundColor: "pink",
    listStyle: "none",
  };
  return (
    <>
      {errors ? (
        <div>
          <div
            style={mystyle}
            className={
              errors.length
                ? "card-container animate__animated animate__fadeInUp "
                : ""
            }
          >
            <ul style={mystyle}>
              {errors.map((error) => (
                <li key={error.message}>
                  <FontAwesomeIcon style={mystyle} icon={faExclamationCircle} />{" "}
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};
ErrorCard.propTypes={
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.array,
}
ErrorCard.defaultProps ={
  errors: []
}
export default ErrorCard;
