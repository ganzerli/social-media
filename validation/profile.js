const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  // data is req.body

  if (isEmpty(data)) {
    let errors = {
      handle: "field is required",
      status: "field is required",
      skills: "field is required"
    };
    return { errors: errors, isValid: false };
  }
  let errors = {};
  // for every required fild we validate the datas
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 }))
    errors.handle = "handle must be between 2 and 40 characters";

  if (Validator.isEmpty(data.handle))
    errors.handle = "handle field is required";
  if (Validator.isEmpty(data.skills))
    errors.skills = "skills field is required";
  if (Validator.isEmpty(data.status))
    errors.status = "status field is required";

  if (!isEmpty(data.website)) {
    // console.log("website", data.website);
    if (!Validator.isURL(data.website)) {
      errors.website = "the URL is not valid";
    }
  }

  // SOCIAL
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "the URL is not valid";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "the URL is not valid";
    }
  }
  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "the URL is not valid";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "the URL is not valid";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "the URL is not valid";
    }
  }

  //

  return {
    errors, // same as errors: errors
    isValid: isEmpty(errors)
  };
};
