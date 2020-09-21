import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Proptypes from 'prop-types'

function CommentActions({comment, handleEditing}) {

    return (
      <div id={comment._id} className="comment-options fade">
        <div className="comment-card">
          <div
            className="commnet-action" 
            onClick={()=> handleEditing(comment._id)}
            onKeyDown={()=> handleEditing(comment._id)}
          >
            <FontAwesomeIcon
              className="commnet-action-icon"
              icon={faPencilAlt}
            />
            <p>Edit comment</p> 
          </div>
          <div className="commnet-action">
            <FontAwesomeIcon
              className="commnet-action-icon"
              icon={faTrashAlt}
            />
            <p>Delete comment</p> 
          </div>
         
        </div>
      </div>
    )
}
CommentActions.propTypes = {
    comment: Proptypes.shape({
      comment: Proptypes.string,
      date: Proptypes.string,
      _id: Proptypes.string,
      userId: Proptypes.string,
    }),
    handleEditing: Proptypes.func.isRequired
  }
  
  CommentActions.defaultProps = {
    comment: {
      date: new Date("2020-09-19T01:40:11.205Z"),
      _id: "5f65617b0f3d440ba831f52c",
      comment: "no comment",
      userId: "5f221a90a53baf4da8b304d3"
    }
}
export default CommentActions
