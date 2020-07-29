import React from "react";
import PropTypes from 'prop-types';
import {
  faExclamationCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const ResponseAlert = ({ response, setResponse, email }) => {

  const action = (e) => {
    e.preventDefault();
    fetch(response.link.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      // eslint-disable-next-line object-shorthand
      body: JSON.stringify({email:email }),
    })
      .then((res) => res.json()
        .then(jsonRes => ({ successful: res.ok, message: jsonRes.message })))
      .then(setResponse)
      .catch(console.error);
  }
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
                {(response.link)
                  ? <button type="button" className="btn" onClick={action}>{response.link.label}</button> : null}
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
ResponseAlert.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  response: PropTypes.object,
  email: PropTypes.string,
  setResponse: PropTypes.func.isRequired
  
}
ResponseAlert.defaultProps = {
  response: {},
  email:''
}
export default ResponseAlert;
