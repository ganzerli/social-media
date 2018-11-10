import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { getAllProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItem;

    if (profiles === null || loading) {
      profileItem = <Spinner />;
    } else if (profiles.length > 0) {
      profileItem = profiles.map(oneProfile => (
        <ProfileItem key={oneProfile.id} profile={oneProfile} />
      ));
    } else {
      profileItem = <h2>No Profiles Found</h2>;
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                {" "}
                Take a Look to Other Profiles{" "}
              </h1>
              <p className="lead text-center">
                Browse and connect with the other people
              </p>
              {profileItem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequred,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(Profiles);
