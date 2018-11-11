import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      // just got like this!!
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  // handle coming in from the state update the profile state
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    //taking out the values of those  from the state managed from the profile reducer
    if (loading) {
      //if an error comes the action sends null as payload fot the profile,
      profileContent = <Spinner />;
    } else if (profile === null) {
      profileContent = (
        <div>
          {" "}
          Ooops.. pro - File not found.. <i className="fa fa-grav" />
        </div>
      );
    } else {
      profileContent = (
        <>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>

          <div>
            <ProfileHeader profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileCreds
              infosArray={profile.infos}
              expArray={profile.experiences}
            />

            {profile.githubusername ? (
              <ProfileGithub usrName={profile.githubusername} />
            ) : null}
          </div>
        </>
      );
    }
    return (
      <div className="profile">
        <div className="col-md-12">{profileContent}</div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
