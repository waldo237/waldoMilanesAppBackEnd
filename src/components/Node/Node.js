import React from 'react';
import './Node.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faFolder, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
const collection = [
    {
        id: 'project-id-1',
        title: 'EIP-SERVER-API',
        url: 'https://teacheip.com',
        date: new Date('2019-04-17T03:24:00'),
        description: 'This is an API server created with node and express. It handles user registration and user profiles for a web application',
        screenshots: 'https://d2ijz6o5xay1xq.cloudfront.net/account_1944/postman-screen_c19b98186c029cbac20ae221fb1f3392_800.png',
        code: [{
            name: 'index.js', type: 'file', id: 'file-id4', content: ''
        }, {
            name: 'routes', type: 'dir', id: 'routes1', content: [{
                name: 'internalFile', type: 'file', id: 'file-id-df', parentId: 'routes1'
            }]
        }, {
            name: 'controller', type: 'dir', id: 'controller1', content: [
                {name: 'userController', type: 'file', id: 'file-id-6', parentId: 'controller1'},
                {name: 'adminController', type: 'file', id: 'file-id-62', parentId: 'controller1'},
            ]
        }, {
            name: 'Models', type: 'dir', id: 'file-id-56', content: [{
                name: 'userModel', type: 'file', id: 'file-id-67', parentId: 'file-id-56'
            }]
        }]
    },
    {
        id: 'project-id-13',
        title: 'EIP-SERVER-API',
        url: 'https://teacheip.com',
        date: new Date('2019-04-17T03:24:00'),
        description: 'This is an API server created with node and express. It handles user registration and user profiles for a web application',
        screenshots: 'https://d2ijz6o5xay1xq.cloudfront.net/account_1944/postman-screen_c19b98186c029cbac20ae221fb1f3392_800.png',
        code: [{
            name: 'index.js', type: 'file', id: 'file-idtr', content: ''
        }, {
            name: 'routes', type: 'dir', id: 'file-id-266', content: [{
                name: 'internalFile', type: 'file', id: 'file-id-34', parentId: 'file-id-266'
            }]
        }]
    },
    {
        id: 'project-id-22',
        title: 'IMAGE-SERVER',
        url: 'https://IMMAGE.com',
        date: new Date('2018-04-25T03:24:00'),
        description: 'This is an API server created with node and express. It handles user registration and user profiles for a web application',
        screenshots: 'https://d2ijz6o5xay1xq.cloudfront.net/account_1944/postman-screen_c19b98186c029cbac20ae221fb1f3392_800.png',
        code: [{
            name: 'index.js', type: 'file', id: 'file-id343', content: ''
        }, {
            name: 'routes', type: 'dir', id: 'file-id-244', content: [{
                name: 'internalFile', type: 'file', id: 'file-id-33', parentId: 'file-id-244'
            }]
        }]
    }
];
const Node = () => {
    const toggleClasses = (parentId) => {
        const internalFiles = document.querySelectorAll('.internal-files');
        const iconsToTurn = document.querySelectorAll('.icon-to-turn');
        internalFiles.forEach(file => {
            if (file.classList.contains(parentId)){
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
            <h1 className='main-title primary--text title-font'>My Node Projects</h1>

            {collection.map((project) => {
                return (
                    <article className='all-projects' key={project.id}>
                        <div className='project-container light' >
                            <h1 className='project-title primary--text title-font'>Title: {project.title}</h1>
                            <p><span className='primary--text bold'>Created on:</span> {project.date.toLocaleString('en-US', { dateStyle: 'medium' })}</p>
                            <p><span className='primary--text bold'>URL:</span> <a target='_blank' href={project.url}>{project.url}</a></p>
                            <p><span className='primary--text bold'>Description:</span> {project.description}</p>
                            <a target='_blank' href={project.screenshots} className='screenshot-container'>
                                <picture >
                                    <source media="(min-width:650px)" srcSet={project.screenshots} />
                                    <source media="(min-width:465px)" srcSet={project.screenshots} />
                                    <img className='project-screenshot' src={project.screenshots} alt={`${project.title}-view`} />
                                </picture>
                            </a>
                            <div className='file-container'>
                                <span className='bold'>Files</span>
                                {project.code.map(file => (file.type === 'file')
                                    ? <Link to={`/node/file/${file.id}`} key={file.id}>
                                        <button className='file-button'> <FontAwesomeIcon icon={faFile} className='primary--text' />  {file.name}</button>
                                    </Link>
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
            })}
        </main>
    </>)
}

export default Node