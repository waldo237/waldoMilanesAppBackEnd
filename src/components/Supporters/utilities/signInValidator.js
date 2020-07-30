/* eslint-disable no-plusplus */
import isEmail from "validator/es/lib/isEmail";

const signInValidator = (user) => {
  const res = {
    valid: true,
    errors: [],
  };

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
      type: "password",
      message: "Please do not forget to include your password.",
    });
    res.valid = false;
  }else{
    const pass = user.password;
    if (pass.length < 8 || pass.length > 32) {
      res.errors.push({
        type: "password",
        message: "Please check your password length",
      });
      res.valid = false;
    }
  } 

  if (res.valid) {
    res.sanitized = {
      email: user.email.trim(),
      password: user.password.trim(),
      rememberMe: user.rememberMe
    };
  }

  return res;
};

export default signInValidator;
