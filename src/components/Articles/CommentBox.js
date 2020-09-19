import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faShareAlt, faCommentAlt, faThumbsDown, faThumbsUp,  faEllipsisH, } from '@fortawesome/free-solid-svg-icons';
import './CommentBox.scss'
import Proptypes from 'prop-types'
import { Context } from '../../store/store';
import CommentActions from './CommentActions';
import {ClickAwayCloser, removeDisplayNone} from '../Nav/ClickAwayCloser'

const CommentBox = ({ comments, rating }) => {
  const [state] = useContext(Context);
  const { Trans } = state;

  return (
    <>
      <div className='comment-box-action'>
        <p>
          <div>
            <small>{rating.filter((rate)=> rate=== "like").length}</small>
            <FontAwesomeIcon
              className="fa-lg"
              icon={faThumbsUp}
            />{" "}
          </div>  
          <div>
            <FontAwesomeIcon
              className="fa-lg fa-flip-horizontal	"
              icon={faThumbsDown}
            />
            <small>{rating.filter((rate)=> rate=== "dislike").length}</small>
            {" "}
          </div>  
          {" "}
          {/* <Trans i18nKey='commentBox.impression'>Impression</Trans> */}
        </p>
        <p> <small>{comments.length}</small>  <FontAwesomeIcon
          className="fa-lg"
          icon={faCommentAlt}
        />{" "}
        <Trans i18nKey='commentBox.comments'>Comments</Trans>
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
   
      {
          comments.map((comment) => (
            <div className="comment-display" key={comment._id}>
              <FontAwesomeIcon
                className="comment-btn"
                icon={faEllipsisH}
                onClick={()=>removeDisplayNone(comment._id)}
              />
              <p>{comment.comment}</p>
              <small>{new Date(comment.date).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: '2-digit',
                hour: '2-digit'
              })} 
              </small>
              <ClickAwayCloser>
                <CommentActions comment={comment} />  
              </ClickAwayCloser>
            
            </div>
          )
          )
}
    </>
  )
}
CommentBox.propTypes = {
  rating: Proptypes.arrayOf(Proptypes.oneOf(['like', 'dislike'])),
  comments: Proptypes.arrayOf(Proptypes.shape({
    comment: Proptypes.string,
    date: Proptypes.string,
    _id: Proptypes.string,
    userId: Proptypes.string,
  }))
}

CommentBox.defaultProps = {
  rating: ['like'],
  comments: [{
    date: new Date("2020-09-19T01:40:11.205Z"),
    _id: "5f65617b0f3d440ba831f52c",
    comment: "no comment",
    userId: "5f221a90a53baf4da8b304d3"
  },
  {
    date: new Date("2020-09-19T01:40:11.205Z"),
    _id: "5f65617b0f3d440ba831f52a",
    comment: "Seriously this is a long comment because I want to know how it looks",
    userId: "5f221a90a53baf4da8b304d3"
  }]
}

export default CommentBox; 