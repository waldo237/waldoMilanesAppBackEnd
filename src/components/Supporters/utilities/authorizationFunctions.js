
import { auth, gProvider, fProvider } from './auth0';
import envURL from '../../../envURL';
import signInValidator from './signInValidator'

/**
 * Write a @function saveTokenLocally to be chained after the token is received throw all methods
 * if rememberMe is true, take the token in the response and save it in localstorage
 * else save it on sessionCookies
 */
const saveTokenLocally = (token) => {
    // TODO
    localStorage.setItem('auth_access_token', token);
}

const distroyToken = () => {
    // TODO
    /* 
  write a function distroyToken that will locate the token and delete it from localStorage
     */
}
const logOut = () => {
    // TODO
    /* 
  write a function distroyToken that will locate the token and delete it from localStorage
     */
}


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
                .then(jsonRes => ({ successful: res.ok, message: jsonRes.message, link: jsonRes.link })))
            .then(setResponse)
            .catch(console.error);

    } else {
        setErrors(signInValidator(user).errors);
    }
}

// sign with google
const signWithGoogleOrFB = (whichService, setResponse) => {
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
                // .then((res)=> console.log(res.json()))

                .then(res => res.json())
                .then(jsonRes => {
                    saveTokenLocally(jsonRes.token);
                    return { successful: jsonRes.ok, message: jsonRes.message, link: jsonRes.link };
                })
                .then(setResponse)
                .catch(console.error);
        })
        .catch(err => console.log(err.message));
};




// eslint-disable-next-line import/prefer-default-export
export { saveTokenLocally, distroyToken, logIn, signWithGoogleOrFB, logOut }