import React, { useEffect, useState } from 'react';
import './Node.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faNodeJs } from '@fortawesome/free-brands-svg-icons'
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Link } from 'react-router-dom';

const Node = () => {
    const [modal, showModal] = useState(false);
    const [collection, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:3001/projects`)
            .then(res => res.json())
            .then(setData)
            .catch(console.error);
    }, []);
    // prism
    const CodeModal = (props) => {
        const exampleCode = `${props.code}`.trim();
        return (<Highlight className='modal'{...defaultProps} theme={theme} code={exampleCode} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} />
                            ))}
                        </div>
                    ))}
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
                <FontAwesomeIcon className='fa-2x primary--text  contact-icon' icon={faNodeJs} />
                <h1 className='main-title primary--text title-font'>My Node Projects</h1>
            </div>
            {(collection) ? collection.map((project) => {
                return (
                    <article className='all-projects' key={project._id}>
                        <div className='project-container light' >
                            <h1 className='project-title primary--text title-font'>Title: {project.title}</h1>
                            <p><span className='primary--text bold'>Created on:</span> {project.date.toLocaleString('eng-US', { dateStyle: 'full' })}</p>
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
                                    ? <div onClick={() => showModal(true)} key={file.id}>
                                        <button className='file-button'> <FontAwesomeIcon icon={faFile} className='primary--text' />  {file.name}</button>

                                        {(modal) ? <CodeModal code={file.content} /> : null}
                                    </div>
                                    : <div key={file.id}>
                                        <button onClick={() => toggleClasses(file.id)} className='file-button'>
                                            <FontAwesomeIcon icon={faChevronRight} className={`${file.id} primary--text icon-to-turn`} /> <FontAwesomeIcon icon={faFolder} className='secondary--text' />  {file.name}
                                        </button>
                                        {file.content.map(childFile => <Link
                                            className={`${childFile.parentId} internal-files folder-closed`}
                                            to={`/node/file/${childFile.id}`}
                                            key={childFile.id}>
                                            <button className='file-button '> <FontAwesomeIcon icon={faFile} className='primary--text' />  {childFile.name}
                                            </button>
                                        </Link>)
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