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
      message: "The email you provided is not correct.",
    });
    res.valid = false;
  }

  if (!user.password) {
    res.errors.push({
      type: "password",
      message: "Please do not forget to include your password.",
    });
    res.valid = false;
  } else {
    const { password } = user;
    if (password.length < 8 || password.length > 32) {
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


const emailValidator = (user) => {
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
      message: "The email you provided is not correct.",
    });
    res.valid = false;
  }
  if (res.valid) {
    res.sanitized = {
      email: user.email.trim(),
    };
  }

  return res;
};


const resetPasswordValidator = (user) => {
  const res = {
    valid: true,
    errors: [],
  };
  const { password, reEntered } = user;

  if (!password) {
    res.errors.push({
      type: "password",
      message: "Please remember to include your password.",
    });
    res.valid = false;
  } else {
    let count = 0;
    if (password.length >= 8 && password.length <= 32) {
      if (password.match(/.*\d.*/)) count++;
      if (password.match(/.*[a-z].*/)) count++;
      if (password.match(/.*[A-Z].*/)) count++;
      if (password.match(/.*\W.*/)) count++;
      res.passwordStrength = count;
      if (count <= 2) {
        res.errors.push({
          type: "password",
          message: "The password is not strong enough",

        });
        res.suggestions = [
          "At least one digit",
          "At least one lowercase character",
          "At least one uppercase character",
          "At least one special character",
        ];
        res.valid = false;
      }
    } else {
      res.errors.push({
        type: "password",
        message:
          "Your password should be at least 8 characters in length, but no more than 32",
      });
    }
  }
  if (!reEntered) {
    res.errors.push({
      type: "reEntered",
      message: "Please re-enter password.",
    })
   
  }else if (password !== reEntered) {
      res.errors.push({
        type: "reEntered",
        message: "The passwords are different.",
      });
      res.valid = false;
    }
  if (res.valid) {
    res.sanitized = {
      password: user.password.trim(),
    };
  }

  return res;
};

export { signInValidator, resetPasswordValidator, emailValidator };
