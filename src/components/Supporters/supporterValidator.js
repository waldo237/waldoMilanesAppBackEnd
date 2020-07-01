import isEmail from 'validator/es/lib/isEmail';
import escape from 'validator/es/lib/escape';


const supporterValidator = (user) => {
    let res = {
        valid: true,
        errors: []
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let passwordMatches;

    if (!user.name) {
        res.errors.push({ type: 'name', message: "Please do not forget include your first name." });
        res.valid = false;
    } else if (user.name.length > 20) {
        res.errors.push({ type: 'name', message: "The first name shouldn't be longer than 20 characters." });
        res.valid = false;
    }
    if (!user.name) {
        res.errors.push({ type: 'name', message: "Please do not forget include your last name." });
        res.valid = false;
    } else if (user.name.length > 20) {
        res.errors.push({ type: 'name', message: "The last name shouldn't be longer than 20 characters." });
        res.valid = false;
    }

    if (!user.email) {
        res.errors.push({ type: 'email', message: "Please do not forget to include your email address." });
        res.valid = false;
    } else if (!isEmail(user.email)) {
        res.errors.push({ type: 'email', message: "The email your provided is not correct." });
        res.valid = false;
    }

    if (!user.password) {
        res.errors.push({ type: 'message', message: "Please do not forget to include your message." });
        res.valid = false;
    } else if ((passwordMatches = regex.exec(user.password)) !== null) {
        passwordMatches.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
        });
    }
//     res.errors.push({ type: 'message', message: " At least one digit" });
//     res.errors.push({ type: 'message', message: "At least one lowercase character" });
//     res.errors.push({ type: 'message', message: "At least one uppercase character" });
//     res.errors.push({ type: 'message', message: "At least one special character" });
//     res.errors.push({ type: 'message', message: "At least 8 characters in length, but no more than 32" });


//     res.valid = false;
// }

if (res.valid) {
    res.sanitized = {
        name: escape(user.name.trim()),
        email: escape(user.email.trim()),
        message: escape(user.message.trim())
    }
}

return res
}

export default supporterValidator