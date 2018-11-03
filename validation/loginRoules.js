const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data)) {
    errors.name =
      "check the request, the body could be an empty object if the request is not right";
    return { errors: errors, isValid: false };
  }
  // Validator needs strings to validate..mbut if the dat obj is not empty and some filds
  // are the Validator will NOT run because he needs strings and will give an error
  // for that w need to see if the interested fild is an emty object we translate it in an emty string

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) errors.email = "email format not valid";

  if (Validator.isEmpty(data.email)) errors.email = "email field is required";

  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be 6 to 30 characters";

  if (Validator.isEmpty(data.password))
    errors.password = "password field is required";

  return {
    errors: errors,
    isValid: isEmpty(errors) // we have to check if it is empty.. global function is created for those cases
  };
};
