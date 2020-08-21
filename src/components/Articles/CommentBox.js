import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faShareAlt, faCommentAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './CommentBox.scss'
const CommentBox = () =>{
    return (
      <>
        <div className='comment-box-action'>
          <p>  <FontAwesomeIcon
            className="fa-lg"
            icon={faThumbsUp}
          />{" "}<FontAwesomeIcon
            className="fa-lg fa-flip-horizontal	"
            icon={faThumbsDown}
          />{" "}Impression
          </p> 
          <p>   <FontAwesomeIcon
            className="fa-lg"
            icon={faCommentAlt}
          />{" "}Comments
          </p>  
          <p> <FontAwesomeIcon
            className="fa-lg"
            icon={faShareAlt}
          />{" "}Share
          </p>  
        </div>
        <div className='comment-box-comment'>
          <div className="form-group">
            <label className="input" htmlFor="comment-input">Write a comment
              <input
                id="comment-input"
                name="comment"
                type="text"
                className="form-control"
                placeholder="Write a comment"
              />
              <FontAwesomeIcon
                className="fa-lg"
                icon={faPaperPlane}
              />{" "}
            </label>
          </div>
        </div>
      </>
    )
}

export default CommentBox;