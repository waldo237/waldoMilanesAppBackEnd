import React, { useEffect, useState } from 'react';
import './ProjectViewer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder, faChevronRight, faCode } from '@fortawesome/free-solid-svg-icons'
import { faNodeJs, faJs, faCss3, faHtml5, faJava, faVuejs } from '@fortawesome/free-brands-svg-icons'
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const ProjectViewer = ({ match }) => {

    const technologySwicher = (match) => {
        let tempTechnology = null;
        switch (match.url) {
            case '/project/node': tempTechnology = { title: 'NodeJs', extension: 'node' }
                break;
            case '/project/java': tempTechnology = { title: 'Java', extension: 'java' }
                break;
            case '/project/vue': tempTechnology = { title: 'VueJs', extension: 'vue' }
                break;
            case '/project/react': tempTechnology = { title: 'ReactJs', extension: 'react' }
                break;
            default:
                break;
        }
        return tempTechnology;
    }

    
    const [collection, setData] = useState(null);
    const technology = technologySwicher(match);
    useEffect(() => {
        fetch(`http://localhost:3001/projects/${technology.extension}`)
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, [technology]);

    const IconizeFile = ({ name }) => {
        const fileNameExtension = name.split('.')[1];
        let icon = null;
        switch (fileNameExtension) {
            case 'js': icon = <FontAwesomeIcon className='fa-2x ' icon={faJs} />
                break;
            case 'java': icon = <FontAwesomeIcon className='fa-2x  ' icon={faJava} />
                break;
            case 'css': icon = <FontAwesomeIcon className='fa-2x  ' icon={faCss3} />
                break;
            case 'html': icon = <FontAwesomeIcon className='fa-2x ' icon={faHtml5} />
                break;
            case 'vue': icon = <FontAwesomeIcon className='fa-2x ' icon={faVuejs} />
                break;
            case 'node': icon = <FontAwesomeIcon className='fa-2x ' icon={faNodeJs} />
                break;
            default: icon = <FontAwesomeIcon className='fa-2x ' icon={faCode} />
                break;
        }
        return icon;
    }

    const showModal = (value) => {
        const internalFiles = document.querySelectorAll('.modal');
        internalFiles.forEach(file => {
            if (file.classList.contains(value)) {
                file.classList.toggle('modal-closed');
                file.classList.toggle('modal-opened');
            }
        })
    }

    // prism
    const CodeModal = ({ code = 'There is no code inside this file.', fileId, name }) => {
        const exampleCode = `${code}`.trim();
        return (<Highlight {...defaultProps} theme={theme} code={exampleCode} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} modal modal-closed ${fileId}`} style={style}>
                    <span className="close" onClick={() => showModal(fileId)}>&times;</span>
                    <div className='float-right'><IconizeFile name={name} /> <h3>{name}</h3></div>
                    <code>
                        {tokens.map((line, i) => (
                            <div {...getLineProps({ line, key: i })}>
                                <code>
                                    {line.map((token, key) => (
                                        <span {...getTokenProps({ token, key })} />
                                    ))}
                                </code>
                            </div>
                        ))}
                    </code>
                </pre>
            )}
        </Highlight>
        )
    }

    const toggleClasses = (parentId) => {
        const internalFiles = document.querySelectorAll('.internal-files');
        const iconsToTurn = document.querySelectorAll('.icon-to-turn');
        internalFiles.forEach(file => {
            if (file.classList.contains(parentId)) {
                file.classList.toggle('folder-closed');
                file.classList.toggle('folder-opened');
            }
        })
        iconsToTurn.forEach(icon => {
            if (icon.classList.contains(parentId)) icon.classList.toggle('turn-downwards');
        })
    }
    return (<>
        <main className='node-main light main animate__animated animate__fadeInUp'>
            <div className='contact-title main-title'>
                <IconizeFile name={technology.extension} />
                <h1 className='main-title primary--text title-font'>My {technology.title} Projects</h1>
            </div>
            {(collection) ? collection.map((project) => {
                return (
                    <article className='all-projects' key={project._id}>
                        <div className='project-container light' >
                            <h1 className='project-title primary--text title-font'>Title: {project.title}</h1>
                            <p><span className='primary--text bold'>Created on:</span> {new Date(project.date).toLocaleString('eng-US', { dateStyle: 'long' })}</p>
                            <p><span className='primary--text bold'>URL:</span> <a target='_blank' href={project.url} rel="noopener noreferrer">{project.url}</a></p>
                            <p><span className='primary--text bold'>Description:</span> {project.description}</p>
                            <a target='_blank' href={project.screenshot} className='screenshot-container' rel="noopener noreferrer">
                                <picture >
                                    <source media="(min-width:650px)" srcSet={project.screenshot} />
                                    <source media="(min-width:465px)" srcSet={project.screenshot} />
                                    <img className='project-screenshot' src={project.screenshot} alt={`${project.title}-view`} />
                                </picture>
                            </a>


                            <div className='file-container'>
                                <span className='bold'>Files</span>
                                {
                                    <>
                                        <div key={project.code.file._id} className='file'>
                                            <button
                                                onClick={() => showModal(project.code.file._id)}
                                                className='file-button'
                                            >
                                                <FontAwesomeIcon icon={faFile} className='primary--text' /> {project.code.file.name}
                                            </button>
                                            <CodeModal code={project.code.file.content} fileId={project.code.file._id} name={project.code.file.name} />
                                        </div>
                                        {project.code.dir.map((folder) => <div key={folder._id}>
                                            <button onClick={() => toggleClasses(folder._id)} className='file-button'>
                                                <FontAwesomeIcon icon={faChevronRight} className={`${folder._id} primary--text icon-to-turn`} /> <FontAwesomeIcon icon={faFolder} className='secondary--text' />  {folder.name}
                                            </button>
                                            {folder.content.map(childFile => <div
                                                className={`${folder._id} file internal-files folder-closed`}
                                                key={childFile._id}>
                                                <button onClick={() => showModal(childFile._id)} className='file-button '> <FontAwesomeIcon icon={faFile} className='primary--text' />  {childFile.name}
                                                </button>
                                                <CodeModal code={childFile.content} fileId={childFile._id} name={childFile.name} />
                                            </div>)
                                            }
                                        </div>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                    </article>)
            }) : null}
        </main>
    </>)
}

export default ProjectViewer