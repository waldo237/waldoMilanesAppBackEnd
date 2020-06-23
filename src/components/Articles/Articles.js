import React, { useState, useEffect } from 'react'
import './Articles.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'


const Articles = () => {

  const [articles, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/articles')
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  },[]);

  return (
    <>
      <div className='page-main animate__animated animate__fadeInUp light'>
        <div className='main-title contact-title'>
          <FontAwesomeIcon className='fa-2x primary--text  ' icon={faFeatherAlt} />   <h1 className='primary--text title-font'>Articles I have written</h1>
        </div>
        {articles.map((item) => <article key={item._id} className='hoverable-card card-container article-card'>
          <div>
            <picture >
              <source media="(min-width:650px)" srcSet={item.photo} />
              <source media="(min-width:465px)" srcSet={item.photo} />
              <img className='article-img' src={item.photo} alt={`${item.title}-view`} />
            </picture>
          </div>
          <div>
            <h1 className='primary--text'>{item.title} </h1>
            <small>{item.date.toLocaleString('eng-US', { dateStyle: 'full' })} </small>
            <p className='article-body'> {item.body} </p>
            <small className='read-more-wrapper'>
              <Link to={`articles/${item._id}`} className='primary--text hover-underline-yellow'>Read more</Link>
            </small>
          </div>
        </article>
        )}

      </div>
    </>
  )
}
export default Articles