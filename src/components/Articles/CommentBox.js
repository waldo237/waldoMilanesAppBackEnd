import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faShareAlt, faCommentAlt, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './CommentBox.scss'
import { Context } from '../../store/store';

const CommentBox = () =>{
  const [state] = useContext(Context);
  const { Trans } = state;
    return (
      <>
        <div className='comment-box-action'>
          <p>  <FontAwesomeIcon
            className="fa-lg"
            icon={faThumbsUp}
          />{" "}<FontAwesomeIcon
            className="fa-lg fa-flip-horizontal	"
            icon={faThumbsDown}
          />{" "} <Trans i18nKey='commentBox.impression'>Impression</Trans>
          </p> 
          <p>   <FontAwesomeIcon
            className="fa-lg"
            icon={faCommentAlt}
          />{" "}<Trans i18nKey='commentBox.comments'>Comments</Trans>
          </p>  
          <p> <FontAwesomeIcon
            className="fa-lg"
            icon={faShareAlt}
          />{" "}<Trans i18nKey='commentBox.share'>Share</Trans>
          </p>  
        </div>
        <div className='comment-box-comment'>
          <div className="form-group">
            <label className="input" htmlFor="comment-input"> <Trans i18nKey='commentBox.write'>Write a comment</Trans>
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