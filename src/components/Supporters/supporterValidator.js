/* eslint-disable no-plusplus */
import isEmail from "validator/es/lib/isEmail";
import escape from "validator/es/lib/escape";

const supporterValidator = (user) => {
  const res = {
    valid: true,
    errors: [],
  };

  if (!user.name) {
    res.errors.push({
      type: "name",
      message: "Please do not forget include your first name.",
    });
    res.valid = false;
  } else if (user.name.length > 20) {
    res.errors.push({
      type: "name",
      message: "The first name shouldn't be longer than 20 characters.",
    });
    res.valid = false;
  }
  if (!user.name) {
    res.errors.push({
      type: "name",
      message: "Please do not forget include your last name.",
    });
    res.valid = false;
  } else if (user.name.length > 20) {
    res.errors.push({
      type: "name",
      message: "The last name shouldn't be longer than 20 characters.",
    });
    res.valid = false;
  }

  if (!user.email) {
    res.errors.push({
      type: "email",
      message: "Please do not forget to include your email address.",
    });
    res.valid = false;
  } else if (!isEmail(user.email)) {
    res.errors.push({
      type: "email",
      message: "The email your provided is not correct.",
    });
    res.valid = false;
  }

  if (!user.password) {
    res.errors.push({
      type: "message",
      message: "Please do not forget to include your password.",
    });
    res.valid = false;
  } else {
    let count = 0;
    const pass = user.password;
    if (pass.length >= 8 && pass.length <= 32) {
      if (pass.match(/.*\d.*/)) count++;
      if (pass.match(/.*[a-z].*/)) count++;
      if (pass.match(/.*[A-Z].*/)) count++;
      if (pass.match(/.*\W.*/)) count++;
      res.passwordStrength = count;
      if (count <= 2) {
        res.errors.push({
          type: "message",
          message: "The password is not strong enough",
          recommendation: [
            "At least one digit",
            "At least one lowercase character",
            "At least one uppercase character",
            "At least one special character",
          ],
        });
        res.valid = false;
      }
    } else {
      res.errors.push({
        type: "message",
        message:
          "Your password should be at least 8 characters in length, but no more than 32",
      });
    }
    console.log(res.errors);
  }
  if (res.valid) {
    res.sanitized = {
      name: escape(user.name.trim()),
      email: escape(user.email.trim()),
      message: escape(user.message.trim()),
    };
  }

  return res;
};

export default supporterValidator;
