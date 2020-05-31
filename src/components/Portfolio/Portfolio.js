import React from 'react'
import './Portfolio.css'
import { Link } from 'react-router-dom'
const Portfolio = () => {
    const projects = [
        { url: '/node', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png', title: 'My projects done with NodeJs', description: 'A collection of projects I have created using NodeJs. They reflect my experience working with this technology.' },
        { url: '/java', photo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png', title: 'My projects done with Java', description: 'A collection of projects I have created using Java. They reflect my experience working with this technology.' },
        { url: '/vue', photo: 'https://miro.medium.com/max/800/1*wqYF-8Dmh7LhtLkKfERc3Q.png ', title: 'My projects done with VueJS', description: 'A collection of projects I have created using VueJS. They reflect my experience working with this technology.', },
        { url: '/react', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', title: 'My projects done with ReactJS', description: 'A collection of projects I have created using ReactJS. They reflect my experience working with this technology.', },
    ]
    return (
        <>
            <main className='main animate__animated animate__fadeInUp light'>
                <header className='porfolio-title title-font primary--text '>
                    <h1>My Work</h1>
                </header>
                {projects.map((project) => <article key={project.url}  className='hoverable-card technology-container project-container'>
                         <Link to={project.url} className='link'>
                                <picture >
                                    <source media="(min-width:650px)" srcSet={project.photo} />
                                    <source media="(min-width:465px)" srcSet={project.photo} />
                                    <img className='technology-img' src={project.photo} alt={`${project.title}-view`} />
                                </picture>
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