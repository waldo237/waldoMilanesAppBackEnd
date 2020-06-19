


import React from 'react'
import './Articles.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

const articles = [
{id:'articleID', photo: 'https://images.unsplash.com/photo-1528372444006-1bfc81acab02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', 
date: new Date('05/25/2020'), 
title:'How I got into Programming', 
body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
]

const Articles =()=> {

  return (
    <>
     <div className='page-main animate__animated animate__fadeInUp light'>
       <div className='main-title contact-title'>
       <FontAwesomeIcon className='fa-2x primary--text  ' icon={faFeatherAlt} />   <h1 className='primary--text title-font'>Articles I have written</h1> 
       </div>  
        {articles.map((item)=> <article key={item.id} className='hoverable-card card-container article-card'>
          <div>
            <picture >
                <source media="(min-width:650px)" srcSet={item.photo} />
                <source media="(min-width:465px)" srcSet={item.photo} />
                <img className='article-img' src={item.photo} alt={`${item.title}-view`} />
            </picture>
          </div>
          <div>
          <h1 className='primary--text'>{item.title} </h1>
          <small>{item.date.toLocaleString('eng-US',{dateStyle:'full'})} </small>
          <p className='article-body'> {item.body} </p>
          <small className='read-more-wrapper'>
              <Link to={`articles/${item.id}`} className='primary--text hover-underline-yellow'>Read more</Link>
          </small>

          </div>
        </article> 
        )}
         
     </div>
    </>
  )
}
export default Articles