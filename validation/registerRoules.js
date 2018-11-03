const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegistrationInput(data) {
  let errors = {};
  console.log(data);
  if (isEmpty(data)) {
    errors.name =
      "check the request, the body could be an empty object if the request is not right";
    return { errors: errors, isValid: false };
  }
  // Validator needs strings to validate..mbut if the dat obj is not empty and some fields
  // are the Validator will NOT run because he needs strings and will give an error
  // for that w need to see if the interested field is an emty object we translate it in an emty string

  data.name = !isEmpty(data.name) ? data.name : ""; //if it has a value it keeps it, if empty data.name is ""
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // name of registration at least 3 char but not more then 30
  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must contain 2 to 30 charachters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "the field name is required";
  }

  if (!Validator.isEmail(data.email)) errors.email = "email format not valid";
  if (Validator.isEmpty(data.email)) errors.email = "email field is required";
  // password empty and 6 to 30
  if (!Validator.isLength(data.password, { min: 6, max: 30 }))
    errors.password = "Password must be 6 to 30 characters";

  if (Validator.isEmpty(data.password))
    errors.password = "password field is required";

  if (
    (Validator.isEmpty(data.password2) ||
      !Validator.equals(data.password, data.password2)) && // if something wrong with the second
    isEmpty(errors.password) // && no errors are for the first password
  )
    errors.password2 = "password must match";

  return {
    // returning the object
    errors: errors,
    isValid: isEmpty(errors) // we have to check if it is empty.. global function is created for that
  };
};
