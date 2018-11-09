import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/is-empty";

import { createProfile, getCurrentProfile } from "../../actions/profileActions";

class EditProfile extends Component {
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

  componentDidMount() {
    this.props.getCurrentProfile(); // so we have access to the object profile managed from the profile reducer
  }

  componentWillReceiveProps(nextProps) {
    // when submit if not redirect the component receive errors from the backend
    if (nextProps.errors) {
      // in mapState to poros is clalled errors
      this.setState({ errors: nextProps.errors });
    }
    // !! fill the fields already in the db with the related values
    if (nextProps.profile.profile) {
      // if in the profile state there is a prop called profile, see componentDidMount(){}
      const profile = nextProps.profile.profile;
      // translate the skills array back to string and commas
      const skillsCSV = profile.skills.join(",");
      // IF A FIELD IN THE PROFILE OBJECT DOES NOT EXIST MAKE AN EMPTY STRING -- SO WE HAVE a "" for to fill all the object, that then goes in the form
      profile.job = !isEmpty(profile.job) ? profile.job : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

      //social is its own object
      profile.social = !isEmpty(profile.social) ? profile.social : {}; // if so all the others are an empty string
      // and every in profile.social. whatit is we can put in our object directly , so we cut out a level..
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";

      // now we have an object with all the fields same as the state
      this.setState({
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        twitter: profile.twitter,
        facebook: profile.facebook,
        job: profile.job,
        bio: profile.bio,
        linkedin: profile.linkedin,
        handle: profile.handle,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
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
            placeholder="instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="github Profile URL"
            name="githubusername"
            icon="fab fa-github"
            value={this.state.githubusername}
            onChange={this.onChange}
            error={errors.github}
          />
        </>
      );
    }

    const options = [
      { label: "* Select one", value: 0 },
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
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p />
              <small className="d-block pb-3 glow" style={{ letterSpacing: 2 }}>
                <b>*</b> = required fields
              </small>

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
                  placeholder=" * what do u like to do?"
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
                  value={"E D I T"}
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

EditProfile.PropTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile, /// the reducer profile, manages 3 objects in the state, --> profile:{} <<-- , profiles:null, loading:false
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
