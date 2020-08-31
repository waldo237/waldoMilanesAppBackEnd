import React, { useEffect } from "react";
import "./Portfolio.scss";
import { Link } from "react-router-dom";
import {
  faNodeJs,
  faJava,
  faVuejs,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Portfolio = () => {
  useEffect(() => {
    document.title = "Projects";
  }, []);
  const projects = [
    {
      url: "/project/node",
      icon: faNodeJs,
      title: "My projects done with NodeJs",
      description:
        "A collection of projects I have created using NodeJs. They reflect my experience working with this technology.",
    },
    {
      url: "/project/java",
      icon: faJava,
      title: "My projects done with Java",
      description:
        "A collection of projects I have created using Java. They reflect my experience working with this technology.",
    },
    {
      url: "/project/vue",
      icon: faVuejs,
      title: "My projects done with VueJS",
      description:
        "A collection of projects I have created using VueJS. They reflect my experience working with this technology.",
    },
    {
      url: "/project/react",
      icon: faReact,
      title: "My projects done with ReactJS",
      description:
        "A collection of projects I have created using ReactJS. They reflect my experience working with this technology.",
    },
  ];
 const PortfolioTitleIcon = () => {
    return (
      <>
        <div className='portfolio-title-icon hoverable-card'>
          <svg xmlns="http://www.w3.org/2000/svg" height="50pt" viewBox="0 0 64 64" width="50pt"><g id="Bag"><path d="m61 59v-30l-13 10h-32l-13-10v30a2 2 0 0 0 2 2h54a2 2 0 0 0 2-2z" fill="#a97c50" /><path d="m30 61h29a2 2 0 0 0 2-2v-22c0 13.266-13.865 24-31 24z" fill="#8b5e3c" /><path d="m48 39h-32l-13-10v2l13 10h32l13-10v-2z" fill="#8b5e3c" /><path d="m48 39 13-10v-6a2 2 0 0 0 -2-2h-54a2 2 0 0 0 -2 2v6l13 10z" fill="#c49a6c" /><path d="m34 35h-4a1 1 0 0 0 -1 1v3h6v-3a1 1 0 0 0 -1-1z" fill="#58595b" /><path d="m29 44a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h-6z" fill="#6d6e71" /><path d="m55 18a1 1 0 0 0 -1-1h-2a1 1 0 0 0 -1 1v3h4z" fill="#ffcd00" /><path d="m13 18a1 1 0 0 0 -1-1h-2a1 1 0 0 0 -1 1v3h4z" fill="#ffcd00" /><path d="m23 13a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8h4v-8a6 6 0 0 0 -6-6h-14a6 6 0 0 0 -6 6v8h4z" fill="#58595b" /></g></svg>
        </div>
      </>
    );
  };
  return (
    <>
      <main className="portfolio-container light fadeInUpx"> 
        <header className="porfolio-title primary--text ">
          <PortfolioTitleIcon /> <div> <h1>My Work</h1> <h4> A collection of projects</h4></div> 
        </header>
        {projects.map((project) => (
          <article
            key={project.url}
            className="hoverable-card technology-container"
          >
            <Link to={project.url} className="link">
              <div className="technology-icon"><FontAwesomeIcon
                className="fa-3x"
                icon={project.icon}
              />
              </div> 
              <h1 className=" technoly-title">
                {project.title}
              </h1>
            </Link>
            <p> {project.description} </p>
          </article>
        ))}
      </main>
    </>
  );
};

export default Portfolio;
