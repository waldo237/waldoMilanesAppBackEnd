import React from "react";
import PropTypes from "prop-types";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorCard = ({ errors, suggestions }) => {
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
                ? "card-container fadeInUpx"
                : ""
            }
          >
            <ul style={mystyle}>
              {errors.map((error) => (
                <li key={error.message}>
                  <FontAwesomeIcon style={mystyle} icon={faExclamationCircle} />{" "}
                  {error.message} {" "}
                  
                </li>
              ))}
              {(suggestions.length)? <ol className="fadeInUpx">{suggestions.map((sug)=> <li key={sug}>{sug}</li>)}</ol>  :null}
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
  // eslint-disable-next-line react/forbid-prop-types
  suggestions: PropTypes.array,
}
ErrorCard.defaultProps ={
  errors: [],
  suggestions: []
}
export default ErrorCard;
