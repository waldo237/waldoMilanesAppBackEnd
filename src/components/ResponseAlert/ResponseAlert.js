import React from "react";
import PropTypes from 'prop-types';
import {
  faExclamationCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ResponseAlert = ({ response }) => {
  const successStyle = {
    color: "darkGreen",
    backgroundColor: "lightGreen",
    listStyle: "none",
  };
  const dangerStyle = {
    color: "rgb(96, 0, 0)",
    backgroundColor: "pink",
    listStyle: "none",
  };
  return (
    <>
      {!response.successful ? (
        <div>
          <div
            style={dangerStyle}
            className="card-container animate__animated animate__fadeInUp "
          >
            <ul style={dangerStyle}>
              <li>
                <FontAwesomeIcon
                  style={dangerStyle}
                  icon={faExclamationCircle}
                />{" "}
                {response.message}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div
            style={successStyle}
            className="card-container animate__animated animate__fadeInUp "
          >
            <ul style={successStyle}>
              <li>
                <FontAwesomeIcon style={successStyle} icon={faCheck} />{" "}
                {response.message}
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
ResponseAlert.propTypes ={
  // eslint-disable-next-line react/forbid-prop-types
  response: PropTypes.array,
}
ResponseAlert.defaultProps = {
  response:[]
}
export default ResponseAlert;
