import React, { useEffect, useState } from "react";
import "./ProjectViewer.css";
import Proptypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faFolder,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import IconizeFile from "./IconizeFile";
import CodeModal from "./CodeModal";


const ProjectViewer = ({ match }) => {
  const technologySwicher = () => {
    let tempTechnology = null;
    switch (match.url) {
      case "/project/node":
        tempTechnology = { title: "NodeJs", extension: "node" };
        break;
      case "/project/java":
        tempTechnology = { title: "Java", extension: "java" };
        break;
      case "/project/vue":
        tempTechnology = { title: "VueJs", extension: "vue" };
        break;
      case "/project/react":
        tempTechnology = { title: "ReactJs", extension: "react" };
        break;
      default:
        break;
    }
    return tempTechnology;
  };

  const [collection, setData] = useState(null);
  const technology = technologySwicher();
  useEffect(() => {
    document.title = "Work that I have done";
    fetch(`${process.env.REACT_APP_SERVER_URL}/projects/${technology.extension}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [technology]);

  const showModal = (value) => {
    const internalFiles = document.querySelectorAll(".modal");
    internalFiles.forEach((file) => {
      if (file.classList.contains(value)) {
        file.classList.toggle("modal-closed");
        file.classList.toggle("modal-opened");
      }
    });
  };


  const toggleClasses = (parentId) => {
    const internalFiles = document.querySelectorAll(".internal-files");
    const iconsToTurn = document.querySelectorAll(".icon-to-turn");
    internalFiles.forEach((file) => {
      if (file.classList.contains(parentId)) {
        file.classList.toggle("folder-closed");
        file.classList.toggle("folder-opened");
      }
    });
    iconsToTurn.forEach((icon) => {
      if (icon.classList.contains(parentId))
        icon.classList.toggle("turn-downwards");
    });
  };
  return (
    <>
      <main className="node-main light main animate__animated animate__fadeInUp">
        <div className="contact-title main-title">
          <IconizeFile name={technology.extension} />
          <h1 className="main-title primary--text title-font">
            My
            {technology.title} Projects
          </h1>
        </div>
        {collection
          ? collection.map((project) => (
              // eslint-disable-next-line react/jsx-indent
              <article className="all-projects" key={project._id}>
                <div className="project-container light">
                  <h1 className="project-title primary--text title-font">
                    Title:
                    {project.title}
                  </h1>
                  <p>
                    <span className="primary--text bold">Created on:</span>{" "}
                    {new Date(project.date).toLocaleString("eng-US", {
                      dateStyle: "long",
                    })}
                  </p>
                  <p>
                    <span className="primary--text bold">URL:</span>{" "}
                    <a
                      target="_blank"
                      href={project.url}
                      rel="noopener noreferrer"
                    >
                      {project.url}
                    </a>
                  </p>
                  <p>
                    <span className="primary--text bold">Description:</span>{" "}
                    {project.description}
                  </p>
                  <a
                    target="_blank"
                    href={project.screenshot}
                    className="screenshot-container"
                    rel="noopener noreferrer"
                  >
                    <picture>
                      <source
                        media="(min-width:650px)"
                        srcSet={project.screenshot}
                      />
                      <source
                        media="(min-width:465px)"
                        srcSet={project.screenshot}
                      />
                      <img
                        className="project-screenshot"
                        src={project.screenshot}
                        alt={`${project.title}-view`}
                      />
                    </picture>
                  </a>

                  <div className="file-container">
                    <span className="bold">Files</span>
                    <>
                      <div key={project.code.file._id} className="file">
                        <button
                          type="button"
                          onClick={() => showModal(project.code.file._id)}
                          className="file-button"
                        >
                          <FontAwesomeIcon
                            icon={faFile}
                            className="primary--text"
                          />{" "}
                          {project.code.file.name}
                        </button>
                        <CodeModal
                          showModal={showModal}
                          code={project.code.file.content}
                          fileId={project.code.file._id}
                          name={project.code.file.name}
                        />
                      </div>
                      {project.code.dir.map((folder) => (
                        <div key={folder._id}>
                          <button
                            type="button"
                            onClick={() => toggleClasses(folder._id)}
                            className="file-button"
                          >
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className={`${folder._id} primary--text icon-to-turn`}
                            />{" "}
                            <FontAwesomeIcon
                              icon={faFolder}
                              className="secondary--text"
                            />{" "}
                            {folder.name}
                          </button>
                          {folder.content.map((childFile) => (
                            <div
                              className={`${folder._id} file internal-files folder-closed`}
                              key={childFile._id}
                            >
                              <button
                                type="button"
                                onClick={() => showModal(childFile._id)}
                                className="file-button "
                              >
                                {" "}
                                <FontAwesomeIcon
                                  icon={faFile}
                                  className="primary--text"
                                />{" "}
                                {childFile.name}
                              </button>
                              <CodeModal
                                code={childFile.content}
                                fileId={childFile._id}
                                name={childFile.name}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  </div>
                </div>
              </article>
            ))
          : null}
      </main>
    </>
  );
};
ProjectViewer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: Proptypes.object.isRequired,
}
export default ProjectViewer;
