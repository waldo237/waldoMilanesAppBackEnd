import envURL from '../../envURL';

const { getTokenFromLocalStorage } = require("../gobalUtil");
const { default: commentValidator } = require("./commentValidator");
/**
 * @function addComment sends the new comment to the server.
 * @param options:object containing the other parameters
 * @param {*} comment: string longer than 3 characters.
 * @param {*} itemId :string the uid of the item subject to the comment.
 * @param {*} setRequest :function useState(object:{message:string, successful:boolean, link:url})
 * @param {*} setResponse :function useState(object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors :function useState(errors:array)
 *  @param pathname:string -- a URI
 */
const saveComment = (options) => {
    const { userId, commentInput, itemId, setRequest, setResponse, setErrors, pathname} = options;
    const token = getTokenFromLocalStorage();

        if (commentValidator(commentInput).valid) {
            setRequest(true);
            const sanitizedData = {
                comment: commentValidator(commentInput).sanitized,
                userId,
                id: itemId
            };
            fetch(`${envURL}${pathname}/comment`, {
              method: "POST",
              headers: {
                'Authorization': `JWT ${token}`,
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(sanitizedData),
            })
              .then((res) => {
                return res.json()
                  .then(jsonRes => {
                    return { successful: res.ok, message: jsonRes.message, link: jsonRes.link };
                  });
              })
              .then(setResponse)
              .then(() => setRequest(false))
              .catch(console.error);
          } else {
            setErrors(commentValidator(commentInput).errors);
          }
  }

  export { saveComment };