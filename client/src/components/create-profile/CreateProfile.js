import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";

import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      twitter: "",
      facebook: "",
      job: "",
      bio: "",
      linkedin: "",
      handle: "",
      youtube: "",
      instagram: "",
      displaySocialInputsFields: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      // in mapState to poros is clalled errors
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      job: this.state.job,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputsFields } = this.state;

    let socialInputs;
    if (displaySocialInputsFields) {
      socialInputs = (
        <>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="github Profile URL"
            name="githubusername"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
        </>
      );
    }

    const options = [
      { label: "* Select your status", value: 0 },
      { label: "Single", value: "Single" },
      { label: "Married", value: "Married" },
      { label: "Open", value: "Open" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Choose the set of your Profile!
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  type="text"
                  placeholder="* profile /URL"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="enter wathever you want to show as end of your personal URL!"
                />
                <SelectListGroup
                  placeholder="* status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  options={options}
                  info="say something about your life"
                />

                <TextFieldGroup
                  type="text"
                  placeholder="your job"
                  name="job"
                  value={this.state.job}
                  onChange={this.onChange}
                  info="say something about your job"
                />

                <TextFieldGroup
                  type="text"
                  placeholder="website"
                  name="website"
                  value={this.state.website}
                  error={errors.website}
                  onChange={this.onChange}
                  info="do u have a website?"
                />

                <TextFieldGroup
                  type="text"
                  placeholder="where are you now"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  info="Set your position in your profile!"
                />
                <TextFieldGroup
                  type="text"
                  placeholder="what do u like to do?"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="use commas between your choices to separate them !"
                />
                <TextAreaFieldGroup
                  placeholder=".. a description .."
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  info="whatever other infos you like to say"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputsFields: !prevState.displaySocialInputsFields
                      }));
                    }}
                  >
                    ADD SOCIAL MEDIAS LINKS
                  </button>{" "}
                  <span className="text-muted">Optional</span>
                  <p />
                  {socialInputs}
                </div>
                <input
                  type="submit"
                  value={"Create your" + errors + " profile!"}
                  className={
                    "btn" +
                    (Object.keys(errors).length > 0
                      ? " btn-danger "
                      : " btn-success ") +
                    "btn-block mt-4"
                  }
                />
                {console.log(Object.keys(errors).length > 0)}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.PropTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
