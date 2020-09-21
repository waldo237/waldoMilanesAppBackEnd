import isEmail from "validator/es/lib/isEmail";
import escape from "validator/es/lib/escape";

const contactValidator = (user) => {
  const res = {
    valid: true,
    errors: [],
  };

  if (!user.name) {
    res.errors.push({
      type: "name",
      message: "Please do not forget to include your name.",
    });
    res.valid = false;
  } else if (user.name.length < 3) {
    res.errors.push({
      type: "name",
      message: "The name should be longer than 3 characters.",
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
      message: "The email you provided is not correct.",
    });
    res.valid = false;
  }

  if (!user.message) {
    res.errors.push({
      type: "message",
      message: "Please do not forget to include your message.",
    });
    res.valid = false;
  } else if (user.message.length < 15) {
    res.errors.push({
      type: "message",
      message: "The message should be longer than 15 characters.",
    });
    res.valid = false;
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

export default contactValidator;
