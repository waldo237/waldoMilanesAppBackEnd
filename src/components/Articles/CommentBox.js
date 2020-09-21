import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faShareAlt, faCommentAlt, faThumbsDown, faThumbsUp,  faEllipsisH, faSave, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import './CommentBox.scss'
import Proptypes from 'prop-types'
import { Context } from '../../store/store';
import CommentActions from './CommentActions';
import {ClickAwayCloser, removeDisplayNone} from '../Nav/ClickAwayCloser'
import commentValidator from './commentValidator';
import ResponseAlert from '../ResponseAlert/ResponseAlert';
import ErrorCard from '../ErrorCard/ErrorCard';
import { saveComment } from './commentBoxFunctions';

  // eslint-disable-next-line react/prop-types
  const SaveChangesBtn =  ({comment,editingMode, requestStarted,confirmEditable })=> {
    if ((editingMode && confirmEditable(comment._id))) {
      if (requestStarted) {
        return <FontAwesomeIcon className="fa-spin" icon={faCircleNotch} />;
      }
      return <svg className="fa-lg" aria-hidden="true" focusable="false" data-prefix="far" data-icon="save" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z" /></svg>;
    }
    return null;
  }

const CommentBox = ({ itemId, pathname, comments, rating }) => {
  const [state] = useContext(Context);
  const { Trans } = state;
  const [editingMode, setEditingMode] = useState(false);
  const [response, setResponse] = useState(null);
  const [requestStarted, setRequest] = useState(false);
  const [displayableErrors, setErrors] = useState([]);

  const [editableElemClass, setEditableElemClass] = useState("");
  const [commentInput,setCommentInput] = useState("");

  const inputHandler = (event) => {
    setCommentInput( event.target.value);
    setErrors(commentValidator(commentInput).errors);
  };
  const userId = state.profile._id;
  const options =  ({ userId, commentInput, itemId, setRequest, setResponse, setErrors, pathname});
  
  const openCommentOptions = (id)=>{
    removeDisplayNone(id);
    setEditableElemClass("");
    setEditingMode(false);
  };
  const confirmEditable = (id)=>{
   if(editingMode) return editableElemClass === `comment-text-${id}`
   return false;
  }
  function selectElementContents(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
  const handleEditing = (id)=>{
  const elem=  document.querySelector(`.comment-text-${id}`);
  setEditableElemClass(`comment-text-${id}`);
  setEditingMode(true);
  elem.focus({preventScroll:false});
  selectElementContents(elem);
    
  }

  
  return (
    <>
      {response
        ? (<ResponseAlert response={response} setResponse={setResponse} />)
        : null}
      {(displayableErrors) ? <ErrorCard errors={displayableErrors} setErrors={setErrors} /> : null}
      <div className='comment-box-action'>
        <p>
          <span>
            <small>{rating.filter((rate)=> rate=== "like").length}</small> {" "}
            <FontAwesomeIcon
              className="fa-lg"
              icon={faThumbsUp}
            />{" "}
          </span>  
          <span>
            <FontAwesomeIcon
              className="fa-lg fa-flip-horizontal	"
              icon={faThumbsDown}
            />
            {" "}
            <small>{rating.filter((rate)=> rate=== "dislike").length}</small>
            {" "}
          </span>  
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
              onChange={inputHandler}
            />
            <FontAwesomeIcon
              className="fa-lg"
              icon={faPaperPlane}
              onClick={()=>saveComment(options)}
              onKeyDown={()=>saveComment(options)}
            />{" "}
          </label>
        </div>
      </div>
   
      {
          comments.map((comment) => (
            <div className="comment-display" key={comment._id}>
              { (state.profile._id === comment.userId)
          ? (
            <div>
              <FontAwesomeIcon
                id="comment-options-btn"
                className="comment-btn"
                icon={faEllipsisH}
                onClick={()=>openCommentOptions(comment._id)}
                onKeyDown={()=>openCommentOptions(comment._id)}
                
              />

              {(!editingMode)
            ?  (
              <ClickAwayCloser exceptionById='comment-options-btn'> 
                <CommentActions comment={comment} handleEditing={handleEditing} />  
              </ClickAwayCloser>
)
            : null}
            </div>
          )
          :null}
              <div className='comment-text-container'>
                <p
                  className={`comment-text-${comment._id}`} 
                  contentEditable={confirmEditable(comment._id)}
                  suppressContentEditableWarning
                >{comment.comment}
              
                </p>
                <SaveChangesBtn comment={comment} editingMode={editingMode} requestStarted={requestStarted} confirmEditable={confirmEditable} />
     
              </div>
             
              <small>{new Date(comment.date).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: '2-digit',
                hour: '2-digit'
              })} 
              </small>
        
            
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