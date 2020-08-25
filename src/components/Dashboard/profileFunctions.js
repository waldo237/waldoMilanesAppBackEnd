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

    };
  }

  return res;
};
/**
 * @function saveChanges sends the new changes to the server.
 * @param {*} user:object {email:string, password:string, rememberMe:boolean}
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 *  @param pathname:string -- a URI
 */
const saveChanges = (options) => {
  const { profileData, setRequest, setResponse, setErrors, pathname } = options;
  if (profileValidator(profileData).valid) {
    setRequest(true);
    const sanitizedData = profileValidator(profileData).sanitized;
    fetch(`${envURL}${pathname}`, {
      method: "PUT",
      headers: {
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
      .catch(console.error);
  } else {
    setErrors(profileValidator(profileData).errors);
  }
}

const fetchProfile = (pathname, setData) => {
  const token = (localStorage.getItem('auth_access_token'))
    ? localStorage.getItem('auth_access_token')
    : sessionStorage.getItem('auth_access_token');
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
export { profileValidator, saveChanges, fetchProfile };
