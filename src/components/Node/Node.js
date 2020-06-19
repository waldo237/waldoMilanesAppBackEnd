import React, { useEffect, useState } from 'react';
import './Node.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder, faChevronRight, faCode } from '@fortawesome/free-solid-svg-icons'
import { faNodeJs, faJs, faCss3, faHtml5, faJava } from '@fortawesome/free-brands-svg-icons'
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const Node = () => {
    const IconizeFile = ({name}) => {
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
            case 'vue': icon = <FontAwesomeIcon className='fa-2x ' icon={faHtml5} />
                break;
            default:  icon = <FontAwesomeIcon className='fa-2x ' icon={faCode} /> 
                break;
        }
        return icon;
    }

    const showModal = (value) => {
        console.log(value)
        const internalFiles = document.querySelectorAll('.modal');
        internalFiles.forEach(file => {
            if (file.classList.contains(value)) {
                file.classList.toggle('modal-closed');
                file.classList.toggle('modal-opened');
            }
        })
    }
    const [collection, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/projects`)
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);
    // prism
    const CodeModal = ({code='There is no code in this file.', fileId, name}) => {
        const exampleCode = `${code}`.trim();
        return (<Highlight {...defaultProps} theme={theme} code={exampleCode} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} modal modal-closed ${fileId}`} style={style}>
                    <span className="close" onClick={() => showModal(fileId)}>&times;</span>
                 <div className='float-right'><IconizeFile name={name}/> <h3>{name}</h3></div>  
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
                <FontAwesomeIcon className='fa-2x primary--text  ' icon={faNodeJs} />
                <h1 className='main-title primary--text title-font'>My Node Projects</h1>
            </div>
            {(collection) ? collection.map((project) => {
                return (
                    <article className='all-projects' key={project._id}>
                        <div className='project-container light' >
                            <h1 className='project-title primary--text title-font'>Title: {project.title}</h1>
                            <p><span className='primary--text bold'>Created on:</span> {new Date (project.date).toLocaleString('eng-US', { dateStyle: 'long' })}</p>
                            <p><span className='primary--text bold'>URL:</span> <a target='_blank' href={project.url}>{project.url}</a></p>
                            <p><span className='primary--text bold'>Description:</span> {project.description}</p>
                            <a target='_blank' href={project.screenshot} className='screenshot-container'>
                                <picture >
                                    <source media="(min-width:650px)" srcSet={project.screenshot} />
                                    <source media="(min-width:465px)" srcSet={project.screenshot} />
                                    <img className='project-screenshot' src={project.screenshot} alt={`${project.title}-view`} />
                                </picture>
                            </a>

                            <div className='file-container'>
                                <span className='bold'>Files</span>
                                {project.code.map(file => (file.type === 'file')
                                    ? <div key={file.id} className='file'>
                                        <button onClick={() => showModal(file.id)} className='file-button'> <FontAwesomeIcon icon={faFile} className='primary--text' />  {file.name}</button>
                                        <CodeModal code={file.content} fileId={file.id} name={file.name} />
                                    </div>
                                    : <div key={file.id}>
                                        <button onClick={() => toggleClasses(file.id)} className='file-button'>
                                            <FontAwesomeIcon icon={faChevronRight} className={`${file.id} primary--text icon-to-turn`} /> <FontAwesomeIcon icon={faFolder} className='secondary--text' />  {file.name}
                                        </button>
                                        {file.content.map(childFile => <div
                                            className={`${childFile.parentId} file internal-files folder-closed`}
                                            key={childFile.id}>
                                            <button onClick={() => showModal(childFile.id)} className='file-button '> <FontAwesomeIcon icon={faFile} className='primary--text' />  {childFile.name}
                                            </button>
                                            <CodeModal code={childFile.content} fileId={childFile.id} name={childFile.name} />
                                        </div>)
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>)
            }) : null}
        </main>
    </>)
}

export default Node