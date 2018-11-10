const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInfosInput(data) {
  // data is req.body

  if (isEmpty(data)) {
    let errors = {
      field: "in which field is required",
      description: "the description field is required"
    };
    return { errors: errors, isValid: false };
  }

  let errors = {};
  // for every required fild we validate the datas
  data.field = !isEmpty(data.field) ? data.field : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.field))
    errors.field = "in which field is required";

  if (!Validator.isEmpty(data.description)) {
    if (!Validator.isLength(data.description, { min: 2, max: 500 })) {
      errors.description = "description must be between 2 and 200 characters";
    }
  } else if (Validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }

  return {
    errors, // same as errors: errors
    isValid: isEmpty(errors)
  };
};
