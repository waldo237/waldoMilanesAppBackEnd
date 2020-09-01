import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import envURL from '../../envURL';
import './SingleArticle.scss'
import CommentBox from './CommentBox';

const SingleArticle =({match})=>{
    const [articleData, setData] = useState(null);
    useEffect(() => {
        document.title = `One of my articles.`;
        
        fetch(`${envURL}${match.url}`)
          .then((res) => res.json())
          .then(setData)
          .catch(console.error);
    
      }, [match.url]);

    return (
      <>
        <main className='single-article-container light'>
          {(articleData)? (
           
            <div className='single-article-card'>
              <h1 className='single-article-title'>{articleData.title}</h1>
              <picture className="single-article-img">
                <source media="(min-width:650px)" srcSet={articleData.photo} />
                <source media="(min-width:465px)" srcSet={articleData.photo} />
                <img
                  className="single-article-img"
                  src={articleData.photo}
                  alt={`${articleData.title}-view`}
                />
              </picture>
              <small className='single-article-date'>
                Pubished on: {" "} {new Date(articleData.date).toLocaleString("eng-US", {
                      dateStyle: "long",
                    })}
              </small>
              <p className="single-article-text">{articleData.body}</p> 
              <CommentBox />
            </div>
            ):null}
        </main>
      </>
)
}

SingleArticle.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  match: Proptypes.object.isRequired,
}
export default SingleArticle;

