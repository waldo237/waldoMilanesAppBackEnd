import React, { useEffect } from "react";
import "./Technologies.css";
import { Link } from "react-router-dom";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Technologies = () => {
  useEffect(() => {
    document.title = "Projects";
  }, []);
  const projects = [
    {
      url: "/project/node",
      icon: faNodeJs,
      title: "NodeJs",

    },
    {
      url: "/project/java",
      icon: faJava,
      title: "Java",

    },
    {
      url: "/project/vue",
      icon: faVuejs,
      title: "VueJS",

    },
    {
      url: "/project/react",
      icon: faReact,
      title: "ReactJS",
  
    },
  ];
  return (
    <>
      <div className="technology-wrapper">
        {projects.map((project) => (
          <article
            key={project.url}
            className="hoverable-card"
          >
            <Link to={project.url} className="link">
              <div className="technology-card">
                <FontAwesomeIcon
                  className="fa-5x light--text tech-icon"
                  icon={project.icon}
                />
                <h1 className=" light--text ">
                  {project.title}
                </h1>
              </div>
            </Link>

          </article>
        ))}

      </div>
    </>
  );
};

export default Technologies;
