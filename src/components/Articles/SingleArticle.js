import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import envURL from '../../envURL';
import './SingleArticle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt, faThumbsUp, faThumbsDown, faCommentAlt, faShareAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
        <main className='single-article-container'>
          {(articleData)? (
           
            <div className='single-article-card'>
              <header className='single-article-header'>
                <h1 className='single-article-title'>{articleData.title}</h1>
              </header>
            
              <div className='single-article-img-wrapper'>
                <picture>
                  <source media="(min-width:650px)" srcSet={articleData.photo} />
                  <source media="(min-width:465px)" srcSet={articleData.photo} />
                  <img
                    className="single-article-img"
                    src={articleData.photo}
                    alt={`${articleData.title}-view`}
                  />
                </picture>
              </div>
              <small className='single-article-date'>
                Pubished on: {" "} {new Date(articleData.date).toLocaleString("eng-US", {
                      dateStyle: "long",
                    })}
              </small>
              <p className="single-article-text">{articleData.body}</p> 
              <div className='single-article-action'>
                <span>
                  <FontAwesomeIcon
                    className="fa-lg"
                    icon={faThumbsUp}
                  />{" "}
                  <FontAwesomeIcon
                    className="fa-lg fa-flip-horizontal	"
                    icon={faThumbsDown}
                  />{" "}
                  Your opinion
                </span> 
                <span>
                  <FontAwesomeIcon
                    className="fa-lg"
                    icon={faCommentAlt}
                  />{" "}
               
                  Comments
                </span> 
                <span>
                  <FontAwesomeIcon
                    className="fa-lg"
                    icon={faShareAlt}
                  />{" "}
               
                  Share
                </span> 
                <div>
                  <div className="form-group">
                    <label className="input" htmlFor="comment-input">Write a comment
                      <input
                        id="comment-input"
                        name="comment"
                        type="text"
                        className="form-control"
                        placeholder="Write a comment"
                        // onChange={inputHandler}
                      />
                       <FontAwesomeIcon
                    className="fa-lg"
                    icon={faPaperPlane}
                  />{" "}
                    </label>

                  </div>
                </div>
              </div>
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