import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import {
  faNodeJs,
  faJs,
  faCss3,
  faHtml5,
  faJava,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";

const IconizeFile = ({ name, usingExtension }) => {
  const fileNameExtension =(usingExtension)? name:name.split(".")[1];
  let icon = null;
  switch (fileNameExtension) {
    case "js":
      icon = <FontAwesomeIcon className="fa-2x " icon={faJs} />;
      break;
    case "java":
      icon = <FontAwesomeIcon className="fa-2x  " icon={faJava} />;
      break;
    case "css":
      icon = <FontAwesomeIcon className="fa-2x  " icon={faCss3} />;
      break;
    case "html":
      icon = <FontAwesomeIcon className="fa-2x " icon={faHtml5} />;
      break;
    case "vue":
      icon = <FontAwesomeIcon className="fa-2x " icon={faVuejs} />;
      break;
    case "node":
      icon = <FontAwesomeIcon className="fa-2x " icon={faNodeJs} />;
      break;
    default:
      icon = <FontAwesomeIcon className="fa-2x " icon={faCode} />;
      break;
  }
  return icon;
};

export default IconizeFile;
