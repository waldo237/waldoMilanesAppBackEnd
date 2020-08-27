import escape from "validator/es/lib/escape";
import envURL from "../../envURL";
import { fetchPayloadFromJWT } from '../Supporters/utilities/authorizationFunctions';

const profileValidator = (user) => {
  const res = {
    valid: true,
    errors: [],
  };

  if (!user.firstName) {
    res.errors.push({
      type: "firstName",
      message: "Please do not forget include your first name.",
    });
    res.valid = false;
  } else if (user.firstName.length > 20) {
    res.errors.push({
      type: "firstName",
      message: "The first name shouldn't be longer than 20 characters.",
    });
    res.valid = false;
  }
  if (!user.lastName) {
    res.errors.push({
      type: "lastName",
      message: "Please do not forget include your last name.",
    });
    res.valid = false;
  } else if (user.lastName > 20) {
    res.errors.push({
      type: "lastName",
      message: "The last name shouldn't be longer than 20 characters.",
    });
    res.valid = false;
  }

  if (res.valid) {
    res.sanitized = {
      firstName: escape(user.firstName.trim()),
      lastName: escape(user.lastName.trim()),
      email: escape(user.email.trim()),
      photoURL: user.photoURL
    };
  }

  return res;
};

 const getTokenFromLocalStorage = () =>{
 return (localStorage.getItem('auth_access_token'))
  ? localStorage.getItem('auth_access_token')
  : sessionStorage.getItem('auth_access_token');
 }
/**
 * @function saveChanges sends the new changes to the server.
 * @param {*} profileData:object {email:string, firtName:string, lastName:string,  photoURL:string}
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 *  @param pathname:string -- a URI
 */
const saveChanges = (options) => {
  const { profileData, setRequest, setResponse, setErrors, pathname } = options;
  const token = getTokenFromLocalStorage();
  if (profileValidator(profileData).valid) {
    setRequest(true);
    const sanitizedData = profileValidator(profileData).sanitized;
    fetch(`${envURL}${pathname}`, {
      method: "PUT",
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
      // .then(setRequest(false))
      .catch(console.error);
  } else {
    setErrors(profileValidator(profileData).errors);
  }
}

/**
 * @function fetchProfile calls API to get the user profile.
 * @param {*} setData a useState function(user:object)
 *  @param pathname:string -- a URI
 */
const fetchProfile = (pathname, setData) => {
  const token = getTokenFromLocalStorage();
  const { email } = fetchPayloadFromJWT(token);
  if (token) {
    fetch(`${envURL}${pathname}`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }
}
/**
 * @function cancelAccount calls API to request an the cancelation of the account.
 * @param {*} profileData:object {email:string, firtName:string, lastName:string,  photoURL:string}
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 *  @param pathname:string -- a URI
 */
const cancelAccount = (options) => {
  const { profileData, setRequest, setResponse, setErrors, pathname } = options;
  const token = getTokenFromLocalStorage();
  if (profileValidator(profileData).valid) {
    setRequest(true);
    const sanitizedData = profileValidator(profileData).sanitized;
    fetch(`${envURL}${pathname}`, {
      method: "DELETE",
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
      .then(setRequest(false))
      .catch(console.error);
  } else {
    setErrors(profileValidator(profileData).errors);
  }
}

/**
 * @function setEndOfContenteditable --- By default, browsers move the cursor to the beginning when you are
 * using contentEditable.--- This function overides that.
 * Create a range (a range is a like the selection but invisible)
 * Select the entire contents of the element with the range
 * collapse the range to the end point. false means collapse to end rather than the start
 * get the selection object (allows you to change selection)
 * remove any selections already made
 * make the range you have just created the visible selection
 * @param {*} contentEditableElement:DOM element.
 *
 */
const setEndOfContenteditable =(contentEditableElement)=> {
    let range;
    let selection;
    if(document.createRange) {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if(document.selection){ 
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}

const moveCursorRight =(e) =>{
     const elem = e.target;
      elem.focus();
      setEndOfContenteditable(elem);
}

export { profileValidator, saveChanges, fetchProfile, moveCursorRight, cancelAccount };
