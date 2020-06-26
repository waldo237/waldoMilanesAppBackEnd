import React from 'react'
import './Portfolio.css'
import { Link } from 'react-router-dom'
import { faNodeJs, faJava, faVuejs, faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Portfolio = () => {
    const projects = [
        { url: '/project/node', icon: faNodeJs, title: 'My projects done with NodeJs', description: 'A collection of projects I have created using NodeJs. They reflect my experience working with this technology.' },
        { url: '/project/java', icon: faJava, title: 'My projects done with Java', description: 'A collection of projects I have created using Java. They reflect my experience working with this technology.' },
        { url: '/project/vue',icon: faVuejs, title: 'My projects done with VueJS', description: 'A collection of projects I have created using VueJS. They reflect my experience working with this technology.', },
        { url: '/project/react', icon: faReact, title: 'My projects done with ReactJS', description: 'A collection of projects I have created using ReactJS. They reflect my experience working with this technology.', },
    ]
    return (
        <>
            <main className='main animate__animated animate__fadeInUp light'>
                <header className='porfolio-title title-font primary--text '>
                    <h1>My Work</h1>
                </header>
                {projects.map((project) => <article key={project.url}  className='hoverable-card technology-container project-container'>
                         <Link to={project.url} className='link'>
                         <FontAwesomeIcon className='fa-5x primary--text  ' icon={project.icon} /> 
                              <h1 className='title-font primary--text technoly-title'>{project.title}</h1>
                            </Link>
                              <p> {project.description} </p>
                </article>
                )}
            </main>
        </>
    )
}

export default Portfolio