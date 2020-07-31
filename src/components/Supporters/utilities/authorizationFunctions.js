import { auth, gProvider, fProvider } from './auth0';
import envURL from '../../../envURL';
import signInValidator from './signInValidator'


/**
 * @function saveTokenLocally to be chained after the token is received
 * if rememberMe is true, take the token in the response and save it in localstorage
 * else save it on sessionCookies
 * @param {*} token a JWT token
 * @param {*} rememberMe  a boolean to decide where the token is stored.
 */
const saveTokenLocally = (token, rememberMe) => {
    //    ((t)=> {
    //         const tokenContent = {};
    //         tokenContent.raw = token;
    //         tokenContent.header = JSON.parse(window.atob(token.split('.')[0]));
    //         tokenContent.payload = JSON.parse(window.atob(token.split('.')[1]));
    //         console.log(tokenContent);
    //         return (tokenContent)
    //       })()
    if (rememberMe === true) return localStorage.setItem('auth_access_token', token);
    return sessionStorage.setItem('auth_access_token', token)
}

/**
 * @function logOut  logs out the user from services,
 * locates the token,delete it from localStorage, and redirects to '/ '
 * @param history is an instance of the useHistory hook
 * @todo before using it, prevent default behavior from event, in case it's called inside form.
 */
const logOut = (history) => {
    auth().signOut()
        .then(() => {
            sessionStorage.removeItem('auth_access_token');
            localStorage.removeItem('auth_access_token');
        })
        .then(history.push('/'))
        .catch(console.err)
}

/**
 * @function logIn logs the user with convetional techniques.
 * @param {*} user an object {email:string, password:string, rememberMe:boolean}
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 */
const logIn = (user, setRequest, setResponse, setErrors) => {
    if (signInValidator(user).valid) {
        setRequest(true);
        const sanitizedData = signInValidator(user).sanitized;
        fetch(`${envURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(sanitizedData),
        })
            .then((res) => res.json()
                .then(jsonRes => {
                    if (jsonRes.token) saveTokenLocally(jsonRes.token, user.rememberMe);
                    return { successful: res.ok, message: jsonRes.message, link: jsonRes.link }
                }))
            .then(setResponse)
            .catch(console.error);
    } else {
        setErrors(signInValidator(user).errors);
    }
}

/**
 * @function signWithGoogleOrFB logs the user with the Auth0 technique.
 * @param {*} whichService string (fb | google)
 * @param {*} setRequest a useState function(requestStarted:boolean)
 * @param {*} setResponse a useState function (object:{message:string, successful:boolean, link:url})
 * @param {*} setErrors a useState function (errors:array)
 */
const signWithGoogleOrFB = (whichService, setResponse, rememberMe) => {
    const provider = (whichService === 'fb') ? fProvider : gProvider;
    auth().signInWithPopup(provider)
        .then((result) => {
            const { user } = result;
            const names = user.displayName.split(" ");
            const reqBody = { cu_id: user.uid, email: user.email, firstName: names[0], lastName: names[names.length - 1] };

            fetch(`${envURL}/auth/withProvider`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(reqBody),
            })
                .then((res) => res.json()
                    .then(jsonRes => {
                        if (jsonRes.token) saveTokenLocally(jsonRes.token, rememberMe);
                        return { successful: res.ok, message: jsonRes.message }
                    }))
                .then(setResponse)
                .catch(console.error);
        })
        .catch(err => console.log(err.message));
};


/**
 * @function fetchHashedAccess verifies in sessionStorage for {hashed_access}. 
 * if it does not find it,  it hits auth/userIsLoggedIn with the access_token in the body. 
 * if it receives a negative answer (access_token.split('true')[1]==='401'), it will delete the jwt_token. 
 * else If it receives (access_token.split('true')[1]==='200'), it stores it in sessionStorage. 
 */
const fetchHashedAccess = () => {
    return new Promise((resolve, reject) => {
        const hashedAccess = sessionStorage.getItem('hashed_access');
        const token = (localStorage.getItem('auth_access_token'))
            ? localStorage.getItem('auth_access_token')
            : sessionStorage.getItem('auth_access_token')

        if(!token) return reject(new Error('there is not an existing token'));
        if (!hashedAccess) {
            fetch(`${envURL}/auth/userIsLoggedIn`,
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    body: JSON.stringify({token})
                }
            )
            .then(res => res.json())
            .then((hash)=>sessionStorage.setItem('hashed_access', hash))
            .catch(()=> reject(new Error('there was an issue while getting the data')))
        } 
           
        return resolve();
    })
}

/**
 * TODO
 * Now, when the user visits the page later
 * , the token in localstorage is sent to the server when the page is loaded 
 * and validated against the JWT. giving a friendly experience.
 */

// eslint-disable-next-line import/prefer-default-export
export { logIn, signWithGoogleOrFB, logOut, fetchHashedAccess }