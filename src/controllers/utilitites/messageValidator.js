const isEmail = require('validator/lib/isEmail');
const escape = require('validator/lib/escape');

const messageValidator = (user) => {
  const responseObject = {
    valid: true,
    errors: [],
  };

  if (!user.name) {
    responseObject.errors.push({ type: 'name', message: 'Please do not forget to include your name.' });
    responseObject.valid = false;
  } else if (user.name.length < 3) {
    responseObject.errors.push({ type: 'name', message: 'The name should be longer than 3 characters.' });
    responseObject.valid = false;
  }

  if (!user.email) {
    responseObject.errors.push({ type: 'email', message: 'Please do not forget to include your email address.' });
    responseObject.valid = false;
  } else if (!isEmail(user.email)) {
    responseObject.errors.push({ type: 'email', message: 'The email your provided is not correct.' });
    responseObject.valid = false;
  }

  if (!user.message) {
    responseObject.errors.push({ type: 'message', message: 'Please do not forget to include your message.' });
    responseObject.valid = false;
  } else if (user.message.length < 15) {
    responseObject.errors.push({ type: 'message', message: 'The message should be longer than 15 characters.' });
    responseObject.valid = false;
  }

  if (responseObject.valid) {
    responseObject.sanitized = {
      name: escape(user.name.trim()),
      email: escape(user.email.trim()),
      message: escape(user.message.trim()),
    };
  }
  return responseObject;
};
exports.messageValidator = messageValidator;
