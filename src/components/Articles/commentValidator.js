
import escape from "validator/es/lib/escape";

const commentValidator = (comment) => {
  const res = {
    valid: true,
    errors: [],
  };

  if (!comment) {
    res.errors.push({
      type: "comment",
      message: "Please do not forget to include the comment.",
    });
    res.valid = false;
  } else if (comment.length < 3) {
    res.errors.push({
      type: "comment",
      message: "The comment should be longer than 3 characters.",
    });
    res.valid = false;
  }

  
  if (res.valid) {
    res.sanitized = escape(comment.trim())
  }

  return res;
};

export default commentValidator;
